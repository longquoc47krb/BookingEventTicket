package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.responsitory.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/event")
public class EventController {
    //dasdas
    @Autowired
    EventRepository eventRepository;

    //get all events
    @GetMapping("/showall")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("/createEvent")
    public Event createEvents(@RequestBody Event event) {
        return eventRepository.save(event);
    }
    @GetMapping("/findname/{name}")
    public Optional<Event> getEventByName(@PathVariable String name)
    {
        Optional<Event> event = eventRepository.findByName(name);
        if( eventRepository.findByName(name).isPresent())
        {
            return event;
        }
        else
        {
            return Optional.empty();
        }
    }

}
