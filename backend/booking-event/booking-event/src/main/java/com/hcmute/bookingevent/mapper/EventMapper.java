package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import org.springframework.stereotype.Service;

@Service

public class EventMapper {
    public EventViewResponse toEventRes(Event event) {
        return new EventViewResponse(event.getId(), event.getName(),event.getProvince(),event.getVenue(), event.getStartingTime(),event.getEndingTime(),
                event.getStartingDate(),event.getEndingDate(),event.getBackground(),event.getStatus(),event.getEventCategoryList());
    }
}
