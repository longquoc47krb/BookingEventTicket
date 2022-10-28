package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface ICustomerService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> createAccount(Customer newAccount);
    ResponseEntity<?> findAll(Pageable pageable);
    ResponseEntity<?> deleteCustomer(String email);
}
