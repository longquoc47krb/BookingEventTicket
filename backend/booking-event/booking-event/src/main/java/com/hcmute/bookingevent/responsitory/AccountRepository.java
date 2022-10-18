package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account,String> {
    List<Account> findAll();
    Optional<Account> findById(String id);
    Optional<Account> findByName(String name);
    Optional<Account> findByEmail(String email);
    Optional<Account> findByPhone(String name);
    Boolean existsByEmail(String email);
    List<Account> findByPhoneOrNameOrEmail(String params1, String params2, String params3);


}
