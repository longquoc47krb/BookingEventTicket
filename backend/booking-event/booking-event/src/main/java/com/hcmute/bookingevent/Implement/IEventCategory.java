package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.request.CategoryReq;
import org.springframework.http.ResponseEntity;

public interface IEventCategory {
    ResponseEntity<?> findAll();
    ResponseEntity<?> addCategory(CategoryReq categoryReq);
    ResponseEntity<?> deleteCategory(CategoryReq categoryReq);
}
