package com.hcmute.bookingevent.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
@Document("customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    private String id;
    private int ticketAmount;
    @NotBlank(message = "Email is required")
    @Size(max = 100)
    @Email(message = "Email is invalidate")
    @Indexed(unique = true)
    private String email;

    //private int role;
    private List<String> ticketList;

    private List<String> eventWishList;
    private List<Order> orderList;
    public Customer(String email)
    {
        this.email=email;

    }
}
