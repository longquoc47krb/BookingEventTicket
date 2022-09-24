package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventCategory;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.EventCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EventCategoryService implements IEventCategory {
    @Autowired
    EventCategoryRepository eventCategoryRepository;

    @Override
    public ResponseEntity<?> findAll() {
        //return eventCategoryRepository.findAll();
        List<EventCategory> list = eventCategoryRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Category", list));
        throw new NotFoundException("Can not found any Category");
    }

}