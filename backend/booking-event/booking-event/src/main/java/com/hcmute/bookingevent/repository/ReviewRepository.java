package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends MongoRepository<Review,String> {
    Boolean existsByEmail(String email);
    Boolean existsByEmailAndIdEvent(String email,String idEvent);
    List<Review> findAllByIdEvent(String idEvent);
    Optional<Review> findByEmailAndIdEvent(String email,String idEvent);
    void deleteByEmailAndIdEvent(String email, String idEvent);
}
