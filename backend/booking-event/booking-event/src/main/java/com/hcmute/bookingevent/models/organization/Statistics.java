package com.hcmute.bookingevent.models.organization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "statistics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    @Id
    private String id;
    private LocalDateTime timestamp;
    private int numEvents;
    private int numOrders;
    private int numTickets;
    private BigDecimal revenue;

    public Statistics(int numEvents, int numOrders, int numTickets, BigDecimal revenue) {
        this.timestamp = LocalDateTime.now();
        this.numEvents = numEvents;
        this.numOrders = numOrders;
        this.numTickets = numTickets;
        this.revenue = revenue;
    }
}
