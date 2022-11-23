package com.hcmute.bookingevent.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerTicketReq {
//    @Id
//    private String id;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
    @NotBlank(message = "ticketName is required")
    private String ticketName;
    @NotBlank(message = "price is required")
    private String description;
    private String price;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int quantity;
    private int quantityRemaining;
    @NotBlank(message = "currency is required")
    private String currency;
    private String status;
}
