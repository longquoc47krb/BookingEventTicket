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
    private String description;
    private String background;
    private String status;
    @JsonIgnore
    private int totalTicket;
    @JsonIgnore
    private int remainingTicket;
    @CreatedDate
    private Date createdDate;
    //@JsonIgnore
    @DBRef
    private List<EventCategory> eventCategoryList;
    private List<OrganizationTicket> organizationTickets = new ArrayList<>();


    public Event(String idEvent)
    {

    }
}
