package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface IAccountService {
    ResponseEntity<?> findAll();

    ResponseEntity<?> updateAccount(String id,Account account);
    ResponseEntity<?> findAccountByName(String name);
    ResponseEntity<?> findAccountByGmail(String gmail);
    ResponseEntity<?> findByPhoneOrNameOrGmail(String phoneNumber);

    ResponseEntity<?> updateAvatar(String id, MultipartFile file);
    ResponseEntity<?> loginAccountByGmail(Account account);
    ResponseEntity<?> loginAccountbyPhone(Account account);
}
