package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Event;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface IEventService {
    ResponseEntity<?> createEvent(Event event,String organizationId);
    ResponseEntity<?> findAllEvents();
    ResponseEntity<?> findEventAfterToday();
    ResponseEntity<?> findEventsByProvince(String province);
    ResponseEntity<?> deleteEvent(String id,String email);
    ResponseEntity<?> findEventById(String id);
    ResponseEntity<?> searchEvents(String key);
    ResponseEntity<?> findEventListById(String id);
    ResponseEntity<?> eventPagination(Pageable pageable);
    ResponseEntity<?> checkEventStatus();
    ResponseEntity<?> updateEvent(String id,Event event);
    ResponseEntity<?> findAllbyPage(Pageable pageable);

    ResponseEntity<?> filterEvents(String province,
                                   String categoryId,
                                   String status);

}
