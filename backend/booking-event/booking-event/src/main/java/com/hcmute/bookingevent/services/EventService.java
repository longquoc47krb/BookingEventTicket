package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class EventService implements IEventService {
    private final EventRepository eventRepository;

    @Override
    public ResponseEntity<?> createEvent(Event event) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Save data successfully ", eventRepository.save(event)));
    }

    @Override
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Delete data successfully ", eventRepository.findAll()));

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
    public ResponseEntity<?> getEventByName(String name) {
        Optional<Event> event = eventRepository.findByName(name);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + name, eventRepository.findByName(name)));

        }
        throw new NotFoundException("Can not found any product with id: " + name);
    }

    @Override
    public ResponseEntity<?> getEventById(String id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Can not find data with name:" + id, eventRepository.findById(id)));

        }
        throw new NotFoundException("Can not found any product with id: " + id);
    }
}
