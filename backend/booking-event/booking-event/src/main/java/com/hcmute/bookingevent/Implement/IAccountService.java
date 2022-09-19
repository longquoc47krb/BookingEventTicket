package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import org.springframework.http.ResponseEntity;

public interface IAccountService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> createAccount(Account newAccount);
}
