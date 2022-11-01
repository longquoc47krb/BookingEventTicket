package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.request.EmailReq;
import com.hcmute.bookingevent.payload.request.OrganizationReq;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/event")
public class EventController {
    private final IEventService iEventService;
    private final JwtTokenProvider jwtUtils;


    //get all events
    @GetMapping("/findAll")
    public ResponseEntity<?> findAllEvents() {
        return iEventService.findAllEvents();
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> createEvent(@RequestBody Event event, @PathVariable String userId, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.createEvent(event, account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id,@PathVariable String userId, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.deleteEvent(id,account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping(path = "/findAllByPage")
    public ResponseEntity<?> findAllEventByPage (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "6") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iEventService.findAllbyPage(pageable);
    }
    @GetMapping("/findEventsByProvince")
    public ResponseEntity<?> findEventsByProvince(@RequestParam(value="province", required = false) String province){
        return iEventService.findEventsByProvince(province);
    }
    @GetMapping("/findEventAfterToday")
    public ResponseEntity<?> findEventAfterToday(){
        return iEventService.findEventAfterToday();

    }
    @GetMapping("/checkEventStatus")
    public ResponseEntity<?> checkEventStatus(){
        return iEventService.checkEventStatus();

    }
    @GetMapping("/searchEvents")
    public ResponseEntity<?>  searchEvents(@RequestParam(value="value")  String value) {
        return iEventService.searchEvents(value);

    }
    @GetMapping(path = "/eventPage")
    public ResponseEntity<?> eventPagination (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iEventService.eventPagination(pageable);
    }
    @GetMapping(path = "/filter")
    public ResponseEntity<?> findEventByFilter(@RequestParam(value="province", required = false) String province, @RequestParam(value="categoryId", required = false) String categoryId, @RequestParam(value="status", required = false) String status){
        return iEventService.findEventsByFilters(province, categoryId, status);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<?>  findEventById(@PathVariable("id") String id) {
        return iEventService.findEventById(id);
    }
    @PutMapping("/{id}/{userId}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @PathVariable String userId,@RequestBody Event updatedEvent, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.updateEvent(id, updatedEvent);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
}
