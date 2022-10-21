package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.request.ForgetOrGenerateReq;
import com.hcmute.bookingevent.payload.request.LoginReq;
import com.hcmute.bookingevent.payload.request.RegisterReq;
import com.hcmute.bookingevent.payload.request.VerifyOTPReq;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    ResponseEntity<?> login(LoginReq req);
    ResponseEntity<?> registerUser(RegisterReq signUpRequest);
    ResponseEntity<?> forgetPassword(ForgetOrGenerateReq forgetOrGenerateReq);
    ResponseEntity<?> verifyOTP(VerifyOTPReq verifyOTPReq);
    ResponseEntity<?> verifyChangePassword(LoginReq loginReq);
    ResponseEntity<?> generateNewPassword(String email);
}
