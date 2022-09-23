package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import com.hcmute.bookingevent.Implement.IAccountService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/account")
public class AccountController {
    private  final  IAccountService iAccountService;
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return iAccountService.findAll();

    }
    @GetMapping("/findAccount")
    public ResponseEntity<?> findAccountByPhone(@RequestParam(value="phone")  String phoneNumber) {
        return iAccountService.findAccountByPhoneNumber(phoneNumber);

    }
    @GetMapping("/findAccount")
    public ResponseEntity<?> findAccountByGmail(@RequestParam(value="gmail") String gmail) {
        return iAccountService.findAccountByGmail(gmail);

    }
    @GetMapping("/findAccount")
    public ResponseEntity<?> findAccountByName(@RequestParam(value="name") String name) {
        return iAccountService.findAccountByName(name);

    }
    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody Account newAccount) {
        return iAccountService.createAccount(newAccount);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable String id,@RequestBody Account updatedAccount) {
        return iAccountService.updateAccount(id,updatedAccount);
    }


}
