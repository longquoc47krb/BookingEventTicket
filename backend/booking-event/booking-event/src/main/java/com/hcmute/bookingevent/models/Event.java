package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.ticket.OrganizationTicket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {


    //@Id
    @JsonIgnore
    private String id;
    //private String idEvent;
    @TextIndexed
    private String name;
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
    private int totalTicket;
    private int remainingTicket;
    @CreatedDate
    private Date createdDate;
    //@JsonIgnore
    @DBRef
    private List<EventCategory> eventCategoryList ;
    private List<OrganizationTicket> organizationTickets = new ArrayList<>();
    public Event(String name,String province,String venue,String venue_address,String startingTime,String endingTime,String startingDate,String endingDate,String host_id,String description,List<EventCategory> eventCategoryList,List<OrganizationTicket> organizationTickets,Date createdDate,int totalTicket,int remainingTicket )
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
        this.totalTicket=totalTicket;
        this.remainingTicket=remainingTicket;
    }

    public Event(String idEvent)
    {

    }
}
