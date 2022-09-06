package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    public ResponseEntity<ResponseObject> createEvent(@RequestBody Event event) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Save data successfully ", eventRepository.save(event)));


        //  return eventRepository.save(event);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseObject> deleteEvent(@PathVariable String id) {
        boolean checkExist = eventRepository.existsById(id);
        if (checkExist) {

            eventRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete data successfully ", ""));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete data fail with id:" + id, ""));
        }
        //  return eventRepository.save(event);
    }

    @GetMapping("/findname/{name}")
    public Event getEventByName(@PathVariable String name) {
        return eventRepository.findByName(name).orElseThrow(() -> new RuntimeException("cannot find that  name is " + name));

        //Optional<Event> event =
//        if( eventRepository.findByName(name).isPresent())
//        {
//            return event;
//        }
//        else
//        {
//            return Optional.empty();
//        }
    }

}
