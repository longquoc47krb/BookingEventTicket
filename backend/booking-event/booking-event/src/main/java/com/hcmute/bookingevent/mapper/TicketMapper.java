package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.payload.request.CustomerTicketReq;
import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import com.hcmute.bookingevent.models.ticket.Ticket;

public class TicketMapper {
    public Ticket toTicket(OrganizationTicketReq ticket) {
        return new Ticket(ticket);
    }
    public Ticket toTicket(CustomerTicketReq ticket) {
        return new Ticket(ticket);
    }
}
