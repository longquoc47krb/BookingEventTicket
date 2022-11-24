package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.event.EventSlug;
import com.hcmute.bookingevent.models.organization.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order,String> {
    Optional<Order> findById(String id);
    List<Order> findAllByEmail(String email);
    List<Order> findAllByIdEvent(String email);
    List<Order> findAllByCustomerTicketList_Id(String ticketTypeId);
}
