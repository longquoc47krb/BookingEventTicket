package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IAuthService;
import com.hcmute.bookingevent.payload.LoginReq;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.payload.response.JwtResponse;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;

import com.hcmute.bookingevent.security.user.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthService implements IAuthService {
    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    JwtTokenProvider jwtTokenProvider;
    public ResponseEntity<?> login(LoginReq req) {
        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Trả về jwt cho người dùng.
        String jwt = jwtTokenProvider.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(true, "Log in successfully ", jwt));
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,"success"));
    }

}
