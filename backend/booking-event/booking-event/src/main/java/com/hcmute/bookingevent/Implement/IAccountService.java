package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface IAccountService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> findAll(Pageable pageable);
    ResponseEntity<?> updateAccount(String id,Account account);
    ResponseEntity<?> findAccountByName(String name);
    ResponseEntity<?> findAccountByEmail(String email);
    ResponseEntity<?> findByPhoneOrNameOrEmail(String phoneNumber);

    ResponseEntity<?> updateAvatar(String id, MultipartFile file);
    ResponseEntity<?> loginAccountByEmail(Account account);
    ResponseEntity<?> loginAccountbyPhone(Account account);
}
