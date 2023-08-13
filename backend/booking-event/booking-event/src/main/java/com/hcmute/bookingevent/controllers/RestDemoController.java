package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import static org.springframework.web.servlet.function.ServerResponse.status;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
@Slf4j
public class RestDemoController {
    @Autowired
    private RestTemplate restTemplate;
    @GetMapping("/restTemplate/event/{id}")
    public Event rest_event(@PathVariable String id) {
        //int id=2;

        ResponseEntity <Event> event = restTemplate.getForEntity("http://localhost:8080/api/event/find/object/" + id, Event.class);
        //System.out.println(event.getData());
        return event.getBody();
        // return ResponseEntity.status(HttpStatus.OK).body(
        //        new ResponseObject(true, "Save data successfully ", event.getData(),200));
    }
    @GetMapping("/restTemplate/event/page")
    public ResponseEntity<?> rest_event_List(@RequestParam(value = "currentPage", defaultValue = "0") int currentPage, @RequestParam(value="pageSize", defaultValue = "6") int pageSize   ) {
        //int id=2;
        ResponseObject event = restTemplate.getForObject("http://localhost:8080/api/event/findAllByPage?" + "currentPage="+currentPage+"&pageSize="+ pageSize, ResponseObject.class);
        //System.out.println(event.getData());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "view data successfully ", event.getData(),200));
    }
}
