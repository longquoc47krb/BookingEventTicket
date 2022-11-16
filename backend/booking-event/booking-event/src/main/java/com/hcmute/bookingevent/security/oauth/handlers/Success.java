package com.hcmute.bookingevent.security.oauth.handlers;


import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.account.EAccount;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.CustomerRepository;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import com.hcmute.bookingevent.security.oauth.CustomOAuth2User;
import com.hcmute.bookingevent.services.MailService;
import com.hcmute.bookingevent.services.mail.EMailType;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@AllArgsConstructor
public class Success extends SavedRequestAwareAuthenticationSuccessHandler {
    private  final AccountRepository accountRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomerRepository customerRepository;
    private final MailService mailService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
        Optional<Account> account = accountRepository.findByEmail(oauth2User.getEmail());
        String jwtToken;
        //nếu tài khoản google đó ko tồn tại trong db
        if(account.isEmpty())
        {
            jwtToken = processAddAccount(oauth2User);
            response.sendRedirect(generateRedirectURL(true, jwtToken,
                    oauth2User.getEmail() + "Log in and create successfully with google"));
        }
        else
        {
            try
            {
                //trongg trường hợp người dùng đã từng đăng nhập bằng google và muốn đăng nhập lại
                if(account.get().getPassWord().isEmpty())
                {
                    jwtToken = jwtTokenProvider.generateJwtToken(oauth2User.getEmail(),account.get().getId());;
                    response.sendRedirect(generateRedirectURL(true, jwtToken,
                            oauth2User.getEmail() + "Log in and  successfully with google"));
                }
                // trường hợp người dùng có tài khoản truyền thống nhưng muốn đăng nhập bẳng google
                else {
                    response.sendRedirect(generateRedirectURL(true, "",
                            oauth2User.getEmail() + "Email already exists in database"));
                }

            }
            catch (NullPointerException ex)
            {
                response.sendRedirect(generateRedirectURL(false, "", "fail log in  with google"));

            }


        }
        System.out.println(oauth2User.getEmail());
        System.out.println(oauth2User.getName());
        System.out.println(oauth2User.getAuthorities());
        System.out.println(oauth2User.getProfilePicture());
        //super.onAuthenticationSuccess(request, response, authentication);
    }
    @SneakyThrows
    public String processAddAccount(CustomOAuth2User oAuth2User) {

        Account account = new Account(oAuth2User.getName(),
                oAuth2User.getEmail(),
                "" , oAuth2User.getProfilePicture()
                , Constants.ROLE_USER);
        account.setLoginType(EAccount.GOOGLE);
        Customer customer = new Customer(oAuth2User.getEmail());
        mailService.sendMail(account, "", EMailType.REGISTER);
        customerRepository.save(customer);
        accountRepository.save(account);
        return  jwtTokenProvider.generateJwtToken(oAuth2User.getEmail(),account.getId());

    }

    public String generateRedirectURL(Boolean success, String token, String message) {
        logger.debug(message);


        //String CLIENT_HOST_REDIRECT = "http://localhost:3000/oauth2/redirect?token=";
        String CLIENT_HOST_REDIRECT = "https://lotusticket-vn.netlify.app/oauth2/redirect?token=";

        return CLIENT_HOST_REDIRECT + token + "&success=" + success  ;
    }
}
