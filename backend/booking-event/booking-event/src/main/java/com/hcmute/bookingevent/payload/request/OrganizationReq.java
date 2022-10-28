package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data

public class OrganizationReq {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank
    @Email(message = "Email invalidate")
    private String email;
    @NotBlank(message = "Phone is required")
    private String phoneNumber;

}
