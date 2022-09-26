package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/event")
public class EventController {
    private final IEventService iEventService;


    //get all events
    @GetMapping("/findAll")
    public ResponseEntity<?> findAllEvents() {
        return iEventService.findAllEvents();
    }

    @PostMapping("/createEvent")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        return iEventService.createEvent(event);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        return iEventService.deleteEvent(id);

    }

    @GetMapping("/findName")
    public ResponseEntity<?>  findEventByName(@RequestParam(value="name")  String name) {
        return iEventService.searchEvents(name);

    }
    @GetMapping("/find/{id}")
    public ResponseEntity<?>  findEventById(@PathVariable("id") String id) {
        return iEventService.findEventById(id);
    }


}
