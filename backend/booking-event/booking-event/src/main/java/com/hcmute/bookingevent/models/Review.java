package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document("review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Review {


    @Id
    @JsonIgnore
    private String id;
    @NotBlank(message = "name is required")
    private String name;
    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "avatar is required")
    private String avatar;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
    @NotBlank(message = "message is required")
    private String message;
    @NotBlank(message = "rate is required")
    private int rate;
    private Date createdAt;
    @Override
    public String toString() {
        return "Review{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", avatar='" + avatar + '\'' +
                ", idEvent='" + idEvent + '\'' +
                ", message='" + message + '\'' +
                ", rate=" + rate +
                ", createdAt=" + createdAt +
                '}';
    }
}
