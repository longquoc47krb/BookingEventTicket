package com.hcmute.bookingevent.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Document("Event")

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

    public Event() {
    }

    public Event(String id, String name, String address, LocalDateTime startingTime, LocalDateTime endingTime, String host, String id_category, String description, String background, int totalTicket, int remainingTicket) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.startingTime = startingTime;
        this.endingTime = endingTime;
        this.host = host;
        this.id_category = id_category;
        this.description = description;
        this.background = background;
        this.totalTicket = totalTicket;
        this.remainingTicket = remainingTicket;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getStartingTime() {
        return startingTime;
    }

    public void setStartingTime(LocalDateTime startingTime) {
        this.startingTime = startingTime;
    }

    public LocalDateTime getEndingTime() {
        return endingTime;
    }

    public void setEndingTime(LocalDateTime endingTime) {
        this.endingTime = endingTime;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getId_category() {
        return id_category;
    }

    public void setId_category(String id_category) {
        this.id_category = id_category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public int getTotalTicket() {
        return totalTicket;
    }

    public void setTotalTicket(int totalTicket) {
        this.totalTicket = totalTicket;
    }

    public int getRemainingTicket() {
        return remainingTicket;
    }

    public void setRemainingTicket(int remainingTicket) {
        this.remainingTicket = remainingTicket;
    }
}
