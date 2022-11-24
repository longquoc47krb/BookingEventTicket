package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.Implement.IEventSlugGeneratorService;
import com.hcmute.bookingevent.models.event.EventStatus;
import com.hcmute.bookingevent.config.CloudinaryConfig;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.models.ticket.TicketStatus;
import com.hcmute.bookingevent.payload.request.EventReq;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.payload.response.ResponseObjectWithPagination;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static com.hcmute.bookingevent.utils.DateUtils.*;
import static com.hcmute.bookingevent.utils.Utils.toPage;
import static com.hcmute.bookingevent.utils.Utils.toSlug;

@Service
@RequiredArgsConstructor
public class EventService implements IEventService {

    private final EventRepository eventRepository;
    private final MongoTemplate mongoTemplate;
    private final OrganizationRepository organizationRepository;
    private final EventMapper eventMapper;
    private final IEventSlugGeneratorService slugGeneratorService;
    private final CloudinaryConfig cloudinary;


    @SneakyThrows
    @Override
    public ResponseEntity<?> createEvent(EventReq eventReq, String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            // handle events
            int randomNum = ThreadLocalRandom.current().nextInt(1000, 30000 + 1);
            String idSlung = slugGeneratorService.generateSlug(toSlug(eventReq.getName() + "-" + randomNum));
            Event event = new Event(eventReq);
            event.setId(idSlung);
            event.setStatus(EventStatus.AVAILABLE);

            //
            eventRepository.save(event);
            //add event in organization
            organization.get().getEventList().add(event.getId());
            //save organization
            organizationRepository.save(organization.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save event successfully ", idSlung, 200));


        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Save event fail", "", 400));
        }

    }
    @Override
    public ResponseEntity<?> findAllbyPage(Pageable pageable) {
        Page<Event> eventPage = eventRepository.findAll(pageable);
        List<Event> eventList = eventPage.toList();
        if (eventList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all user success", eventList,200));
        throw new NotFoundException("Can not find any organization");
    }
    @Override
    public ResponseEntity<?> eventPagination(Pageable pageable) {
        List<Event> events = sortEventByDateAsc(eventRepository.findAll());
        Page<Event> eventPage = (Page<Event>) toPage(events, pageable);
        List<Event> eventsPerPage = eventPage.toList();

        if (eventsPerPage.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObjectWithPagination(true, "Successfully show data", pageable.getPageNumber(), pageable.getPageSize(),eventRepository.findAll().size(),eventsPerPage));
        throw new NotFoundException("Can not find any event");
    }
    @Override
    public ResponseEntity<?> checkEventStatus(){
        List<Event> events = sortEventByDateAsc(eventRepository.findAll());

        for(Event event : events) {
            List<Ticket> tickets = event.getOrganizationTickets();
            int ticketRemaining = 0;
            int ticketTotal = 0;
            for (Ticket ticket : tickets) {
                int quantityRemaining = ticket.getQuantityRemaining();
                if (quantityRemaining == 0) {
                    ticket.setStatus(TicketStatus.SOLD_OUT);
                } else {
                    float soldTicket = ticket.getQuantity() - ticket.getQuantityRemaining();
                    float totallyTicket = ticket.getQuantity();
                    if (soldTicket / totallyTicket > 0.7) {
                        ticket.setStatus(TicketStatus.BEST_SELLER);
                    } else {
                        ticket.setStatus(TicketStatus.AVAILABLE);
                    }

                }
                ticketRemaining += ticket.getQuantityRemaining();
                ticketTotal += ticket.getQuantity();
            }
            event.setTicketRemaining(ticketRemaining);
            event.setTicketTotal(ticketTotal);
            if (ticketRemaining == 0) {
                event.setStatus(EventStatus.SOLD_OUT);
            } else {
                if (isBeforeToday(event.getEndingDate())) {
                    event.setStatus(EventStatus.COMPLETED);
                } else if (event.getTicketRemaining() == 0) {
                    event.setStatus(EventStatus.SOLD_OUT);
                } else {
                    event.setStatus(EventStatus.AVAILABLE);
                }

            }
            event.setOrganizationTickets(tickets);
            eventRepository.save(event);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Handling data successfully", eventRepository.findAll(),200));
    }


    static void setStatusForEvent(Event event, int ticketRemaining, int ticketTotal) {
        List<Ticket> tickets = event.getOrganizationTickets();

    }

    @Override
    public ResponseEntity<?> findAllEvents() {
        // Sorting events by starting date
        List<Event> events = sortEventByDateAsc( eventRepository.findAll());
        List<EventViewResponse> eventRes = events.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully ", eventRes,200));

    }

    @Override
    public ResponseEntity<?> findEventAfterToday() {
        // get all highlight events
        List<Event> events = sortEventByDateAsc(eventRepository.findAll());
        List<Event> eventList = new ArrayList<>();
        for(Event event : events){
            if(isAfterToday(event.getStartingDate())){
                eventList.add(event);
            }
        }
        List<EventViewResponse> eventRes = eventList.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());
         return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventRes,200));
    }

    @Override
    public ResponseEntity<?> findEventsByProvince(String province) {
        List<Event> eventList = sortEventByDateAsc(eventRepository.findAllByProvince(province));
        List<EventViewResponse> eventRes = eventList.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventRes,200));

    }
    @Override
    public ResponseEntity<?> deleteEvent(String id,String email) {

        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            //remove 1 item Id in listEvent
            List<String> eventList = organization.get().getEventList();
            eventList.remove(id);
            organization.get().setEventList(eventList);
            //save
            organizationRepository.save(organization.get());
            eventRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete event successfully ", "", 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete event fail with email:" + email, "", 404));


        }

    }


    @Override
    public ResponseEntity<?> updateEvent(String id, EventReq eventReq) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            event.get().setName(eventReq.getName());
            event.get().setProvince(eventReq.getProvince());
            event.get().setVenue(eventReq.getVenue());
            event.get().setVenue_address(eventReq.getVenue_address());
            event.get().setStartingTime(eventReq.getStartingTime());
            event.get().setEndingTime(eventReq.getEndingTime());
            event.get().setStartingDate(eventReq.getStartingDate());
            event.get().setEndingDate(eventReq.getEndingDate());
            event.get().setHost_id(eventReq.getHost_id());
            event.get().setDescription(eventReq.getDescription());
            event.get().setEventCategoryList(eventReq.getEventCategoryList());
            event.get().setOrganizationTickets(eventReq.getOrganizationTickets());
            event.get().setCreatedDate(eventReq.getCreatedDate());
            //
            int count=0;
            for (Ticket ticket : eventReq.getOrganizationTickets()) {
                count+= ticket.getQuantity();
            }
            event.get().setTicketTotal(count);
            //
            event.get().setTicketRemaining( eventReq.getTicketTotal()- event.get().getTicketRemaining());
            eventRepository.save(event.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Update event successfully ", "", 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Update data fail with id:" + id, "", 404));
        }
    }

    @SneakyThrows
    @Override
    public ResponseEntity<?> updateAvatarEvent(String id, MultipartFile file) {

        try {
            Optional<Event> event = eventRepository.findById(id);
            if (event.isPresent()) {

                //&& (file != null && !file.isEmpty())
                String imgUrl = cloudinary.uploadImage(file, event.get().getBackground());
                event.get().setBackground(imgUrl);
                eventRepository.save(event.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Update background successfully ", "", 200));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Update background  fail with id event:" + id, "", 404));
            }
        } catch (IOException e) {
            throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload image");
        }


    }
    @Override
    public ResponseEntity<?> searchEvents(String key) {
        List<Event> eventList = eventRepository.findAllBy(TextCriteria
                .forDefaultLanguage().matchingAny(key)
        );
        if (eventList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Search " + key + " success", eventList, 200));
        throw new NotFoundException("Can not found any product with: " + key);
    }


    @Override
    public ResponseEntity<?> findEventById(String id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + id, eventRepository.findById(id), 200));

        }
        throw new NotFoundException("Can not found any product with id: " + id);
    }

    @Override
    public ResponseEntity<?> findEventListById(String id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + id, eventRepository.findById(id),404));

        }
        throw new NotFoundException("Can not found any product with id: " + id);
    }

    @Override
    public ResponseEntity<?> filterEvents(String province, String categoryId, String status) {
        Query query = new Query();
        Criteria criteria = new Criteria();
        List<Criteria> andCriteria = new ArrayList<>();
        if(province != null){
            if (!province.equals("others")){
                andCriteria.add(Criteria.where("province").is(province));
            } else{
                andCriteria.add(Criteria.where("province").ne("TP. Hồ Chí Minh"));
                andCriteria.add(Criteria.where("province").ne("Hà Nội"));
            }
        }
        if( categoryId != null){
            andCriteria.add(Criteria.where("eventCategoryList.id").is(categoryId));
        }
        if( status != null) {
            andCriteria.add(Criteria.where("status").is(status));
        }
        criteria.andOperator(andCriteria.toArray(new Criteria[andCriteria.size()]));
        query.addCriteria(criteria);
        List<Event> eventList;
        if(province == null && categoryId == null && status == null){
            eventList = sortEventByDateAsc(eventRepository.findAll());
        }else{

        eventList = sortEventByDateAsc(mongoTemplate.find(query, Event.class));
        }

        List<EventViewResponse> eventRes = eventList.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Successfully query data", eventRes,200));

    }
}
