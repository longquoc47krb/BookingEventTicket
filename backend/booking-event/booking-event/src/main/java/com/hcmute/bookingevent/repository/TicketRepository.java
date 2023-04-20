package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.ticket.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket,String> {

}
