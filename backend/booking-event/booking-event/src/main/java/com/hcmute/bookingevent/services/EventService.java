package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.Implement.IEventSlugGeneratorService;
import com.hcmute.bookingevent.common.TicketStatus;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Event;

import com.hcmute.bookingevent.payload.response.ResponseObjectWithPagination;
import com.hcmute.bookingevent.payload.response.ResponseObject;


import com.hcmute.bookingevent.responsitory.EventRepository;



import lombok.RequiredArgsConstructor;




import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
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


    private final IEventSlugGeneratorService slugGeneratorService;
    @Override
    public ResponseEntity<?> createEvent(Event event) {
        if (event != null
        ) {
            int randomNum = ThreadLocalRandom.current().nextInt(1000, 30000 + 1);
            event.setId(slugGeneratorService.generateSlug(toSlug(event.getName() + "-" + String.valueOf(randomNum))));
            event.setStatus(TicketStatus.AVAILABLE);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", eventRepository.save(event),200));

        }
        throw new NotFoundException("Can not Create event");
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
                new ResponseObject(true, "Show data successfully", eventList,200));
    }
    @Override
    public ResponseEntity<?> findAllEvents() {
        // Sorting events by starting date
        List<Event> events = sortEventByDateAsc( eventRepository.findAll());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully ", events,200));

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
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventList,200));
    }

    @Override
    public ResponseEntity<?> findEventsByFilters(String province, String categoryId, String status) {
        List<Event> eventList = new ArrayList<>();
        boolean hasProvince = province != null;
        boolean hasCategory = categoryId != null;
        boolean hasStatus = status != null;
        boolean[] conditions = {
                /*1*/   (!hasProvince && hasCategory && hasStatus),
                /*2*/   (!hasProvince && hasCategory && !hasStatus),
                /*3*/    (!hasProvince && !hasCategory && hasStatus),
                /*4*/    (!hasProvince && !hasCategory && !hasStatus),
                /*5*/    (hasProvince && !province.equals("others") && hasCategory && hasStatus),
                /*6*/    (hasProvince && !province.equals("others") &&  hasCategory && !hasStatus),
                /*7*/     (hasProvince && !province.equals("others") &&  !hasCategory && hasStatus),
                /*8*/      (hasProvince && !province.equals("others") &&  !hasCategory && !hasStatus),
                /*9*/      (hasProvince && province.equals("others") &&  !hasCategory && !hasStatus),
                /*10*/      (hasProvince && province.equals("others") && hasCategory && hasStatus),
                /*11*/      (hasProvince && province.equals("others") && hasCategory && !hasStatus),
                /*12*/      (hasProvince && province.equals("others") && !hasCategory && hasStatus),
                /*13*/      (hasProvince && province.equals("others") && !hasCategory && !hasStatus)
        };
        List<List<Event>> listOfLists = new ArrayList<>(Arrays.asList(
                /*1*/   eventRepository.findAllByCategoryAndStatus(categoryId, status),
                /*2*/   eventRepository.findAllByCategoryId(categoryId),
                /*3*/       eventRepository.findAllByStatus(status),
                /*4*/       eventRepository.findAll(),
                /*5*/       eventRepository.findAllByFilter(province, categoryId, status),
                /*6*/     eventRepository.findAllByProvinceAndCategory(province, categoryId),
                /*7*/  eventRepository.findAllByProvinceAndStatus(province, status),
                /*8*/     eventRepository.findAllByProvince(province),
                /*9*/      eventRepository.findAll().stream().filter(e -> !e.getProvince().equals("TP. Hồ Chí Minh")).filter(e -> !e.getProvince().equals("Hà Nội")).collect(Collectors.toList()),
                /*10*/   eventRepository.findAllByCategoryAndStatus(categoryId, status).stream().filter(e -> !e.getProvince().equals("TP. Hồ Chí Minh")).filter(e -> !e.getProvince().equals("Hà Nội")).collect(Collectors.toList()),
                /*11*/  eventRepository.findAllByCategoryId(categoryId).stream().filter(e -> !e.getProvince().equals("TP. Hồ Chí Minh")).filter(e -> !e.getProvince().equals("Hà Nội")).collect(Collectors.toList()),
                /*12*/  eventRepository.findAllByStatus(status).stream().filter(e -> !e.getProvince().equals("TP. Hồ Chí Minh")).filter(e -> !e.getProvince().equals("Hà Nội")).collect(Collectors.toList()),
                /*13*/   eventRepository.findAll().stream().filter(e -> !e.getProvince().equals("TP. Hồ Chí Minh")).filter(e -> !e.getProvince().equals("Hà Nội")).collect(Collectors.toList())
        ));
        for (int i = 0; i < conditions.length; i++) {
            if (conditions[i] == true)
                eventList = listOfLists.get(i);
        }
        List<Event> sortedEventList = sortEventByDateAsc(eventList);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", sortedEventList,200));


    }

    @Override
    public ResponseEntity<?> deleteEvent(String id) {
        boolean checkExist = eventRepository.existsById(id);
        if (checkExist) {

            eventRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete data successfully ", "",200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete data fail with id:" + id, "",404));
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

//    List<EventCategory>  findEventByAndEventCategoryList(String id)
//    {
//
//    }
}
