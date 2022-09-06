package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/account")
public class AccountController {
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createAccount(@RequestBody Account newAccount) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create account successfully ",  accountRepository.save(newAccount)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseObject> updateAccount(@PathVariable String id,@RequestBody Account updatedAccount) {
        //      Account account = accountRepository.findById(String.valueOf(id)).orElseThrow(RuntimeException::new);
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            account.get().setName(updatedAccount.getName());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", accountRepository.save(account.get())));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Save data fail with id:" + id, ""));
        }

        // return ResponseEntity.ok(accountRepository.save(account) );
    }


}
