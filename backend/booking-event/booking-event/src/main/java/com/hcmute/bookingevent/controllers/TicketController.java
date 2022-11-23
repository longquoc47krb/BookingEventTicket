package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import com.hcmute.bookingevent.services.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class TicketController {
    private final TicketService ticketService;
    private final JwtTokenProvider jwtUtils;

    @PostMapping("/ticket/{userId}/{eventId}")
    public ResponseEntity<?> createSingleTicket(@PathVariable String userId, @PathVariable String eventId, @RequestBody OrganizationTicketReq organizationTicketReq, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return ticketService.createTicket(account.getEmail(), organizationTicketReq,eventId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @PostMapping("/ticket/list/{userId}")
    public ResponseEntity<?> createMultipleTicket(@PathVariable String userId, @PathVariable String eventId, @RequestBody List<OrganizationTicketReq> organizationTicketReq, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return ticketService.createMultipleTickets(account.getEmail(), organizationTicketReq,eventId );
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping("/ticket/{eventId}/{ticketId}")
    public ResponseEntity<?> decreaseTicket(@PathVariable String eventId, @PathVariable String ticketId){
        return ticketService.reduceTicketQuantity(eventId, ticketId);
    }

}
