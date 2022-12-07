package com.hcmute.bookingevent.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationStatics {

    private String USDRevenue;
    private String VNDRevenue;
    int eventSize;
    int totalTicketSold;
    Long totalOrder;
}
