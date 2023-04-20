package com.hcmute.bookingevent.models;

import com.hcmute.bookingevent.models.event.Event;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
public class OrderStats {
    LocalDate date;
    int orderCount;
    List<Event> eventsSold;
}
