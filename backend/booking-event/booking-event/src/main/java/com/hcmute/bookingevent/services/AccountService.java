package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.config.CloudinaryConfig;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import com.hcmute.bookingevent.responsitory.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AccountService implements IAccountService {
    @Autowired
    private final AccountRepository accountRepository;
    private final CloudinaryConfig cloudinary;
    private final CustomerRepository customerRepository;

    @Override
    public ResponseEntity<?> findAll() {

        List<Account> list = accountRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Account", list));
        throw new NotFoundException("Can not found any account");
    }
    @Override
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<Account> users = accountRepository.findAll(pageable);
        List<Account> userResList = users.toList();
        if (userResList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all user success", userResList));
        throw new NotFoundException("Can not find any user");
    }

    @Override
    public ResponseEntity<?> findAccountByName(String name) {

        Optional<Account> account = accountRepository.findByName(name);
        if (account.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", account));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Cannot find data with name:" + name, ""));
        }
    }



    @Override
    public ResponseEntity<?> findByPhoneOrNameOrEmail(String value) {

        //cái này phải bỏ vào tương ứng 3 tham số mà pk
        List<Account> account = accountRepository.findByPhoneOrNameOrEmail(value,value,value);
        if (account.size()>0) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", account));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Cannot find data with phoneNumber:" + value, ""));
        }
    }
    @Override
    public ResponseEntity<?> findAccountByEmail(String email) {

        Optional<Account> account = accountRepository.findByEmail(email);
        if (account.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", account));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Cannot find data with gmail:" + email, ""));
        }
    }

    @Override
    public ResponseEntity<?> loginAccountByEmail(Account account) {

        Optional <Account> newAccount =accountRepository.findByEmail(account.getEmail());

        System.out.println(account.getId());

        if(newAccount.isEmpty())
        {

            accountRepository.save(account);
            Customer customer = new Customer( account.getId() );
            customerRepository.save(customer);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Log in account successfully ", account));

        }
        else
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Log in account successfully ", account));

        }
      //  throw new ResponseObject(true, "Log in account successfully ", account));
    }

    @Override
    public ResponseEntity<?> loginAccountbyPhone(Account account) {
        Optional <Account> newAccount =accountRepository.findByPhone(account.getPhone());

        if(newAccount.isEmpty())
        {
            accountRepository.save(account);
            Customer customer = new Customer( account.getId() );
            customerRepository.save(customer);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Log in account successfully by Phone successfully ",account));

        }
        else
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Log in account successfully by Phone successfully ", account));

        }
    }
    @Override
    public ResponseEntity<?> updateAccount(String id, Account updatedAccount) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            account.get().setName(updatedAccount.getName());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", accountRepository.save(account.get())));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Save data fail with id:" + id, ""));
        }
    }
    @Override
    public ResponseEntity<?> updateAvatar(String id, MultipartFile file) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            if (file != null && !file.isEmpty()) {
                try {
                    String imgUrl = cloudinary.uploadImage(file, account.get().getAvatar());
                    account.get().setAvatar(imgUrl);
                    accountRepository.save(account.get());
                } catch (IOException e) {
                    throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload image");
                }
            }
            //UserRes res = userMapper.toUserRes(account.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Update avatar success", account));
        }
        throw new NotFoundException("Can not found user with id " + id );
    }

}
