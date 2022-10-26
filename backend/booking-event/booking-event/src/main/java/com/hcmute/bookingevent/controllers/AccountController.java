package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Account;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/account")
public class AccountController {
    private final IAccountService iAccountService;
    private final JwtTokenProvider jwtUtils;

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
    public ResponseEntity<?> findAccountByPhoneOrNameOrEmail(@RequestParam(value="value")  String value) {
        return iAccountService.findByPhoneOrNameOrEmail(value);
    }
    @PostMapping("/loginByPhone")
    public ResponseEntity<?> loginAccountByPhone(@RequestBody Account newAccount) {
        return iAccountService.loginAccountbyPhone(newAccount);
    }
    @PostMapping("/loginByEmail")
    public ResponseEntity<?> loginAccountByEmail(@RequestBody Account newAccount) {
        return iAccountService.loginAccountByEmail(newAccount);
    }
    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateAccount(@PathVariable String email,@RequestBody Account updatedAccount, HttpServletRequest request) {
        String gmailAuth = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(gmailAuth.equals(email))
        {
            return iAccountService.updateAccount(email,updatedAccount);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }

    @PostMapping(path = "/update/avatar/{email}")
    public ResponseEntity<?> updateAvatarUser (@PathVariable String email,
                                         HttpServletRequest request,
                                         @RequestParam MultipartFile file){

        String gmailAuth = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(gmailAuth.equals(email)) {
            return iAccountService.updateAvatar(email, file);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }



}
