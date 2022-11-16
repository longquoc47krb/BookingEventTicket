package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.account.Account;
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
    Boolean existsByPhone(String phone);
    void deleteByEmail(String email);
    Optional<Account> findByPhoneOrNameOrEmail(String params1, String params2, String params3);


}
