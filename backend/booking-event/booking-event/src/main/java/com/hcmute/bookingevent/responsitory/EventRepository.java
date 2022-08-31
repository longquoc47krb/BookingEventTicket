package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event,String> {

}
