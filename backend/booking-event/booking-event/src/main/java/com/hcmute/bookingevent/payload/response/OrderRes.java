package com.hcmute.bookingevent.payload.response;

import com.hcmute.bookingevent.payload.request.CustomerTicketReq;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderRes {
    @NotBlank(message = "field is required")
    private int totalQuantity;
    @NotBlank(message = "field is required")
    private String totalPrice;

    List<CustomerTicketReq> customerTicketReqList;
}
