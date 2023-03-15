package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Admin;
import com.hcmute.bookingevent.models.account.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin,String> {
    Optional<Admin> findByEmail(String email);

}
