package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.request.ForgetReq;
import com.hcmute.bookingevent.payload.request.LoginReq;
import com.hcmute.bookingevent.payload.request.RegisterReq;
import com.hcmute.bookingevent.payload.request.VerifyOTPReq;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    ResponseEntity<?> login(LoginReq req);
    ResponseEntity<?> registerUser(RegisterReq signUpRequest);
    ResponseEntity<?> forgetPassword(ForgetReq forgetReq);
    ResponseEntity<?> verifyOTP(VerifyOTPReq verifyOTPReq);
}
