package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IReviewService;
import com.hcmute.bookingevent.models.Review;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public ResponseEntity<?> submitReview(Review review, String email) {
        if (review.getEmail().equals(email)) {
            review.setCreatedAt(new Date());
            reviewRepository.save(review);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "submitReview successfully", "", 200));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject(true, "can not submit with other email", "", 400));

    }

    //kiểm tra xem người dùng đã comment lần đầu hay chưa
    @Override
    public ResponseEntity<?> isReviewAvailable(String email, String eventId) {
        if (reviewRepository.existsByEmailAndIdEvent(email, eventId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "user can not post feedback and change it", "", 400));
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "user can post feedback", "", 200));
    }

    @Override
    public ResponseEntity<?> findAllByEventId(String eventId) {
        List<Review> reviewList = reviewRepository.findAllByIdEvent(eventId);
        if (!reviewList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Review List by EventId", reviewList, 200));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject(false, "List is empty", "", 404));
    }

    @Override
    public ResponseEntity<?> deleteReview(String email, String eventId) {
        try {
            reviewRepository.deleteByEmailAndIdEvent(email, eventId);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, " delete Review successfully", "", 200));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "delete Review fail", "", 400));
        }

    }
    @Override
    public ResponseEntity<?> updateReview(Review review,String email )
    {
        if (review.getEmail().equals(email)) {
            Optional<Review> newReview=  reviewRepository.findByEmailAndIdEvent(review.getEmail(), review.getIdEvent());
            newReview.get().setMessage(review.getMessage());
            newReview.get().setRate(review.getRate());
            newReview.get().setCreatedAt(new Date());
            reviewRepository.save(newReview.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "edit review successfully", "", 200));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject(true, "can not edit review", "", 400));

    }

}
