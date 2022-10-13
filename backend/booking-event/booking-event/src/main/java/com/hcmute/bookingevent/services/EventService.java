package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.Implement.IEventSlugGeneratorService;
import com.hcmute.bookingevent.common.TicketStatus;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.ResponseObjectWithPagination;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static com.hcmute.bookingevent.utils.DateUtils.*;
import static com.hcmute.bookingevent.utils.Utils.toSlug;

@Service
@AllArgsConstructor
public class EventService implements IEventService {
    @Autowired
    private final EventRepository eventRepository;
    private final IEventSlugGeneratorService sequenceGeneratorService;
    @Override
    public ResponseEntity<?> createEvent(Event event) {
        if (event != null
        ) {
            int randomNum = ThreadLocalRandom.current().nextInt(1000, 30000 + 1);
            event.setId(sequenceGeneratorService.generateSlug(toSlug(event.getName() + "-" + String.valueOf(randomNum))));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", eventRepository.save(event)));

        }
        throw new NotFoundException("Can not Create event with : " + event);
    }
    @Override
    public ResponseEntity<?> eventPagination(Pageable pageable) {
        Page<Event> eventPage = eventRepository.findAll(pageable);
        List<Event> eventsPerPage = eventPage.toList();
        List<Event> eventList = eventRepository.findAll();

        if (eventsPerPage.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObjectWithPagination(true, "Successfully show data", pageable.getPageNumber(), pageable.getPageSize(),eventList.size(),eventsPerPage));
        throw new NotFoundException("Can not find any event");
    }
    @Override
    public ResponseEntity<?> checkEventStatus(){
        List<Event> events = sortEventByDateAsc(eventRepository);
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
                new ResponseObject(true, "Show data successfully", eventList));
    }
    @Override
    public ResponseEntity<?> findAllEvents() {
        // Sorting events by starting date
        List<Event> events = sortEventByDateAsc(eventRepository);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully ", events));

    }

    @Override
    public ResponseEntity<?> findEventAfterToday() {
        // get all highlight events
        List<Event> events = sortEventByDateAsc(eventRepository);
        List<Event> eventList = new ArrayList<>();
        for(Event event : events){
            if(isAfterToday(event.getStartingDate())){
                eventList.add(event);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventList));
    }
    @Override
    public ResponseEntity<?> findEventsByCategory(String category){
        Query query = new Query();

        return null;
    }
    @Override
    public ResponseEntity<?> findEventsByProvince(String province){
        List<Event> events = sortEventByDateAsc(eventRepository);
        List<Event> eventAfterToday = new ArrayList<>();
        for(Event event : events){
            if(isAfterToday(event.getStartingDate())){
                eventAfterToday.add(event);
            }
        }
        List<Event> eventsByProvice = eventAfterToday.stream().filter( e -> e.getProvince().equals(province)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully", eventsByProvice));

    }
    @Override
    public ResponseEntity<?> deleteEvent(String id) {
        boolean checkExist = eventRepository.existsById(id);
        if (checkExist) {

            eventRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete data successfully ", ""));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete data fail with id:" + id, ""));
        }

    }
    //    @Override
//    public ResponseEntity<?> updateEvent(String id) {
//        Optional<Event> account = eventRepository.findById(id);
//        boolean checkExist = eventRepository.existsById(id);
//        if (checkExist) {
//
//            eventRepository.save(id);
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(true, "Update data successfully ", ""));
//
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                    new ResponseObject(false, "Update data fail with id:" + id, ""));
//        }
//
//    }
    @Override
    public ResponseEntity<?> searchEvents(String key) {
        List<Event> eventList = eventRepository.findAllBy(TextCriteria
                .forDefaultLanguage().matchingAny(key)
        );
        if (eventList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Search " + key + " success", eventList));
        throw new NotFoundException("Can not found any product with: " + key);
    }


    @Override
    public ResponseEntity<?> findEventById(String id) {
        Optional<Event> event = eventRepository.findById(id);
        System.out.println(event);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + id, eventRepository.findById(id)));

        }
        throw new NotFoundException("Can not found any product with id: " + id);
    }

    @Override
    public ResponseEntity<?> findEventListById(String id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + id, eventRepository.findById(id)));

        }
        throw new NotFoundException("Can not found any product with id: " + id);
    }

//    List<EventCategory>  findEventByAndEventCategoryList(String id)
//    {
//
//    }
}
