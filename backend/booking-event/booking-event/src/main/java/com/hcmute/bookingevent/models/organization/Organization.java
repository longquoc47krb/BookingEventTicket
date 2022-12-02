package com.hcmute.bookingevent.models.organization;

import com.hcmute.bookingevent.models.organization.EOrganization;
import com.hcmute.bookingevent.models.ticket.Ticket;
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
import java.util.ArrayList;
import java.util.List;

@Document("organization")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    private String id;
    private String biography;
    @NotBlank(message = "Email is required")
    @Size(max = 100)
    @Email(message = "Email is invalidate")
    @Indexed(unique = true)
    private String email;
    private String USDBalance;
    private CreditCard creditCard;
    private EOrganization status;
    private List<String> eventList;

    private List<Ticket> templateTickets = new ArrayList<>();
    private String province;
    private String venue;
    private String address;
    public Organization(String id) {
        this.id = id;
    }
    public Organization(String email,EOrganization status) {
        this.status = status;
        this.email = email;
        this.eventList= new ArrayList<>();
    }
}
