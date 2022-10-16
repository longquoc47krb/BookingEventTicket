package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Event;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface IEventService {
    ResponseEntity<?> createEvent(Event event);
    ResponseEntity<?> findAllEvents();

    ResponseEntity<?> findEventAfterToday();
    ResponseEntity<?> deleteEvent(String id);
    ResponseEntity<?> findEventById(String id);
    ResponseEntity<?> searchEvents(String key);
    ResponseEntity<?> findEventListById(String id);
    ResponseEntity<?> eventPagination(Pageable pageable);
    ResponseEntity<?> checkEventStatus();

    ResponseEntity<?> findEventsByFilters(String province, String category, String status );


}
