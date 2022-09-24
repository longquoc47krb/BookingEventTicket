package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import org.springframework.http.ResponseEntity;

public interface IAccountService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> createAccount(Account newAccount);
    ResponseEntity<?> updateAccount(String id,Account account);
    ResponseEntity<?> findAccountByName(String name);
    ResponseEntity<?> findAccountByGmail(String gmail);
    ResponseEntity<?> findByPhoneOrNameOrGmail(String phoneNumber);
    ResponseEntity<?> registerAccountByPhone(String phone);
    ResponseEntity<?> loginAccountbyPhone(String phone);

}