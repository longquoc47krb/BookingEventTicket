package com.hcmute.bookingevent.models.ticket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class OrganizationTicket {
    @Id
    @JsonIgnore
    private String id;
    @NotBlank(message = "ticketName is required")
    private String ticketName;
    @Size(min=1,message="required")
    @NotBlank(message = "price is required")
    private String price;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int quantity;
    @NotBlank(message = "currency is required")
    private String currency;
}
