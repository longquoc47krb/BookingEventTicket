package com.hcmute.bookingevent.models.ticket;

import com.hcmute.bookingevent.payload.request.CustomerTicketReq;
import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    @Id
    private String id;
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
    @NotBlank(message = "currency is required")
    public String status;
    public Ticket(OrganizationTicketReq organizationTicketReq)
    {
        this.ticketName= organizationTicketReq.getTicketName();
        this.price= organizationTicketReq.getPrice();
        this.description= organizationTicketReq.getDescription();
        this.quantity= organizationTicketReq.getQuantity();
        this.quantityRemaining = organizationTicketReq.getQuantityRemaining();
        this.currency= organizationTicketReq.getCurrency();
        this.status = TicketStatus.AVAILABLE;
    }
    public Ticket(CustomerTicketReq customerTicketReq)
    {
        this.ticketName= customerTicketReq.getTicketName();
        this.price= customerTicketReq.getPrice();
        this.description= customerTicketReq.getDescription();
        this.quantity= customerTicketReq.getQuantity();
        this.quantityRemaining = customerTicketReq.getQuantityRemaining();
        this.currency= customerTicketReq.getCurrency();
        this.status = TicketStatus.AVAILABLE;
    }
}
