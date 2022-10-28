package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.Implement.ICustomerService;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class CustomerController {
    private  final ICustomerService iCustomerService;
    @GetMapping(path = "/admin/get/customers")
    public ResponseEntity<?> findAllCustomer (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iCustomerService.findAll(pageable);
    }
    @GetMapping("/customer/findAll")
    public ResponseEntity<?> findAll() {
        return iCustomerService.findAll();

    }
    @PostMapping("/customer/create")
    public ResponseEntity<?> createAccount(@RequestBody Customer newAccount) {
        return iCustomerService.createAccount(newAccount);
    }
}
