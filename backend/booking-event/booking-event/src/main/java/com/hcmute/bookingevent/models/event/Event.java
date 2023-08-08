package com.hcmute.bookingevent.models.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.request.EventReq;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Future;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {


    //@Id
    @JsonIgnore
    private String id;
    //private String idEvent;
    @TextIndexed
    private String name;
    @Size(min = 2)
    private String province;
    private String venue; // địa điểm tổ chức
    private String venue_address; // địa chỉ của địa điểm tổ chức
    private String startingTime;
    private String endingTime;
    private String startingDate;
    private String endingDate;
    private String host_id;
    //
    private String description;
    private String background;
    private String status;
    private int ticketTotal;
    private int ticketRemaining;

    private Date createdDate;
    private Date updatedDate;

    private int modifyTimes;
    //@JsonIgnore
    @DBRef
    private List<EventCategory> eventCategoryList ;
    private List<Ticket> organizationTickets = new ArrayList<>();

    public Event(String name,String province,String venue,String venue_address,String startingTime,String endingTime,String startingDate,String endingDate,String host_id,String description,List<EventCategory> eventCategoryList,List<Ticket> organizationTickets,Date createdDate,int totalTicket,int remainingTicket )
    {
        this.name=name;
        this.province=province;
        this.venue=venue;
        this.venue_address=venue_address;
        this.startingTime=startingTime;
        this.endingTime=endingTime;
        this.startingDate=startingDate;
        this.endingDate=endingDate;
        this.host_id=host_id;
        this.description=description;
        this.eventCategoryList=eventCategoryList;
        this.organizationTickets=organizationTickets;
        this.createdDate=createdDate;
        this.ticketTotal=totalTicket;
        this.ticketRemaining=remainingTicket;
    }

    public Event(EventReq eventReq)
    {
        this.name=eventReq.getName();
        this.province=eventReq.getProvince();
        this.venue=eventReq.getVenue();
        this.venue_address=eventReq.getVenue_address();
        this.startingTime=eventReq.getStartingTime();
        this.endingTime=eventReq.getEndingTime();
        this.startingDate=eventReq.getStartingDate();
        this.endingDate=eventReq.getEndingDate();
        this.host_id=eventReq.getHost_id();
        this.description=eventReq.getDescription();
        this.eventCategoryList=eventReq.getEventCategoryList();
        this.organizationTickets=eventReq.getOrganizationTickets();
        this.createdDate=eventReq.getCreatedDate();
        this.ticketTotal=eventReq.getTicketTotal();
        this.ticketRemaining=eventReq.getTicketRemaining();
    }
    public Event(String idEvent)
    {

    }
}
