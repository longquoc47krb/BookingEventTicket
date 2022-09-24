package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import org.springframework.http.ResponseEntity;

public interface ICustomerService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> createAccount(Customer newAccount);
}
