package com.hcmute.bookingevent.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.List;

@Document("event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    private String id;
    @TextIndexed
    private String name;
    private String address;
    private String startingTime;
    private String endingTime;
    private String host;
    //private String id_category;
    private String description;
    private String background;
    private String status;

    private int totalTicket;
    private int remainingTicket;
    @DBRef
    private List<EventCategory> eventCategoryList;

}
