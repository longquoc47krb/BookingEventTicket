package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.config.CloudinaryConfig;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Override
    public ResponseEntity<?> findAll() {

        List<Account> list = accountRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Account", list));
        throw new NotFoundException("Can not found any account");
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
    public ResponseEntity<?> findByPhoneOrNameOrGmail(String value) {

        //cái này phải bỏ vào tương ứng 3 tham số mà pk
        List<Account> account = accountRepository.findByPhoneOrNameOrGmail(value,value,value);
        if (account.size()>0) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", account));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Cannot find data with phoneNumber:" + value, ""));
        }
    }
    @Override
    public ResponseEntity<?> findAccountByGmail(String gmail) {

        Optional<Account> account = accountRepository.findByGmail(gmail);
        if (account.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save data successfully ", account));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Cannot find data with gmail:" + gmail, ""));
        }
    }
    @Override
    public ResponseEntity<?> createAccount(Account newAccount) {
        Account account = accountRepository.save(newAccount);
        System.out.println(account.getId());
        if(newAccount!=null)
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create account successfully ", account));

        }
         throw new NotFoundException("Can not create any account");
    }

    @Override
    public ResponseEntity<?> registerAccountByPhone(String phone) {
        Optional <Account> account = accountRepository.findByPhone(phone);
        //System.out.println(account.getId());
        if(account==null)
        {
            account.get().setPhone(phone);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Register account by Phone successfully ", accountRepository.save(account.get())));

        }
        throw new NotFoundException("Can not register by phone");
    }
    @Override
    public ResponseEntity<?> loginAccountbyPhone(String phone) {
        Optional <Account> account = accountRepository.findByPhone(phone);
        //System.out.println(account.getId());
        if(account!=null)
        {
            account.get().setPhone(phone);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Login account by Phone successfully ",""));

        }
        throw new NotFoundException("Can not register by phone");
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
                    new ResponseObject(true, "Update user success", account));
        }
        throw new NotFoundException("Can not found user with id " + id );
    }

}
