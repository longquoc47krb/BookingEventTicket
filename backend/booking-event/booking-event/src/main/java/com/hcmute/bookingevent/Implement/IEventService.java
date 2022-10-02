package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Event;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface IEventService {
    ResponseEntity<?> createEvent(Event event);
    ResponseEntity<?> findAllEvents();
    ResponseEntity<?> deleteEvent( String id);
    ResponseEntity<?> findEventById(String id);
    ResponseEntity<?> searchEvents(String key);
    ResponseEntity<?> findEventListById(String id);
    ResponseEntity<?> eventPagination(Pageable pageable);
}
