package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import java.util.List;
public interface ReviewRepository extends MongoRepository<Review,String> {
    Boolean existsByEmail(String email);
    Boolean existsByEmailAndIdEvent(String email,String idEvent);
    List<Review> findAllByIdEvent(String idEvent);
    void deleteByEmailAndIdEvent(String email, String idEvent);
}
