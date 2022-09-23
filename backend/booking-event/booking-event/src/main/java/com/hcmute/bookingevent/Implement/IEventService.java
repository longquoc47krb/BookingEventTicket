package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Event;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface IEventService {
    ResponseEntity<?> createEvent(Event event);
    ResponseEntity<?> getAllEvents();
    ResponseEntity<?> deleteEvent( String id);
    ResponseEntity<?> getEventByName( String name);
    ResponseEntity<?> getEventById(String id);
}
