package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAuthService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.payload.request.*;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/auth")
public class AuthController {
    private final JwtTokenProvider jwtUtils;

    private  final IAuthService iAuthService;
//    @RequestMapping(value = "/user")
//    public Principal user(Principal principal) {
//        return principal;
//    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReq loginReq) {
        return iAuthService.login(loginReq);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterReq registerReq) {
        return iAuthService.registerUser(registerReq);
    }
    @PostMapping("/forget")
    public ResponseEntity<?> forgetPassword(@Valid @RequestBody ForgetOrGenerateReq forgetOrGenerateReq) {
        return iAuthService.forgetPassword(forgetOrGenerateReq);
    }
    @PostMapping("/verifyOTP")
    public ResponseEntity<?> verifyOTP(@Valid @RequestBody VerifyOTPReq verifyOTPReq) {
        return iAuthService.verifyOTP(verifyOTPReq);
    }
    @PostMapping("/verifyChangePassword")
    public ResponseEntity<?> verifyChangePassword(@Valid @RequestBody LoginReq loginReq) {
        return iAuthService.verifyChangePassword(loginReq);
    }
    @PostMapping("/generateNewPassword")
    public ResponseEntity<?> generateNewPassword(@Valid @RequestBody ForgetOrGenerateReq forgetOrGenerateReq) {
        return iAuthService.generateNewPassword(forgetOrGenerateReq.getEmail());
    }
    @PostMapping("/changePassword/{email}")
    public ResponseEntity<?> changePassword(@PathVariable String email, @Valid @RequestBody ChangePasswordRes changePasswordRes, HttpServletRequest request) {
        String gmailAuth = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(gmailAuth.equals(email)) {
            return iAuthService.changePassword(changePasswordRes);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

}
