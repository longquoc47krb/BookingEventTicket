package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.services.mail.EMailType;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import freemarker.template.Configuration;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender emailSender;
    private final Configuration configuration;

    final String MAIL_TEMPLATE = "mail-template.ftl";

    final String OTP_CONTENT ="Please enter this code to verify your action with LotusTicket. This code use only once. Please do not share this code to with anyone else due to security for yourself. The code is only valid for 5 minutes. " +
            "<br>Regards,\n";
    final String NEWPASSWORD_CONTENT ="You are receiving this email because we received a password reset request for your account. Please visit our website to change your new password. You should keep a secure record of your password and not disclose it to any unauthorized party." +
            "<br>Regards,";
    final String REGISTER_CONTENT ="Welcome to LotusTicket! You have successfully registered. Please visit our website to explore " +
            "<br>Regards,";
    final String TYPE_EMAIL = "text/html";


    public void sendMail(Account account, String messageContent , EMailType type) throws MessagingException, TemplateException, IOException
    {
        log.info(Thread.currentThread().getName()+ "- send email start");
        try
        {
            Map<String, Object> model = new HashMap<>();
            MimeMessage mimeMailMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage);
            Template template =null;
            configuration.setClassForTemplateLoading(this.getClass(), "/templates");
            //if (type.equals(EMailType.AUTH)) {
            template = configuration.getTemplate(MAIL_TEMPLATE);
            if(type.equals(EMailType.OTP))
            {
                model.put("header", "Verify your account");
                model.put("content", OTP_CONTENT);
            }
            else if(type.equals(EMailType.NEW_PASSWORD))
            {
                model.put("header", "Receive new password");
                model.put("content", NEWPASSWORD_CONTENT);
            }
            else if (type.equals(EMailType.REGISTER))
            {
                model.put("header", "Register successfully");
                model.put("content", REGISTER_CONTENT);
            }

            model.put("title", "LOTUS TICKET");
            model.put("name", account.getName());
            model.put("contentColor", messageContent);

            String html = FreeMarkerTemplateUtils.processTemplateIntoString(Objects.requireNonNull(template),model);
            mimeMailMessage.setContent(html, TYPE_EMAIL);

            //helper.setFrom(FROM_EMAIL);
            helper.setTo(account.getEmail());
            helper.setText(html,true);
            helper.setSubject((String) model.get("header"));

            emailSender.send(mimeMailMessage);
            log.info(Thread.currentThread().getName()+ "- send email end");

        }
        catch (TemplateException ex)
        {
            log.info("Error : {}",ex.toString());

        }


    }
}
