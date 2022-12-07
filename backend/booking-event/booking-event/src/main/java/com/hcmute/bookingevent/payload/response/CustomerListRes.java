package com.hcmute.bookingevent.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerListRes {
    private String idEvent;
    @Id
    private String email;
    private String totalPrice;
    private int totalQuantity;
    private String currency;
}
