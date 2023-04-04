package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.ICustomerService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.payload.request.EmailReq;
import com.hcmute.bookingevent.payload.request.OrderReq;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class CustomerController {
    private  final ICustomerService iCustomerService;
    private final JwtTokenProvider jwtUtils;

    @GetMapping(path = "/admin/customers")
    public ResponseEntity<?> findAllCustomer (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iCustomerService.findAll(pageable);
    }
    @PostMapping(path = "/customer/wishlist/{userId}")
    public ResponseEntity<?> addWishList (@PathVariable String userId,@RequestParam(value="idItem", required = false) String idItem, HttpServletRequest request   ){
    try {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.addWishList(idItem,account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    catch (ArrayIndexOutOfBoundsException ex)
    {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject(true, ex.getMessage(), "",400));

    }


    }
    @GetMapping(path = "/customer/wishlist/{userId}")
    public ResponseEntity<?> viewWishList (@PathVariable String userId, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.viewWishList(account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");


    }
    @PostMapping(path = "/customer/followedOrganizer/{userId}")
    public ResponseEntity<?> followOrganizer (@PathVariable String userId,@Valid @RequestBody EmailReq emailReq, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.followOrganizer(emailReq.getEmail(),account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @GetMapping(path = "/customer/followedOrganizer/{userId}")
    public ResponseEntity<?> findFollowedOrganizerList (@PathVariable String userId, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.findFollowOrganizerList(account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @DeleteMapping(path = "/customer/followedOrganizer/{userId}")
    public ResponseEntity<?> deleteFollowedOrganizerList (@PathVariable String userId,@Valid @RequestBody EmailReq emailReq, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.deleteFollowOrganizerItem(emailReq.getEmail(),account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @DeleteMapping(path = "/customer/wishlist/{idItem}")
    public ResponseEntity<?> deleteItemWishList (@PathVariable String idItem,@RequestParam(value="userId", required = false) String userId , HttpServletRequest request ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.deleteItemWishList(idItem, account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }

    @DeleteMapping(path = "/customer/wishlist/all/{userId}")
    public ResponseEntity<?> deleteAllWishList (@PathVariable String userId, HttpServletRequest request ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.deleteAllWishList(account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }

    @GetMapping("/customer/findAll")
    public ResponseEntity<?> findAll() {
        return iCustomerService.findAll();

    }
    @GetMapping("/customer/checkFollowedOrganizer/{userId}")
    public ResponseEntity<?> checkIsFollowedOrganizer(@PathVariable String userId, @RequestParam String organizerEmail){
        return iCustomerService.checkIsFollowedOrganizer(userId, organizerEmail);
    }
}
