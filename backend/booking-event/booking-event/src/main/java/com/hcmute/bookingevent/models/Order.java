package com.hcmute.bookingevent.models;

import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.request.OrderReq;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@ToString
public class Order {
    @Id
    private String id;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
    @NotBlank(message = "totalPrice is required")
    private String totalPrice;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int totalQuantity;
    List<Ticket> customerTicketList  ;
    public Order(OrderReq orderReq)
    {
        this.totalPrice=orderReq.getTotalPrice();
        this.totalQuantity=orderReq.getTotalQuantity();
    }
}