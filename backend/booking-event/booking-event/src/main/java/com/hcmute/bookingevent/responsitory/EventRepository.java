package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.EventCategory;
import com.mongodb.lang.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface EventRepository extends MongoRepository<Event,String> {
    List<Event> findAllBy(TextCriteria textCriteria);

    @Query(value="{'eventCategoryList.id' : ?0}")
    List<Event> findAllByCategoryId(String categoryId);
    @Query(value = "{'province': ?0,'eventCategoryList.id' : ?1, 'status' : ?2}")
    List<Event> findAllByFilter(String province, String categoryId, String status);
    @Query(value="{'eventCategoryList.id' : ?0, 'status' : ?1}")
    List<Event> findAllByCategoryAndStatus(String categoryId,String status);
    @Query(value="{'province': ?0, 'eventCategoryList.id' : ?1}")
    List<Event> findAllByProvinceAndCategory( String province, String categoryId);
    @Query(value="{'province': ?0, 'status' : ?1}")
    List<Event> findAllByProvinceAndStatus(String province,  String status);
    @Query(value="{'status' : ?0}")
    List<Event> findAllByStatus(String status);
    @Query(value="{'province' : ?0}")
    List<Event> findAllByProvince(String province);


    
}
