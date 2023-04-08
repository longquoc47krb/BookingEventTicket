package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Order;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public interface IOrderService {
    ResponseEntity<?> createCustomerOrder(String email, Order order);
    ResponseEntity<?> findCustomerOrderByEmail(String email);
    ResponseEntity<?> findOrderByEventId(String eventId,String email);
    ResponseEntity<?> findOrderByTicketType(String ticketTypeId);
    ResponseEntity<?> findAll();
    ResponseEntity<?> checkOrderAvailability( Order order);

}
