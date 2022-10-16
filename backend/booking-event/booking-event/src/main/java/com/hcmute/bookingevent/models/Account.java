package com.hcmute.bookingevent.models;


import com.hcmute.bookingevent.models.role.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

import java.util.HashSet;
import java.util.Set;


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
    //private Set<String> roles = new HashSet<>();
    public Account(String userName,  String email,String passWord) {
        this.userName = userName;
        this.email = email;
        this.passWord = passWord;
    }
    public Account(String name,  String email,String passWord,String role) {
        this.name = name;
        this.email = email;
        this.passWord = passWord;
        this.role= role;
      //  this.roles=roles;
    }

//    public Set<String> getRoles() {
//        return roles;
//    }

//    public void setRoles(Set<String> roles) {
//        this.roles = roles;
//    }
}
