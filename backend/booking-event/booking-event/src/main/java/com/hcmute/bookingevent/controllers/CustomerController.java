package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.Implement.ICustomerService;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/customer")
public class CustomerController {
    private  final ICustomerService iCustomerService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return iCustomerService.findAll();

    }
    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody Customer newAccount) {
        return iCustomerService.createAccount(newAccount);
    }
}
