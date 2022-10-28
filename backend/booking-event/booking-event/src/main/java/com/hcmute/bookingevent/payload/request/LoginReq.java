package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class LoginReq {
    @NotBlank
    @Email(message = "Email invalidate")
    private String email;
    @NotBlank
    private String password;
}
