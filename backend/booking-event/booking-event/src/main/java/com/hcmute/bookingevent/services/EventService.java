package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.Implement.IEventSlugGeneratorService;
import com.hcmute.bookingevent.mapper.AccountMapper;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.dto.EventPreviewDto;
import com.hcmute.bookingevent.models.event.EventStatus;
import com.hcmute.bookingevent.config.CloudinaryConfig;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.organization.PaymentPending;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.models.ticket.TicketStatus;
import com.hcmute.bookingevent.payload.request.EventReq;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.payload.response.PaginationResponse;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.payload.response.ResponseObjectWithPagination;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.CustomerRepository;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import com.hcmute.bookingevent.services.mail.EMailType;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import net.bytebuddy.asm.Advice;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static com.hcmute.bookingevent.utils.DateUtils.*;
import static com.hcmute.bookingevent.utils.Utils.*;

@Service
@RequiredArgsConstructor
public class EventService implements IEventService {

    private final EventRepository eventRepository;
    private final MongoTemplate mongoTemplate;
    private final OrganizationRepository organizationRepository;
    private final EventMapper eventMapper;
    private final IEventSlugGeneratorService slugGeneratorService;
    private final CloudinaryConfig cloudinary;
    private final PaymentService paymentService;
    private final CustomerRepository customerRepository;
    private final MailService mailService;

    private final AccountMapper accountMapper;
    private final AccountRepository accountRepository;

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
            event.setCreatedDate(new Date());
            event.setStatus(EventStatus.AVAILABLE);

            //
            eventRepository.save(event);
            //add event in organization
            //add payment pending when not finished
            organization.get().getEventList().add(event.getId());
            PaymentPending paymentPending = paymentService.setPaymentToInProgress(idSlung);
            organization.get().getPaymentPendings().add(paymentPending);
            //save organization
            organizationRepository.save(organization.get());
            //send email
            List<String> ids = Arrays.asList(email);
            List<Customer> customerListForSending =  customerRepository.findByFollowList(ids);
            List<Account> accountList = customerListForSending.stream().map(accountMapper::toAccount).collect(Collectors.toList());
            //get account information of organizer
            Optional<Account> account = accountRepository.findByEmail(email);
            Map<String, String> map = new HashMap<>();
            map.put("id",event.getId());
            map.put("eventName",event.getName());
            mailService.sendMailByAccountList(accountList, map,account.get().getName() ,EMailType.NEW_EVENT);
           // mailService.sendMail(account, "", EMailType.BECOME_ORGANIZATION);
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
            if (ticketRemaining == 0 && !isBeforeToday(event.getEndingDate())) {
                event.setStatus(EventStatus.SOLD_OUT);
            } else {
                if(event.getStatus().equals(EventStatus.DELETED)){
                    event.setStatus(EventStatus.DELETED);
                }
                else if (isBeforeToday(event.getEndingDate())) {
                    event.setStatus(EventStatus.COMPLETED);
                    //set status of payment when completed
                    paymentService.setPaymentToCompleted(event);
                } else if (event.getTicketRemaining() == 0) {
                    event.setStatus(EventStatus.SOLD_OUT);
                }
                else {
                    event.setStatus(EventStatus.AVAILABLE);
                }

            }
            event.setOrganizationTickets(tickets);
            eventRepository.save(event);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Handling data successfully", "",200));
    }
    @Override
    public ResponseEntity<?> findAllEvents() {
        // Sorting events by starting date
        List<Event> events = sortEventByDateAsc( eventRepository.findAll());
        List<EventViewResponse> eventRes = events.stream().filter(event -> !event.getStatus().equals(EventStatus.DELETED)).map(eventMapper::toEventRes ).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully ", eventRes,200));

    }

    @Override
    public ResponseEntity<?> findEventAfterToday(Pageable pageable) {
        List<Event> eventList = getEventAfterTodayList();
        // get all highlight events
        getEventAfterTodayList();
        // Create a Page object with the eventList and pageable
        Page<Event> eventPage = (Page<Event>) toPage(eventList, pageable);

        // Retrieve the content and pagination information from the Page object
        List<Event> paginatedEvents = eventPage.getContent();
        int totalPages = eventPage.getTotalPages();
        long totalElements = eventPage.getTotalElements();

        // Create a custom response object with pagination information
        PaginationResponse<EventViewResponse> paginationResponse = new PaginationResponse<>();
        paginationResponse.setContent(paginatedEvents.stream().map(eventMapper::toEventRes).collect(Collectors.toList()));
        paginationResponse.setPage(pageable.getPageNumber());
        paginationResponse.setSize(pageable.getPageSize());
        paginationResponse.setTotalElements(totalElements);
        paginationResponse.setTotalPages(totalPages);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", paginationResponse, 200));
  }

    @Override
    public ResponseEntity<?> findEventAfterToday() {
        // get all highlight events
        List<Event> eventList = getEventAfterTodayList();
        List<EventViewResponse> eventRes = eventList.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventRes,200));

    }

    private List<Event> getEventAfterTodayList() {
        List<Event> events = sortEventByDateAsc(eventRepository.findAll());
        List<Event> eventList = new ArrayList<>();
        for(Event event : events){
            if(isAfterToday(event.getEndingDate()) && !event.getStatus().equals(EventStatus.DELETED)){
                eventList.add(event);
            }
        }
        return eventList;
    }

    @Override
    public ResponseEntity<?> findBestSellerEvent() {
        List<Event> events = sortEventByDateAsc(eventRepository.findAll());
        List<Event> eventList = new ArrayList<>();
        for(Event event : events){
            if((float)(event.getTicketTotal() - event.getTicketRemaining()) / event.getTicketTotal() >= 0.7 && event.getStatus().equals(EventStatus.AVAILABLE)){
                eventList.add(event);
            }
        }
        List<EventViewResponse> eventRes = eventList.stream().filter(event ->  !event.getStatus().equals(EventStatus.DELETED)).map(eventMapper::toEventRes ).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventRes,200));
    }

    @Override
    public ResponseEntity<?> findEventsByProvince(String province) {
        List<Event> eventList = sortEventByDateAsc(eventRepository.findAllByProvince(province));
        List<EventViewResponse> eventRes = eventList.stream().filter(event ->  !event.getStatus().equals(EventStatus.DELETED)).map(eventMapper::toEventRes ).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventRes,200));

    }
    @Override
    public ResponseEntity<?> deleteEvent(String id,String email) {

        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Event> event = eventRepository.findEventById(id);
        if (organization.isPresent() && event.isPresent()) {
            //
            paymentService.setPaymentToCancel(organization.get().getPaymentPendings(),id);
            //remove 1 item Id in listEvent
            List<String> eventList = organization.get().getEventList();
            eventList.remove(id);
            organization.get().setEventList(eventList);
            organizationRepository.save(organization.get());
            //change status when deleted by organizer
            event.get().setStatus(EventStatus.DELETED);
            eventRepository.save(event.get());
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
            event.get().setUpdatedDate(new Date());
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
            event.get().setCreatedDate(event.get().getCreatedDate());
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
    public ResponseEntity<?> updateEventBackground(String id, MultipartFile file) {

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
    public ResponseEntity<?> upcomingEvents() {
        LocalDate currentDate = LocalDate.now();
        LocalDate nextOneWeek = currentDate.plusDays(7);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Event> eventPreviews = new ArrayList<>();
        for(Event event : eventRepository.findAll()){
            if(LocalDate.parse(event.getStartingDate(), formatter).isBefore(currentDate) && LocalDate.parse(event.getStartingDate(), formatter).isAfter(nextOneWeek)){
                eventPreviews.add(event);
            }
        }

        List<EventPreviewDto> upcomingEvents = eventPreviews.stream()
                .map(event -> new EventPreviewDto(event.getName(), event.getBackground(), event.getStartingDate(), event.getTicketTotal(), event.getTicketRemaining(), event.getEventCategoryList()))
                .collect(Collectors.toList());
        if(!upcomingEvents.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(false, "Upcoming events fetched successfully" , upcomingEvents, 200));

        } else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Upcoming event is empty" , new ArrayList<>(), 404));

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
    public ResponseEntity<?> findByProvinceAndCategoryIdAndStatusAndDate(String province, String categoryId, String status, String date, Integer pageNumber) {
        Query query = new Query();
        Criteria criteria = new Criteria();
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
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
        if (date != null) {
            if (date.equals("this_week")) {
                LocalDate startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                LocalDate endOfWeek = startOfWeek.plusDays(6);
                eventList = filterEventsByDateRange(eventList, startOfWeek, endOfWeek);
            } else if (date.equals("this_month")) {
                LocalDate startOfMonth = now.with(TemporalAdjusters.firstDayOfMonth());
                LocalDate endOfMonth = now.with(TemporalAdjusters.lastDayOfMonth());
                eventList = filterEventsByDateRange(eventList, startOfMonth, endOfMonth);
            } else if (date.startsWith("range:")) {
                String[] range = date.split(":");
                if (range.length == 3) {
                    String startDate = range[1];
                    String endDate = range[2];
                    eventList = filterEventsByDateRange(eventList, LocalDate.parse(startDate, formatter), LocalDate.parse(endDate, formatter));
                }
            } else {
                String startDate = "01/01/1000";
                String endDate = "31/12/2999";
                eventList = filterEventsByDateRange(eventList, LocalDate.parse(startDate, formatter), LocalDate.parse(endDate, formatter));

            }
        }
        List<EventViewResponse> eventRes = eventList.stream().filter(event ->  !event.getStatus().equals(EventStatus.DELETED)).map(eventMapper::toEventRes ).collect(Collectors.toList());

        // pagination

//        int startIndex = (pageNumber - 1) * PAGE_SIZE;
//        int endIndex = Math.min(startIndex + PAGE_SIZE, eventRes.size());
//
//        List<EventViewResponse> paginatedList = eventRes.subList(startIndex, endIndex);
//
//        int totalElements = eventRes.size();
//        int totalPages = (int) Math.ceil((double) totalElements / PAGE_SIZE);
//
//
//
//        // Create a custom response object with pagination information
//        PaginationResponse<EventViewResponse> paginationResponse = new PaginationResponse<>();
//        paginationResponse.setContent(sortEventViewResponseByDateAsc(paginatedList));
//        paginationResponse.setPage(pageNumber);
//        paginationResponse.setSize(PAGE_SIZE);
//        paginationResponse.setTotalElements(totalElements);
//        paginationResponse.setTotalPages(totalPages);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Successfully query data", eventRes,200));

    }

    public int getPreviousDayEventCount(String email) {

        Optional<Organization> organization = organizationRepository.findByEmail(email);
        List<Event> events = new ArrayList<>();
        for(String eventId : organization.get().getEventList()){
            events.add(eventRepository.findEventById(eventId).get());
        }
        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime startOfPast = LocalDateTime.of(2000, 1, 1, 0, 0, 0);

        Date startOfYesterdayDate = Date.from(startOfYesterday.atZone(ZoneId.systemDefault()).toInstant());
        Date startOfPastDate = Date.from(startOfPast.atZone(ZoneId.systemDefault()).toInstant());

        long eventCount = events.stream()
                .filter(event -> event.getCreatedDate().after(startOfPastDate) &&
                        event.getCreatedDate().before(startOfYesterdayDate))
                .count();

        return (int) eventCount;
    }


    // filter by date

    public List<Event> filterEventsByDateRange(List<Event> events, LocalDate startDate, LocalDate endDate) {
        return events.stream()
                .filter(event -> convertStringToDate(event.getStartingDate()).isAfter(startDate) && convertStringToDate(event.getStartingDate()).isBefore(endDate))
                .collect(Collectors.toList());
    }
}
