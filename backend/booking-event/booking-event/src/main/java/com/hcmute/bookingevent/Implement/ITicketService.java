package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface ITicketService {
//    ResponseEntity<?> findAll();
    ResponseEntity<?> createTicket(String email, OrganizationTicketReq organizationTicketReq, String eventId);
    ResponseEntity<?> createMultipleTickets(String email, List<OrganizationTicketReq> organizationTicketReq, String eventId);
    ResponseEntity<?> getTicketStatistics(String email, String period, LocalDate startDate, LocalDate endDate);
}
