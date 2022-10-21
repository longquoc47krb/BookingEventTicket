package com.hcmute.bookingevent.payload.request;


import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ForgetOrGenerateReq {
    @NotBlank
    private String email;
}
