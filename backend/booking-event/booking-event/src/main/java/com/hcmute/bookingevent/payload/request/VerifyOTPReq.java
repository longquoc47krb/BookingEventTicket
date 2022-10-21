package com.hcmute.bookingevent.payload.request;

import lombok.Data;

@Data
public class VerifyOTPReq {
    private String email;
    private String otpCode;
}
