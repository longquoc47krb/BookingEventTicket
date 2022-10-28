package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class VerifyOTPReq {
    @NotBlank
    @Email(message = "Email invalidate")
    private String email;
    @NotBlank(message = "OTP is required")
    private String otpCode;
}
