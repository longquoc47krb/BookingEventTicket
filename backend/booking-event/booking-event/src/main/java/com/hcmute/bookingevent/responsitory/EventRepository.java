package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.EventCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<Event,String> {
    Optional<Event> findByName(String name);
    List<Event> findAllBy(TextCriteria textCriteria);
    //List<EventCategory>  findEventByAndEventCategoryList(String id);
}
