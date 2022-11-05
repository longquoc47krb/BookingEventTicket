package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.ticket.OrganizationTicket;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITicketService {
//    ResponseEntity<?> findAll();
    ResponseEntity<?> createTicket(String email, OrganizationTicket organizationTicket, String eventId);
    ResponseEntity<?> createMultipleTickets(String email, List<OrganizationTicket> organizationTicket, String eventId);

}
