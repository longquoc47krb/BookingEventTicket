package com.hcmute.bookingevent.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;


@Document("account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    private String id;

    private String name;
    //@Nullable
    //@Indexed(unique = true)
    private String phone;
    //@Indexed(unique = true)
    private String email;
    private String avatar;

    private String userName;
    private String passWord;
    private String role;

    public Account(String name, String phone, String email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}
