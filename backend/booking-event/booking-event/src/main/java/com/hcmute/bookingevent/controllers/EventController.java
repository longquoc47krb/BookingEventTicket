package com.hcmute.bookingevent.controllers;


import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.payload.request.EventReq;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
public class EventController {
    private final IEventService iEventService;
    private final JwtTokenProvider jwtUtils;


    //get all events
    @GetMapping("/event/findAll")
    public ResponseEntity<?> findAllEvents() {
        return iEventService.findAllEvents();
    }

    @PostMapping("/organization/event/{userId}")
    public ResponseEntity<?> createEvent(@RequestBody EventReq eventReq, @PathVariable String userId, HttpServletRequest request) {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.createEvent(eventReq, account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @DeleteMapping("/organization/event/{id}/{userId}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id,@PathVariable String userId, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.deleteEvent(id,account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping(path = "/event/findAllByPage")
    public ResponseEntity<?> findAllEventByPage (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "6") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iEventService.findAllbyPage(pageable);
    }
    @GetMapping("/event/findEventsByProvince")
    public ResponseEntity<?> findEventsByProvince(@RequestParam(value="province", required = false) String province){
        return iEventService.findEventsByProvince(province);
    }
    @GetMapping("/event/findEventAfterToday")
    public ResponseEntity<?> findEventAfterToday(){
        return iEventService.findEventAfterToday();

    }
    @GetMapping("/event/findBestSellerEvent")
    public ResponseEntity<?> findBestSellerEvent(){
        return iEventService.findBestSellerEvent();

    }
    @GetMapping("/event/checkEventStatus")
    public ResponseEntity<?> checkEventStatus(){
        return iEventService.checkEventStatus();

    }
    @GetMapping("/event/searchEvents")
    public ResponseEntity<?>  searchEvents(@RequestParam(value="value")  String value) {
        return iEventService.searchEvents(value);

    }
    @GetMapping(path = "/event/eventPage")
    public ResponseEntity<?> eventPagination (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iEventService.eventPagination(pageable);
    }
    @GetMapping(path = "/event/filter")
    public ResponseEntity<?> findEventByFilter(@RequestParam(value="province", required = false) String province, @RequestParam(value="categoryId", required = false) String categoryId, @RequestParam(value="status", required = false) String status){
        return iEventService.filterEvents(province, categoryId, status);
    }
    @GetMapping("/event/find/{id}")
    public ResponseEntity<?>  findEventById(@PathVariable("id") String id) {
        return iEventService.findEventById(id);
    }
    @PutMapping("/organization/event/{id}/{userId}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @PathVariable String userId,@RequestBody EventReq eventReq, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.updateEvent(id, eventReq);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @PostMapping(path = "/organization/eventBackground/{id}/{userId}")
    public ResponseEntity<?> updateEventBackground(@PathVariable String id,
                                                   @PathVariable String userId,
                                                   HttpServletRequest request,
                                                   @RequestParam MultipartFile file){

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iEventService.updateEventBackground(id, file);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

}
