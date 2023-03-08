package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document("review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @JsonIgnore
    private String id;
    @NotBlank(message = "email is required")
    private String email;
    @NotBlank(message = "idEvent is required")
    private String idEvent;
    @NotBlank(message = "message is required")
    private String message;
    @NotBlank(message = "rate is required")
    private int rate;

}
