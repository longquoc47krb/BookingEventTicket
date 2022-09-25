package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Account;

import com.hcmute.bookingevent.Implement.IAccountService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



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
    public ResponseEntity<?> findAccountByPhoneOrNameOrGmail(@RequestParam(value="value")  String value) {
        return iAccountService.findByPhoneOrNameOrGmail(value);

    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@RequestBody Account newAccount) {
        return iAccountService.createAccount(newAccount);
    }
    @PostMapping("/registerByPhone")
    public ResponseEntity<?> createAccountByPhone(@RequestBody String phone) {
        return iAccountService.registerAccountByPhone(phone);
    }
    @GetMapping("/loginByPhone")
    public ResponseEntity<?> loginAccountByPhone(@RequestBody String phone) {
        return iAccountService.loginAccountbyPhone(phone);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable String id,@RequestBody Account updatedAccount) {
        return iAccountService.updateAccount(id,updatedAccount);
    }


}
