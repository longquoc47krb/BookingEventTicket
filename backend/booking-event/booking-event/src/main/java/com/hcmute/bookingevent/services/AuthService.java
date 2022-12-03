package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IAuthService;
import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.OTP.OTP;
import com.hcmute.bookingevent.payload.request.*;
import com.hcmute.bookingevent.payload.response.JwtResponse;
import com.hcmute.bookingevent.payload.response.MessageResponse;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.CustomerRepository;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import com.hcmute.bookingevent.security.user.UserDetailsImpl;
import com.hcmute.bookingevent.services.mail.EMailType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;
    private final AccountRepository accountRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomerRepository customerRepository;
    @Override
    public ResponseEntity<?> login(LoginReq req) {
        try
        {

        // Xác thực từ gmail và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        //
         Optional<Account> account=  accountRepository.findByEmail(userDetails.getEmail());
        // Trả về jwt cho người dùng.
            String jwt;
            if(account.isPresent())
            {
                 account.get().setLoginTime(new Date());
                 accountRepository.save(account.get());
                 jwt = jwtTokenProvider.generateJwtToken(userDetails.getEmail(),account.get().getId());

            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "can not find email", "",400));
            }


        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Logged in successfully", new JwtResponse(jwt,
                            userDetails.getId(),
                            userDetails.getUsername(),
                            userDetails.getEmail(),
                            roles,"success"),200));

        }
        catch (BadCredentialsException  ex)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(false, ex.toString() + "Login fail", "",400));
        }
        catch (Exception ex)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, ex.toString(), "",404));
        }
    }
    @Override
    public ResponseEntity<?> registerUser(RegisterReq signUpRequest) {

        if (accountRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!",400));
        }

        // Create new user's account
        Account account = new Account(signUpRequest.getName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),Constants.AVATAR_DEFAULT);

        try
        {
            account.setRole(signUpRequest.getRole());
            accountRepository.save(account);
            //customer
            Customer customer = new Customer(account.getEmail());
            customerRepository.save(customer);


            mailService.sendMail(account, "", EMailType.REGISTER);
            return ResponseEntity.ok(new ResponseObject(true,"User registered successfully!",account.getEmail(),200));
        }
        catch (Exception e)
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(e.toString(),400));
        }

    }
    @Override
    public ResponseEntity<?> forgetPassword(EmailReq emailReq)
    {
        try
        {
            Optional<Account> account= accountRepository.findByEmail(emailReq.getEmail());
            if(account.isPresent())
            {

                String otp= new DecimalFormat("000000").format(new Random().nextInt(999999));
                //
                account.get().setOtp(new OTP(otp, LocalDateTime.now().plusMinutes(5)));
                accountRepository.save(account.get());
                mailService.sendMail(account.get(),otp, EMailType.OTP );
                return ResponseEntity.ok(new ResponseObject(true,"Sent OTP successfully",account.get().getEmail(),200));

            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Error: Email is no existing!", "",404));
            }

        }
        catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,"Sent OTP fail","",400));

        }
    }
    @Override
    public ResponseEntity<?> changePassword(ChangePasswordReq changePasswordReq)
    {
        try
        {
            Optional<Account> account= accountRepository.findByEmail(changePasswordReq.getEmail());
            if(account.isPresent())
            {

                if(encoder.matches(changePasswordReq.getCurrentPassword(), account.get().getPassWord()))
                {
                    account.get().setPassWord(encoder.encode(changePasswordReq.getNewPassword()));
                    accountRepository.save(account.get());
                    return ResponseEntity.ok(new ResponseObject(true,"Password match and save data successfully",account.get().getEmail(),200));

                }

                return ResponseEntity.ok(new ResponseObject(false,"Password does not match",account.get().getEmail(),400));

            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Account is no exist", "",404));
            }

        }
        catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(true,"Sent OTP fail","",400));

        }
    }
    @Override
    public ResponseEntity<?> verifyOTP(VerifyOTPReq verifyOTPReq)
    {
        try
        {

            Optional<Account> account= accountRepository.findByEmail(verifyOTPReq.getEmail());
            if(account.isPresent() )
            {
                if(LocalDateTime.now().isBefore(account.get().getOtp().getTimeExisting()))
                {
                    if(account.get().getOtp().getOtpCode().equals(verifyOTPReq.getOtpCode()))
                    {

                        return ResponseEntity.ok(new ResponseObject(true,"Verify OTP successfully", verifyOTPReq.getEmail(),200));
                    }
                    return ResponseEntity.ok(new ResponseObject(false,"Verify OTP fail","",400));
                }
                else
                {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject(false, "Time is over", "",404));
                }

            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Error: Email is no existing!", "",404));
            }

        }
        catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(true,"Sent OTP fail","",400));

        }
    }
    @Override
    public ResponseEntity<?> verifyChangePassword(LoginReq loginReq) {
        try {
            Optional<Account> account = accountRepository.findByEmail(loginReq.getEmail());
            if (account.isPresent()) {
                account.get().setPassWord(encoder.encode(loginReq.getPassword()));
                accountRepository.save(account.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Set up new passWord successfully", "", 200));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Error: Email is no existing!", "",404));

            }

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Error: {}" + ex, "", 404));

        }
    }
    @Override
    public ResponseEntity<?> generateNewPassword(String email) {
        try {
            Optional<Account> account = accountRepository.findByEmail(email);
            if (account.isPresent()) {
                String randomPassword = Constants.getAlphaNumericString(8);
                account.get().setPassWord(encoder.encode(randomPassword));
                accountRepository.save(account.get());
                mailService.sendMail(account.get(), randomPassword, EMailType.NEW_PASSWORD);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Generate new passWord for organization successfully", "", 200));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Error: Email is no existing!", "", 404));

            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Error: {}" + ex, "", 404));
        }
    }

}




