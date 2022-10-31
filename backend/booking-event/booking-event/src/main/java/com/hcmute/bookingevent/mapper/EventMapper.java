package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.payload.response.EventRes;
import com.hcmute.bookingevent.payload.response.LoginRes;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class EventMapper {
    public EventRes toEventRes(Event event) {
        return new EventRes(event.getName(),event.getProvince(),event.getStartingTime(),event.getEndingTime(),
                event.getStartingDate(),event.getEndingDate(),event.getBackground(),event.getStatus(),event.getEventCategoryList());
    }
}
