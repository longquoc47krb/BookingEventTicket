package com.hcmute.bookingevent.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document("account")

public class Account {
    @Id
    private String id;

    private String name;
    private String phone;
    private String gmail;


    public Account(String id, String name, String phone, String gmail) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.gmail = gmail;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Account() {
    }




}
