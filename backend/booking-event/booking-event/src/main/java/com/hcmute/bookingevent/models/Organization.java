package com.hcmute.bookingevent.models;

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

    @DocumentReference
    private List<Event> events;


}
