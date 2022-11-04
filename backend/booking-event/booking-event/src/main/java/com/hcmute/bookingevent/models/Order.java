package com.hcmute.bookingevent.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {
    @Id
    private String id;

    private String gmail;

    @NotBlank(message = "price is required")
    private String totalPrice;

    @Size(min=1,message="required")
    @NotBlank(message = "quantity is required")
    private int totalQuantity;

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