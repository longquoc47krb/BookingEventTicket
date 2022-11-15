package com.hcmute.bookingevent.payload.request;

import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.models.ticket.Ticket;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Data
public class EventReq {
    @NotBlank(message = "name is required")
    private String name;
    @NotBlank(message = "province is required")
    private String province;
    @NotBlank(message = "venue is required")
    private String venue; // địa điểm tổ chức
    @NotBlank(message = "venue_address is required")
    private String venue_address; // địa chỉ của địa điểm tổ chức
    @NotBlank(message = "startingTime is required")
    private String startingTime;
    @NotBlank(message = "endingTime is required")
    private String endingTime;
    @NotBlank(message = "startingDate is required")
    private String startingDate;
    @NotBlank(message = "endingDate is required")
    private String endingDate;
    @NotBlank(message = "host_id is required")
    private String host_id;
    @NotBlank(message = "description is required")
    private String description;
    @NotBlank(message = "eventCategoryList is required")
    private List<EventCategory> eventCategoryList;
    @NotBlank(message = "organizationTickets is required")
    private List<Ticket> organizationTickets;
    @NotBlank(message = "createdDate is required")
    private Date createdDate;
    @NotBlank(message = "totalTicket is required")
    private int totalTicket;
    @NotBlank(message = "remainingTicket is required")
    private int remainingTicket;

}
