package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.response.ResponseObject;
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

    final String OTP_CONTENT ="Please enter this code to verify your action with LotusTicket. This code use only once. Please do not share this code to with anyone else due to security for yourself \n";
    final String TYPE_EMAIL = "text/html;";


    public void sendMail(Account account, String messageContent) throws MessagingException, TemplateException, IOException
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
            model.put("header", "Verify your account");
            model.put("title", "LOTUS TICKET");
            model.put("name", account.getName());
            model.put("content", OTP_CONTENT);
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
