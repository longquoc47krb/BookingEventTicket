package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrderService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.ExceptionRes;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class OrderController {
    private final IOrderService iOrderService;
    private final JwtTokenProvider jwtUtils;


    @PostMapping(path = "/customer/order/{userId}")
    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<?> createCustomerOrder(@PathVariable String userId, @Valid @RequestBody Order order, HttpServletRequest request) throws Exception {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(userId)) {
            return iOrderService.createCustomerOrder(account.getEmail(), order);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
        //throw new Exception(" You don't have permission! Token is invalid or fall by order");
    }
    @GetMapping(path = "/order/all")
    public ResponseEntity<?> findAll() {
        return  iOrderService.findAll();
    }
    @GetMapping(path = "/customer/order")
    public ResponseEntity<?> findCustomerOrderByEmail(@RequestParam(value="userId", required = false) String userId, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(userId)) {
            return iOrderService.findCustomerOrderByEmail(account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping(path = "/organization/order")
    public ResponseEntity<?> findOrderByEventId(@RequestParam(value="userId", required = false) String userId,@RequestParam(value="eventId", required = false) String eventId, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(userId)) {
            return iOrderService.findOrderByEventId(eventId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping(path = "/customer/availability/order/{userId}")
    public ResponseEntity<?> checkOrderAvailability(@PathVariable String userId, @Valid @RequestBody Order order, HttpServletRequest request) throws Exception {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(userId)) {
            return iOrderService.checkOrderAvailability(order);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
        //throw new Exception(" You don't have permission! Token is invalid or fall by order");
    }
    @GetMapping(path = "/organization/order/ticketType/{userId}")
    public ResponseEntity<?> findOrderByTicketType(@PathVariable String userId,@RequestParam(value="ticketTypeId", required = false) String ticketTypeId, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(userId)) {
            return iOrderService.findOrderByTicketType(ticketTypeId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
}
