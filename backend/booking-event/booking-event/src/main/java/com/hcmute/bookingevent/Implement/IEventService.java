package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.request.EventReq;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface IEventService {
    ResponseEntity<?> createEvent(EventReq eventReq, String email);
    ResponseEntity<?> findAllEvents();
    ResponseEntity<?> findEventAfterToday();
    ResponseEntity<?> findBestSellerEvent();
    ResponseEntity<?> findEventsByProvince(String province);
    ResponseEntity<?> deleteEvent(String id,String email);
    ResponseEntity<?> findEventById(String id);

    ResponseEntity<?> searchEvents(String key);
    ResponseEntity<?> findEventListById(String id);
    ResponseEntity<?> eventPagination(Pageable pageable);
    ResponseEntity<?> checkEventStatus();
    ResponseEntity<?> updateEvent(String id,EventReq eventReq);
    ResponseEntity<?> findAllbyPage(Pageable pageable);

    ResponseEntity<?> filterEvents(String province,
                                   String categoryId,
                                   String status);
    ResponseEntity<?> updateEventBackground(String id, MultipartFile file);


}
