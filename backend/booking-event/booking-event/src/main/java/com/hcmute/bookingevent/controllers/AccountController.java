package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Account;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.payload.LoginReq;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/account")
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
