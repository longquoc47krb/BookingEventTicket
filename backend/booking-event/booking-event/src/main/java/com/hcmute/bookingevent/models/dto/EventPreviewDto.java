package com.hcmute.bookingevent.models.dto;

import com.hcmute.bookingevent.models.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EventPreviewDto {
    private String name;
    private String background;
    private String startingDate;
    private int ticketTotal;
    private int ticketRemaining;
    private List<EventCategory> eventCategoryList;

    public EventPreviewDto(String name, String background, String startingDate, int ticketTotal, int ticketRemaining, List<EventCategory> eventCategoryList) {
        this.name = name;
        this.background = background;
        this.startingDate = startingDate;
        this.ticketTotal = ticketTotal;
        this.ticketRemaining = ticketRemaining;
        this.eventCategoryList = eventCategoryList;
    }

}
