package com.hcmute.bookingevent.payload.response;

import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.models.ticket.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventViewResponse {
    private String id;
    private String name;
    private String province;
    private String venue;
    private String startingTime;
    private String endingTime;
    private String startingDate;
    private String endingDate;
    private String background;
    private String status;
    private List<EventCategory> eventCategoryList;
    private List<Ticket> organizationTickets;
    private int ticketTotal;
    private int ticketRemaining;
}
