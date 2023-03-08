package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Review;
import org.springframework.http.ResponseEntity;

public interface IReviewService {
    ResponseEntity<?> submitReview(Review review,String email);
    ResponseEntity<?> isReviewAvailable(String email,String eventId);
    ResponseEntity<?> findAllByEventId(String eventId);
    ResponseEntity<?> deleteReview(String email,String eventId);
}
