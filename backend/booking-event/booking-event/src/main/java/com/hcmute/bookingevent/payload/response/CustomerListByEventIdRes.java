package com.hcmute.bookingevent.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerListByEventIdRes {
    @Id
    private String idEvent;
    private BigDecimal USDRevenue;
    private BigDecimal VNDRevenue;
    private int totalQuantity;
    private String currency;
}
