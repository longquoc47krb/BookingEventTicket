package com.hcmute.bookingevent.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("EventCategory")

public class EventCategory {
    private String id;
    private String name;
}
