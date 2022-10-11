package com.hcmute.bookingevent.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;


@Data
@AllArgsConstructor
public class EventSlug {
    @Id
    private String id;

    private String slug;

}
