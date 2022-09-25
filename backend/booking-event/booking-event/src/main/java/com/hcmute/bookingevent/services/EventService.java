package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EventService implements IEventService {
    @Autowired
    private final EventRepository eventRepository;

    @Override
    public ResponseEntity<?> createEvent(Event event) {
        if (event != null
        ) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", eventRepository.save(event)));

        }
        throw new NotFoundException("Can not Create event with : " + event);
    }

    @Override
    public ResponseEntity<?> findAllEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Show data successfully ", eventRepository.findAll()));

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
