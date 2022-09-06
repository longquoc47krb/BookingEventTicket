package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EventRepository extends MongoRepository<Event,String> {
    Optional<Event> findByName(String name);
}
