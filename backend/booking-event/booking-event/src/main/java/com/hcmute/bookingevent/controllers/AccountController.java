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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping(path = "/account")
public class AccountController {
    @Autowired
    AccountRepository accountRepository;


    private  final  IAccountService iAccountService;



    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return iAccountService.findAll();

    }


    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody Account newAccount) {
        return iAccountService.createAccount(newAccount);
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
