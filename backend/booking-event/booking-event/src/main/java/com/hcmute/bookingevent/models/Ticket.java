package com.hcmute.bookingevent.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document("Ticket")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    private String id;
    private double cost;
    private String typeOfTicket;
    private LocalDateTime openingDoor;
    private String seatNumber;
    private String customer_id;
    private String event_id;
    private String host_id;
}
