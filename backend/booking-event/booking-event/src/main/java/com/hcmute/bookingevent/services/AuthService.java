package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IAuthService;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.role.Role;
import com.hcmute.bookingevent.payload.request.LoginReq;
import com.hcmute.bookingevent.payload.request.RegisterReq;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.payload.response.JwtResponse;
import com.hcmute.bookingevent.payload.response.MessageResponse;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;

import com.hcmute.bookingevent.security.user.UserDetailsImpl;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final AuthenticationManager authenticationManager;

    private final AccountRepository accountRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;


    public ResponseEntity<?> login(LoginReq req) {
        try
        {

        // Xác thực từ gmail và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Trả về jwt cho người dùng.
        String jwt = jwtTokenProvider.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Logged in successfully", new JwtResponse(jwt,
                            userDetails.getUsername(),
                            userDetails.getEmail(),
                            roles,"success"),200));

        }
        catch (BadCredentialsException  ex)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(false, ex.toString(), "",400));
        }
        catch (Exception ex)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, ex.toString(), "",404));
        }
//        catch (BadCredentialsException ex) {
////            ex.printStackTrace();
//            throw new BadCredentialsException(ex.getMessage());
//        }
    }
    public ResponseEntity<?> registerUser(RegisterReq signUpRequest) {
//        if (accountRepository.existsByUserName(signUpRequest.getUsername())) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(new MessageResponse("Error: Username is already taken!",400));
//        }

        if (accountRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!",400));
        }

        // Create new user's account
        Account user = new Account(signUpRequest.getName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        //Set<String> strRoles = signUpRequest.getRoles();
        //Set<Role> strRoles = signUpRequest.getRoles();
        //Set<Role> roles = new HashSet<>();

        try
        {
            user.setRole(signUpRequest.getRole());
            accountRepository.save(user);

            return ResponseEntity.ok(new ResponseObject(true,"User registered successfully!","",200));
        }
        catch (Exception e)
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(e.toString(),400));
        }

    }


}
