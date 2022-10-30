package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data

public class ChangePasswordReq {
    @NotBlank
    @Email(message = "Email is invalidate")
    private String email;
    @NotBlank(message = "CurrentPassword is required")
    @Size( min = 6, max = 100)
    private String currentPassword;
    @NotBlank(message = "NewPassword is required")
    @Size( min = 6, max = 100)
    private String newPassword;
}
