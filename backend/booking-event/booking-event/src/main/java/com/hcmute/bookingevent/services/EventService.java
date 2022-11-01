package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.Implement.IEventSlugGeneratorService;
import com.hcmute.bookingevent.common.TicketStatus;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.payload.response.ResponseObjectWithPagination;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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

    @Override
    public ResponseEntity<?> createEvent(Event event, String OrganizationID) {
        Optional<Organization> organization = organizationRepository.findById(OrganizationID);
        if (organization.isPresent()) {
            // handle events
            int randomNum = ThreadLocalRandom.current().nextInt(1000, 30000 + 1);
            event.setId(slugGeneratorService.generateSlug(toSlug(event.getName() + "-" + String.valueOf(randomNum))));
            event.setStatus(TicketStatus.AVAILABLE);
            eventRepository.save(event);
            //add event in organization
            List<String> eventList = organization.get().getEventList();
            eventList.add(event.getId());
            organization.get().setEventList(eventList);
            //save organization
            organizationRepository.save(organization.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save event successfully ", "", 200));


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
        List<Event> eventList = new ArrayList<>();
        for(Event event : events){
            if(isBeforeToday(event.getEndingDate())) {
                event.setStatus(TicketStatus.COMPLETED);
                eventList.add(event);
            }
            else if(event.getRemainingTicket() == 0){
                event.setStatus(TicketStatus.SOLD_OUT);
                eventList.add(event);
            }
            else{
                event.setStatus(TicketStatus.AVAILABLE);
                eventList.add(event);
            }
            eventRepository.save(event);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", "",200));
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
        List<Event> eventList = eventRepository.findAllByProvince(province);
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
                    new ResponseObject(true, "Delete event successfully ", "",200));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete event fail with email:" + email, "",404));


        }

    }

    public ResponseEntity<?> updateEvent(String id,Event event) {
        //Optional<Event> updatedEvent = eventRepository.findById(id);
        boolean checkExist = eventRepository.existsById(id);
        if (checkExist) {

            eventRepository.save(event);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Update data successfully ", "",200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Update data fail with id:" + id, "",404));
        }

    }
    @Override
    public ResponseEntity<?> searchEvents(String key) {
        List<Event> eventList = eventRepository.findAllBy(TextCriteria
                .forDefaultLanguage().matchingAny(key)
        );
        if (eventList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Search " + key + " success", eventList,200));
        throw new NotFoundException("Can not found any product with: " + key);
    }


    @Override
    public ResponseEntity<?> findEventById(String id) {
        Optional<Event> event = eventRepository.findById(id);
        System.out.println(event);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + id, eventRepository.findById(id),404));

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
    public ResponseEntity<?> filterEvents(String province,
                                          String categoryId,
                                          String status) {
        Query query = new Query();
        Criteria criteria = new Criteria();
        List<Criteria> andCriteria = new ArrayList<>();
        if( province != null) {
            andCriteria.add(Criteria.where("province").is(province));
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
        if( province == null && categoryId == null && status == null){
            eventList = sortEventByDateAsc(eventRepository.findAll());
        }else{
            eventList = sortEventByDateAsc(mongoTemplate.find(query, Event.class));
        }

        List<EventViewResponse> eventRes = eventList.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Successfully query data", eventRes,200));

    }
}
