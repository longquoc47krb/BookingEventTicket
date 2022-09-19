package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account,String> {
    List<Account> findAll();
    Optional<Account> findById(String id);
}
