package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAuthService;
import com.hcmute.bookingevent.payload.request.ForgetOrGenerateReq;
import com.hcmute.bookingevent.payload.request.LoginReq;
import com.hcmute.bookingevent.payload.request.RegisterReq;
import com.hcmute.bookingevent.payload.request.VerifyOTPReq;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/auth")
public class AuthController {

    private  final IAuthService iAuthService;


//    @ResponseBody
//    @RequestMapping(value = "/sendHtmlEmail",method = RequestMethod.POST)
//    public ResponseEntity<?> sendHtmlEmail(@RequestParam(value="name")  String name) throws MessagingException {
//        return mailService.sendMail(name,"");
//
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
}
