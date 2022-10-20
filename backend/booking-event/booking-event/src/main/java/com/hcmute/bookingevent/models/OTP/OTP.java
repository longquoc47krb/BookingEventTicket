package com.hcmute.bookingevent.models.OTP;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OTP {
    private String otpCode;
    private LocalDateTime timeExisting;
}
