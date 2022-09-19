package com.hcmute.bookingevent.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("eventCategory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventCategory {
    @Id
    private String id;
    private String name;

}
