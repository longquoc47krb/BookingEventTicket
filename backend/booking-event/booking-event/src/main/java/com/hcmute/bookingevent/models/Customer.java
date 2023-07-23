package com.hcmute.bookingevent.models;

import com.hcmute.bookingevent.models.account.Account;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
@Document("customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer  {
    @Id
    private String id;
    //private int ticketAmount;
    @NotBlank(message = "Email is required")
    @Size(max = 100)
    @Email(message = "Email is invalidate")
    @Indexed(unique = true)
    private String email;

    private List<String> eventWishList = new ArrayList<>();
    private List<String> followList = new ArrayList<>();
    //private List<Order> orderList = new ArrayList<>();
    public Customer(String email)
    {
        this.email=email;
        this.eventWishList = new ArrayList<>();
        //this.orderList = new ArrayList<>();
    }
}
