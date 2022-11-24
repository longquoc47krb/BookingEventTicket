package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer,String> {
    Boolean existsByEmail(String email);
    Optional<Customer> findByEmail(String email);
    //List<Order> findByOrderList_IdEvent(String email);
    @Query("{ 'orderList.idEvent' : ?0 }")
    List<Order> findAllByOrderList_IdEvent(String idEvent);

    List<Customer> findCustomerByEmail(String email);
    //List<Order> find
}
