package com.hcmute.bookingevent.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("account")

public class Account {
    @Id
    private String id;
    private String name;
    private int phone;
    private String gmail;
    private int role;

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

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public Account() {
    }

    public Account(String id, String name, int phone, String gmail, int role) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.gmail = gmail;
        this.role = role;
    }
}
