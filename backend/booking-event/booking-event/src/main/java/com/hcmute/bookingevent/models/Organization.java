package com.hcmute.bookingevent.models;

import com.hcmute.bookingevent.models.organization.EOrganization;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document("organization")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    private String id;
    private String address;
    private String email;

    private EOrganization status;

    private List<String> eventID;

    public Organization(String id) {
        this.id = id;
    }
    public Organization(String email,EOrganization status) {
        this.status = status;
        this.email = email;
    }
}
