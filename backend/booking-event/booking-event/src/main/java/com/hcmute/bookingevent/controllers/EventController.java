package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.models.Event;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/event")
public class EventController {
    private final IEventService iEventService;


    //get all events
    @GetMapping("/findAll")
    public ResponseEntity<?> findAllEvents() {
        return iEventService.findAllEvents();
    }
    @GetMapping("/find/category/{id}")
    public  ResponseEntity<?> findEventsByCategory(@PathVariable String id){
        return iEventService.findEventsByCategory(id);
    }
    @PostMapping("/createEvent")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        return iEventService.createEvent(event);

    }  @GetMapping("/findEventAfterToday")
    public ResponseEntity<?> findEventAfterToday(){
        return iEventService.findEventAfterToday();

    }
    @GetMapping("/checkEventStatus")
    public ResponseEntity<?> checkEventStatus(){
        return iEventService.checkEventStatus();

    }
    @GetMapping("/findEventByProvince")
    public ResponseEntity<?> findEventByProvince(@RequestParam(value="province") String province){
        return iEventService.findEventsByProvince(province);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        return iEventService.deleteEvent(id);

    }

    @GetMapping("/searchEvents")
    public ResponseEntity<?>  searchEvents(@RequestParam(value="value")  String value) {
        return iEventService.searchEvents(value);

    }
    @GetMapping("/find/{id}")
    public ResponseEntity<?>  findEventById(@PathVariable("id") String id) {
        return iEventService.findEventById(id);
    }
    @GetMapping(path = "/eventPage")
    public ResponseEntity<?> eventPagination (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iEventService.eventPagination(pageable);
    }

}
