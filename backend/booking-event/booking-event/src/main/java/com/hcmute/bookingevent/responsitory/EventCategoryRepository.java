package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.EventCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EventCategoryRepository extends MongoRepository<EventCategory,String> {
    Optional<EventCategory> findById(String id);
}
