package com.hcmute.bookingevent.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class OrganizationTicketReq {
//    @Id
//    private String id;
    @NotBlank(message = "ticketName is required")
    private String ticketName;
    @Size(min=1,message="required")
    @NotBlank(message = "price is required")
    private String price;
    private String description;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int quantity;
    private int quantityRemaining;
    @NotBlank(message = "currency is required")
    private String currency;
}
