package com.hcmute.bookingevent.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("eventCategory")

public class EventCategory {
    @Id
    private String id;
    private String name;

}
