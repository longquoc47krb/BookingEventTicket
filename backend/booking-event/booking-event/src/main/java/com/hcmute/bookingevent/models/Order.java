package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.request.OrderReq;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@ToString
public class Order {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Id
    private String id;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
    @NotBlank(message = "email is required")
    private String email;
    @NotBlank(message = "totalPrice is required")
    private String totalPrice;

    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int totalQuantity;

    private String currency;

    List<Ticket> customerTicketList  = new ArrayList<>();
    private Date createdDate;
    public Order(OrderReq orderReq)
    {
        this.totalPrice=orderReq.getTotalPrice();
        this.totalQuantity=orderReq.getTotalQuantity();
    }
}