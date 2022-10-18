package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginReq {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
