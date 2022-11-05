package com.hcmute.bookingevent.models.ticket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerTicket {
    @Id
    private String id;
    @NotBlank(message = "typeName is required")
    private String typeName;
    @NotBlank(message = "price is required")
    private String price;
    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int quantity;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
}