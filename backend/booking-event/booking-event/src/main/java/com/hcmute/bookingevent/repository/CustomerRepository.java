package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer,String> {
    Boolean existsByEmail(String email);
    Optional<Customer> findByEmail(String email);

}
