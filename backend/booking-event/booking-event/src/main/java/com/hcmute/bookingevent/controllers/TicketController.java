package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.TicketType;
import com.hcmute.bookingevent.payload.request.OrganizationSubmitReq;
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
    public ResponseEntity<?> createSingleTicket(@PathVariable String userId,@PathVariable String eventId,@RequestBody TicketType ticketType, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return ticketService.createTicket(account.getEmail(),ticketType ,eventId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @PostMapping("/ticket/list/{userId}")
    public ResponseEntity<?> createMultipleTicket(@PathVariable String userId,@PathVariable String eventId, @RequestBody List<TicketType> ticketType, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return ticketService.createMultipleTickets(account.getEmail(),ticketType,eventId );
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }

}
