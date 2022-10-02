package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Account;

import com.hcmute.bookingevent.Implement.IAccountService;
import lombok.AllArgsConstructor;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/account")
public class AccountController {
    private  final  IAccountService iAccountService;

    @GetMapping(path = "/admin/manage/users")
    public ResponseEntity<?> findAll (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iAccountService.findAll(pageable);
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return iAccountService.findAll();
    }
    @GetMapping("/findAccount")
    public ResponseEntity<?> findAccountByPhoneOrNameOrGmail(@RequestParam(value="value")  String value) {
        return iAccountService.findByPhoneOrNameOrGmail(value);
    }
    @PostMapping("/loginByPhone")
    public ResponseEntity<?> loginAccountByPhone(@RequestBody Account newAccount) {
        return iAccountService.loginAccountbyPhone(newAccount);
    }
    @PostMapping("/loginByGmail")
    public ResponseEntity<?> loginAccountByGmail(@RequestBody Account newAccount) {
        return iAccountService.loginAccountByGmail(newAccount);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable String id,@RequestBody Account updatedAccount) {
        return iAccountService.updateAccount(id,updatedAccount);
    }

    @PostMapping(path = "/users/avatar/{userId}")
    public ResponseEntity<?> updateUser (@PathVariable("userId") String userId,
                                         //HttpServletRequest request,
                                         @RequestParam MultipartFile file){
        return iAccountService.updateAvatar(userId,file);
        //User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        //if (user.getId().equals(userId) || !user.getId().isBlank())
         //   return userService.updateUserAvatar(userId, file);
        //throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }



}
