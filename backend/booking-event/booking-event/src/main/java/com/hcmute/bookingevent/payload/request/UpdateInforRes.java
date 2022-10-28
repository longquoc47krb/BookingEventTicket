package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpdateInforRes {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Phone is required")
    private String phone;
}
