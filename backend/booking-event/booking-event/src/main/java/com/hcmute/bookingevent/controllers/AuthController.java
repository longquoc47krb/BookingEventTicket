package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IAccountService;
import com.hcmute.bookingevent.Implement.IAuthService;
import com.hcmute.bookingevent.payload.LoginReq;
import com.hcmute.bookingevent.services.MailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/auth")
public class AuthController {
    @Autowired
    private final MailService mailService;
    private  final IAuthService iAuthService;


//    @ResponseBody
    @RequestMapping(value = "/sendHtmlEmail",method = RequestMethod.POST)
    public ResponseEntity<?> sendHtmlEmail(@RequestParam(value="name")  String name) throws MessagingException {
        return mailService.sendMail(name);

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReq loginReq) {
        return iAuthService.login(loginReq);
    }
}
