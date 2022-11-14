package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.Implement.IEventCategory;
import com.hcmute.bookingevent.payload.request.CategoryReq;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor

@RequestMapping(path = "/api/eventCategory")
public class EventCategoryController {
    private  final IEventCategory iEventCategory;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAllCategory() {
        return iEventCategory.findAll();
    }
    @PostMapping("/Category")
    public ResponseEntity<?> addCategory(@RequestBody  CategoryReq categoryReq) {
        return iEventCategory.addCategory(categoryReq);
    }
    @DeleteMapping("/Category")
    public ResponseEntity<?> deleteCategory(@RequestBody  CategoryReq categoryReq) {
        return iEventCategory.deleteCategory(categoryReq);
    }
}
