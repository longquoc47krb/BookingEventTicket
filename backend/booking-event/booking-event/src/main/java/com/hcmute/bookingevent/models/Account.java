package com.hcmute.bookingevent.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document("account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    private String id;

    private String name;
    @Indexed(unique = true)
    private String phone;
    @Indexed(unique = true)
    private String gmail;
    private String avatar;
    public Account(String name, String phone, String gmail) {
        this.name = name;
        this.phone = phone;
        this.gmail = gmail;
    }
}
