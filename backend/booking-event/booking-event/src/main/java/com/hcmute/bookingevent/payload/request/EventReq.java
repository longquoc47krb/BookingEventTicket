package com.hcmute.bookingevent.payload.request;

import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.models.ticket.OrganizationTicket;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class EventReq {
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
    //private String background;
    //private MultipartFile file;
    private List<EventCategory> eventCategoryList;
    private List<OrganizationTicket> organizationTickets;

}
