package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.event.EventSlug;
import com.hcmute.bookingevent.models.organization.Organization;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order,String> {
    Optional<Order> findById(String id);
    List<Order> findAllByEmail(String email);
    @Query("{ 'idEvent' : ?0 }")
    List<Order> findAllByIdEvent(String idEvent);
    List<Order> findAllByCustomerTicketList_Id(String ticketTypeId);
    //@Query("{ distinct:'order', key: 'email' }")
    @Aggregation(" [{ $group : { _id : '$email' }}] ")
    List<Order> getOrderDistance();
    List<Order> findDistinctByEmail();
}
