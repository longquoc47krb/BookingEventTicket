package com.hcmute.bookingevent.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class PriceRes {
    @NotBlank(message = "price is required")
    private String price;

}
