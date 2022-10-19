package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ForgetReq {
    @NotBlank
    private String email;
}
