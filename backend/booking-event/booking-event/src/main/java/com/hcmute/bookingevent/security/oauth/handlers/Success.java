package com.hcmute.bookingevent.security.oauth.handlers;


import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import com.hcmute.bookingevent.security.oauth.CustomOAuth2User;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.EnumUtils;
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


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
        Optional<Account> account = accountRepository.findByEmail(oauth2User.getEmail());
        String jwtToken;
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
                if(account.get().getPassWord().isEmpty())
                {
                    jwtToken = jwtTokenProvider.generateJwtToken(oauth2User.getEmail());;
                    response.sendRedirect(generateRedirectURL(true, jwtToken,
                            oauth2User.getEmail() + "Log in and  successfully with google"));
                }
                else {
                    response.sendRedirect(generateRedirectURL(true, "",
                            oauth2User.getEmail() + "Can not log in with google method"));
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
    public String processAddAccount(CustomOAuth2User oAuth2User) {

        Account account = new Account(oAuth2User.getName(),
                oAuth2User.getEmail(),
                "" , oAuth2User.getProfilePicture()
                , Constants.ROLE_USER);
        accountRepository.save(account);
        return  jwtTokenProvider.generateJwtToken(oAuth2User.getEmail());

    }

    public String generateRedirectURL(Boolean success, String token, String message) {
        logger.debug(message);
        String CLIENT_HOST_REDIRECT = "http://localhost:3000/oauth2/redirect?token=";
        return CLIENT_HOST_REDIRECT + token + "&success=" + success  ;
    }
}
