package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.Implement.ICustomerService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.payload.request.ItemWishListReq;
import com.hcmute.bookingevent.payload.request.RegisterReq;
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
    @PostMapping(path = "/customer/wishlist/{idItem}")
    public ResponseEntity<?> addWishList (@PathVariable String idItem,@RequestParam(value="userId", required = false) String userId, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.addWishList(idItem,account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");


    }
    @GetMapping(path = "/customer/wishlist/{userId}")
    public ResponseEntity<?> viewWishList (@PathVariable String userId, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.viewWishList(account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");


    }
    @DeleteMapping(path = "/customer/wishlist/{idItem}")
    public ResponseEntity<?> deleteItemWishList (@PathVariable String idItem,@RequestParam(value="userId", required = false) String userId , HttpServletRequest request ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.deleteItemWishList(idItem, account.getEmail());
        }        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @PostMapping(path = "/customer/order/{userId}")
    public ResponseEntity<?> createCustomerOrder (@PathVariable String userId, @Valid @RequestBody Order order, HttpServletRequest request   ){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iCustomerService.createCustomerOrder(account.getEmail(),order);
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
//    @PostMapping("/customer/create")
//    public ResponseEntity<?> createAccount(@RequestBody Customer newAccount) {
//        return iCustomerService.createAccount(newAccount);
//    }
}
