package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Order;
import org.springframework.http.ResponseEntity;

public interface IOrderService {
    ResponseEntity<?> createCustomerOrder(String email, Order order);
    ResponseEntity<?> findCustomerOrderByEmail(String email);
    ResponseEntity<?> findOrderByEventId(String eventId);
    ResponseEntity<?> findOrderByTicketType(String ticketTypeId);
    ResponseEntity<?> findAll();
}
