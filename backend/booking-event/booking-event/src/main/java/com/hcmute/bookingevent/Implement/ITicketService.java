package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.TicketType;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITicketService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> createTicket(String email, TicketType ticketType, String eventId);
    ResponseEntity<?> createMultipleTickets(String email, List<TicketType> ticketType,String eventId);

}
