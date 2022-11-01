package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Event;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EventRepository extends MongoRepository<Event,String> {
    List<Event> findAllBy(TextCriteria textCriteria);
    @Query(value="{'province': ?0, 'status' : 'event.available'}")
    List<Event> findAllByProvince(String province);

}
