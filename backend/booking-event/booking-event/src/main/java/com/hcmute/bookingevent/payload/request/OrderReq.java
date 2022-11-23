package com.hcmute.bookingevent.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
@Data
public class OrderReq {
    @NotBlank(message = "totalPrice is required")
    private String totalPrice;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int totalQuantity;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
    List<CustomerTicketReq> customerTicketReqList;
}
