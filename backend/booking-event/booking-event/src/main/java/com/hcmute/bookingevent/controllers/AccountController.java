package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IEventService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.account.Account;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.payload.request.UpdateInforRes;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import com.hcmute.bookingevent.services.AdminService;
import com.hcmute.bookingevent.services.EventService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
public class AccountController {
    private final IAccountService iAccountService;
    private final JwtTokenProvider jwtUtils;
    private final AdminService adminService;

    @GetMapping(path = "/admin/accounts")
    public ResponseEntity<?> findAll (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iAccountService.findAll(pageable);
    }
    @GetMapping(path = "/admin/profile")
    public ResponseEntity<?> getAdminProfile (@RequestParam(value = "email", defaultValue = "lotusticket.vn@gmail.com") String email ){
        return  adminService.findAccountByEmail(email);
    }
    @GetMapping("/account/findAll")
    public ResponseEntity<?> findAll() {
        return iAccountService.findAll();
    }
    @GetMapping("/account/findAccount")
    public ResponseEntity<?> findAccountByPhoneOrNameOrEmail(@RequestParam(value="value")  String value) {
        return iAccountService.findByPhoneOrNameOrEmail(value);
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable String id,@RequestBody Account updatedAccount, HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(id))
        {
            return iAccountService.updateAccount(account.getEmail(), updatedAccount);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping("/account/{id}")
    public ResponseEntity<?> findAccountById(@PathVariable String id,HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(id)) {
            return iAccountService.findAccountById(id);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @PostMapping(path = "/account/avatar/{id}")
    public ResponseEntity<?> updateAvatarUser (@PathVariable String id,
                                         HttpServletRequest request,
                                         @RequestParam MultipartFile file){

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(id)) {
            return iAccountService.updateAvatar(account.getEmail(), file);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @PostMapping(path = "/account/infor/{id}")
    public ResponseEntity<?> updateInformation (@PathVariable String id,@RequestBody UpdateInforRes updateInforRes, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(id)) {
            return iAccountService.updateInformation(updateInforRes,account.getEmail());
        }

        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
 

}
