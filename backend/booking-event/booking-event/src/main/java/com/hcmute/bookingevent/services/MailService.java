package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.services.mail.EMailType;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.apache.commons.text.StringEscapeUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import freemarker.template.Configuration;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender emailSender;
    private final Configuration configuration;
    private final AccountRepository accountRepository;


    final String MAIL_TEMPLATE = "newmail-template.ftl";

    final String OTP_CONTENT ="Please enter this code to verify your action with LotusTicket. This code use only once. Please do not share this code to with anyone else due to security for yourself. The code is only valid for 5 minutes. " ;
            //"<br>Regards,\n";
    final String NEWPASSWORD_CONTENT ="You are receiving this email because we received a password reset request for your account. Please visit our website to change your new password. You should keep a secure record of your password and not disclose it to any unauthorized party." ;
            //"<br>Regards,";
    final String REGISTER_CONTENT ="Welcome to LotusTicket! You have successfully registered. Please visit our website to explore " ;
           // "<br>Regards,";
    final String BECOME_ORGANIZATION_CONTENT ="Welcome to LotusTicket! You have successfully sent your application form . Please wait for a few days to allow us to verify your information before you have full authentication to our website. We will notify you  of result as soon as possible" ;
           // "<br>Regards,";
    final String OFFICIAL_ORGANIZATION_CONTENT ="We have reviewed your application form. After taking into consideration based on our term conditions. We officially inform that you have full authorization of organization role." +
            "<br>Please use this password below to sign in your account in our system. Click <a href=\"https://lotusticket-admin.netlify.app\">here</a> to login " ;
        //    "<br>Regards,";
    final String REFUSE_ORGANIZATION_CONTENT ="After reviewing your application form thoroughly, We have to refuse your form. This is because you may not satisfy one of our strict criteria" ;
           // "<br>Regards,";
//    final String NEW_EVENT ="After reviewing your application form thoroughly, We have to refuse your form. This is because you may not satisfy one of our strict criteria" +
//            "<br>Regards,";
    final String TYPE_EMAIL = "text/html";


    public void sendMail(Account account, String content,String messageContent , EMailType type) throws MessagingException, TemplateException, IOException
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
//                String testHtml = " Click  <a href=\"https://lotusticket-vn.netlify.app/event/" + "gm-vietnam---vietnam-blockchain-week-28120" + "\">here</a> to visit new event";
//                String NEW_EVENT ="We want to notify you that <span style=\"color:black;font-weight: 700;\">"+ "ST.319 Entertainment" +"</span> has just created a new event called "  +" <span style=\"color:black;font-weight: 700;\"> ILIZA SHLESINGER - Back In Action Tour - Standup Comedy in HCMC </span>" + "<br>" + testHtml;
//
//                model.put("header", "Upcoming event");
//                model.put("content", NEW_EVENT);
//                model.put("contentColor", "1234");
                model.put("header", "Verify your account");
                model.put("content", OTP_CONTENT);
                model.put("contentColor", messageContent);

            }
            else if(type.equals(EMailType.NEW_PASSWORD))
            {
                model.put("header", "Receive new password");
                model.put("content", NEWPASSWORD_CONTENT);
                model.put("contentColor", messageContent);
            }
            else if (type.equals(EMailType.REGISTER))
            {
                model.put("header", "Register successfully");
                model.put("content", REGISTER_CONTENT);
            }
            else if(type.equals(EMailType.BECOME_ORGANIZATION))
            {
                model.put("header", "BECOME ORGANIZATION");
                model.put("content", BECOME_ORGANIZATION_CONTENT);
            }
            else if(type.equals(EMailType.OFFICIAL_ORGANIZATION))
            {
                model.put("header", "Register for organization successfully");
                model.put("content", OFFICIAL_ORGANIZATION_CONTENT);
                model.put("contentColor", messageContent);

            }
            else if(type.equals(EMailType.REFUSE_ORGANIZATION))
            {
                model.put("header", "Refuse for organization successfully");
                model.put("content", REFUSE_ORGANIZATION_CONTENT);
                model.put("contentColor", messageContent);
            }
            else if(type.equals(EMailType.NEW_EVENT))
            {
                model.put("header", "Upcoming event");
                model.put("content", content);
            }
            else if(type.equals(EMailType.UPDATE_EVENT))
            {
                model.put("header", "Updating event");
                model.put("content", content);
            }
            else if(type.equals(EMailType.DELETE_EVENT))
            {
                model.put("header", "Remove event");
                model.put("content", content);
                model.put("contentColor", messageContent);
            }
            model.put("title", "LOTUS TICKET");
            model.put("name", account.getName());
            if(messageContent.equals(""))
            {
                model.put("contentColor", "<br>");
            }

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
    public void sendMailWhenCreatingEvent(List<Account> accountList, Map<String, String> map, String organizationName , EMailType type) throws MessagingException, TemplateException, IOException {
        String testHtml = " Click  <a href=\"https://lotusticket-vn.netlify.app/event/" + map.get("id") + "\">here</a> to visit new event";
        String NEW_EVENT ="We want to notify you that <span style=\"color:black;font-weight: 700;\">"+ organizationName +"</span> has just created a new event called <span style=\"color:black;font-weight: 700;\">"  + map.get("eventName") + "</span> <br>" + testHtml;
        for(Account account : accountList)
        {
            sendMail(account,NEW_EVENT,"",type);
        }
    }
    public void sendMailWhenUpdatingEvent(List<Account> accountList, Map<String, String> map, String organizationName , EMailType type) throws MessagingException, TemplateException, IOException {
        StringBuilder htmlBuilder = new StringBuilder();
        htmlBuilder.append("We want to notify you that <span style=\"color:black;font-weight: 700;\">").append(organizationName).append("</span> has just changed a event called <span style=\"color:black;font-weight: 700; font-family:Calibri \">").append(map.get("eventName")).append("</span> <br>").append(" Click  <a href=\"https://lotusticket-vn.netlify.app/event/").append(map.get("id")).append("\">here</a> to visit this event");
        for(Account account : accountList)
        {
            sendMail(account,htmlBuilder.toString(),"",type);
        }
    }
    //send mail và hoàn tiền
    public void sendMailWhenDeletingEvent( List<Order> orders, Map<String, String> map, String organizationName , EMailType type) throws MessagingException, TemplateException, IOException {
        String moneyRefund= "We will refund the amount you paid for the order, which is ";
        String DELETE_EVENT ="We want to notify you that <span style=\"color:black;font-weight: 700;\">"+ organizationName +"</span> has just deleted a event called <span style=\"color:black;font-weight: 700;\">"  + map.get("eventName") + "</span> <br>" ;
        for(Order order : orders)
        {
            Optional<Account> account = accountRepository.findByEmail(order.getEmail());
            sendMail(account.get(),DELETE_EVENT + moneyRefund + order.getTotalPrice() + order.getCurrency(),"",type);
        }
    }
}
