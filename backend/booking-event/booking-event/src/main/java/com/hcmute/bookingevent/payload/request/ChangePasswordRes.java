package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data

public class ChangePasswordRes {
    @NotBlank
    private String email;
    @NotBlank
    private String currentPassword;
    @NotBlank
    private String newPassword;
}
