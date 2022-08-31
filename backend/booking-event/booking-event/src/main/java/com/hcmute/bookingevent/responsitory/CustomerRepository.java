package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer,String> {
}
