package com.hcmute.bookingevent.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Document("Ticket")

public class Ticket {
    @Id
    private String id;
    private double cost;
    private String typeOfTicket;
    private LocalDateTime openingDoor;
    private String seatNumber;

    private String id_event;
}
