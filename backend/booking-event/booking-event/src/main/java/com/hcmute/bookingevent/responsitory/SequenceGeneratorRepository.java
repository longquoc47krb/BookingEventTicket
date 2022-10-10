package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.DatabaseSequence;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SequenceGeneratorRepository extends MongoRepository<DatabaseSequence, String> {

    Optional<DatabaseSequence> findById(String id);
}
