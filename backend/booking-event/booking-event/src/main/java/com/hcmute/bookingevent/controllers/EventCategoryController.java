package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.Implement.IEventCategory;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor

@RequestMapping(path = "/eventCategory")
public class EventCategoryController {
    private  final IEventCategory iEventCategory;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAllEvents() {
        return iEventCategory.findAll();
    }

}
