package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.event.Event;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<Event,String> {
    List<Event> findAllBy(TextCriteria textCriteria);
    @Query(value="{'host_id': ?0}")
    List<Event> findAllByHost_id(String host_id);

    //List<Event> findEventByHost_id(String hostId);
    List<Event> findAllByCreatedDateBetween(Date start, Date end);
    @Query(value="{'province': ?0, 'status' : 'event.available'}")
    List<Event> findAllByProvince(String province);

    Optional<Event> findEventById(String id);
    //Optional<Event> fin(String email);
    List<Event> findByEventCategoryList_Name(String name);
    Long countByEventCategoryList_Name(String name);
    Boolean existsAllByEventCategoryList_Name(String name);

    List<Event> findByCreatedDateBetween(LocalDate currentDate,  LocalDate endDate);

    // findByProvinceAndCategoryIdAndStatusAndDateBetween
    List<Event> findByProvinceAndEventCategoryListContainsAndStatusAndStartingDateBetween(String province, String categoryId, String status, String string, String string1);
}
