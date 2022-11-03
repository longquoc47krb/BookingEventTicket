package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.ticket.ETicket;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class TicketType {
    @Id
    @JsonIgnore
    private String id;
    @NotBlank(message = "name is required")
    private String name;
    @Size(min=1,message="required")
    @NotBlank(message = "price is required")
    private int price;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int quantity;
    @NotBlank(message = "currency is required")
    private String currency;
}
