package com.hcmute.bookingevent.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class PriceRes {
    @NotBlank(message = "price is required")
    private String price;
}