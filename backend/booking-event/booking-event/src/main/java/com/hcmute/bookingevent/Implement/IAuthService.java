package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.payload.request.*;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    ResponseEntity<?> login(LoginReq req);
    ResponseEntity<?> registerUser(RegisterReq signUpRequest);
    ResponseEntity<?> forgetPassword(EmailReq emailReq);
    ResponseEntity<?> verifyOTP(VerifyOTPReq verifyOTPReq);
    ResponseEntity<?> verifyChangePassword(LoginReq loginReq);
    ResponseEntity<?> generateNewPassword(String email);
    ResponseEntity<?> changePassword(ChangePasswordReq changePasswordReq);

}
