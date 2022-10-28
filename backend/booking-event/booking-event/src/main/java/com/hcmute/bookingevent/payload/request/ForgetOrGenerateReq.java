package com.hcmute.bookingevent.payload.request;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class ForgetOrGenerateReq {
    @NotBlank
    @Email(message = "Email invalidate")
    private String email;
}
