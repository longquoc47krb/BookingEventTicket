package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.payload.ResponseObject;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
@Service
@AllArgsConstructor
public class MailService {
    @Autowired
    public JavaMailSender emailSender;
    public ResponseEntity<?> sendMail(String nameRecipient) throws MessagingException
    {
        MimeMessage message = emailSender.createMimeMessage();

        boolean multipart = true;

        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

        String htmlMsg = "<h3>Im testing send a HTML email</h3>"
                +"<img src='http://www.apache.org/images/asf_logo_wide.gif'>";

        message.setContent(htmlMsg, "text/html");

        helper.setTo(Constants.FRIEND_EMAIL);

        helper.setSubject("Test send HTML email");


        this.emailSender.send(message);

        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject(true, "Email sent", ""));
    }
}
