package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.LoginReq;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    ResponseEntity<?> login(LoginReq req);
}
