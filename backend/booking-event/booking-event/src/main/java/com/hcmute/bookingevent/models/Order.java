package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.ticket.CustomerTicket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {
    @Id
    private String id;
    @NotBlank(message = "email is required")
    private String email;
    @NotBlank(message = "totalPrice is required")
    private String totalPrice;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int totalQuantity;
    List<CustomerTicket> customerTicketList;
//    private double price;
//    @JsonIgnore
//    private String currency;
//    @JsonIgnore
//    private String method;
//    @JsonIgnore
//    private String intent;
//    @JsonIgnore
//    private String description;

}