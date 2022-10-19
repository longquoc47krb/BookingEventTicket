package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.payload.response.ResponseObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender emailSender;
    public ResponseEntity<?> sendMail(String nameRecipient,String messageContent) throws MessagingException
    {
        MimeMessage message = emailSender.createMimeMessage();

        boolean multipart = true;

        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

        String htmlMsg = "<h3>Im testing send a HTML email</h3>"
                +"<img src='http://www.apache.org/images/asf_logo_wide.gif'>";

        message.setContent(htmlMsg, "text/html");

        helper.setTo(nameRecipient);
        helper.setSubject(messageContent);
        if(messageContent.isEmpty())
        {
            helper.setSubject("Test send HTML email");

        }

        try
        {
            this.emailSender.send(message);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(true, e.toString(), "",404));
        }


        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject(true, "Email sent", "",200));
    }
}
