package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {

    private double price;
    @JsonIgnore
    private String currency;
    @JsonIgnore
    private String method;
    @JsonIgnore
    private String intent;
    @JsonIgnore
    private String description;

}