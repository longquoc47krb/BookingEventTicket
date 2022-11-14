package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IEventCategory;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.payload.request.CategoryReq;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.EventCategoryRepository;
import com.hcmute.bookingevent.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class EventCategoryService implements IEventCategory {

    private final EventCategoryRepository eventCategoryRepository;
    private final EventRepository eventRepository;
    @Override
    public ResponseEntity<?> findAll() {
        //return eventCategoryRepository.findAll();
        List<EventCategory> list = eventCategoryRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Category", list,200));
        throw new NotFoundException("Can not found any Category");
    }
    @Override
    public ResponseEntity<?> addCategory(CategoryReq categoryReq)
    {
        try
        {
            EventCategory eventCategory = new EventCategory(categoryReq.getName());
            eventCategoryRepository.save(eventCategory);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Add category successfully","" ,200));
        }
        catch (Exception e )
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Add category with name: "+ categoryReq.getName(), "",400));
        }
    }
    @Override
    public ResponseEntity<?> deleteCategory(CategoryReq categoryReq)
    {
        Optional<EventCategory> eventCategory = eventCategoryRepository.findByName(categoryReq.getName());
        try
        {
            //eventRepository.findByEventCategoryList_Name(categoryReq.getName());
            if(eventCategory.isPresent() )
            {
                //eventCategoryRepository.delete(eventCategory.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Delete category successfully",eventRepository.existsAllByEventCategoryList_Name(categoryReq.getName()) ,200));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "category has existed with quantity: ", "",400));

            }
        }
        catch (Exception e )
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete  category fail with name: "+ categoryReq.getName(), "",400));
        }
    }
}
