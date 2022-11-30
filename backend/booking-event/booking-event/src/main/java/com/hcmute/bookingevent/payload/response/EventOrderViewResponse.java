package com.hcmute.bookingevent.payload.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.models.ticket.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventOrderViewResponse {
    private String id;
    private String name;
    private String startingDate;
    private String endingDate;
    private String background;
    private String status;
    private int ticketTotal;
    private int ticketRemaining;
    private Date createdDate;
    private Date updatedDate;
    private List<EventCategory> eventCategoryList ;
    private List<Ticket> organizationTickets;
}
