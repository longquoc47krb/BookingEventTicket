package com.hcmute.bookingevent.repository;


import com.hcmute.bookingevent.models.event.EventSlug;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EventSlugGeneratorRepository extends MongoRepository<EventSlug, String> {

    Optional<EventSlug> findById(String id);
}
