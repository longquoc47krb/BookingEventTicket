package com.hcmute.bookingevent.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Document("event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    private String id;
    private String name;
    private String address;
    private LocalDateTime startingTime;
    private LocalDateTime endingTime;
    private String host;
    private String id_category;
    private String description;
    private String background;
    private int totalTicket;
    private int remainingTicket;


}
