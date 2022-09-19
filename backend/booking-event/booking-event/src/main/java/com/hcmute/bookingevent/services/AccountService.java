package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
@Service
@AllArgsConstructor
public class AccountService implements IAccountService {
    private final AccountRepository accountRepository;

    @Override
    public ResponseEntity<?> findAll() {

        List<Account> list = accountRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Account", list));
        throw new NotFoundException("Can not found any account");
    }
    @Override
    public ResponseEntity<?> createAccount( Account newAccount) {


        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create account successfully ",  accountRepository.save(newAccount)));
    }

}
