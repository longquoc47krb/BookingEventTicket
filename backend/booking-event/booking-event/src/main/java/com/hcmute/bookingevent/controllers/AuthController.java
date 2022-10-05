package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.services.MailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private final MailService mailService;


//    @ResponseBody
    @RequestMapping("/sendHtmlEmail")
    public ResponseEntity<?> sendHtmlEmail(@RequestParam(value="name")  String name) throws MessagingException {
        return mailService.sendMail(name);

    }
}
