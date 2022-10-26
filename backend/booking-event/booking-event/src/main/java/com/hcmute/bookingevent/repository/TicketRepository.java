package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TicketRepository extends MongoRepository<Ticket,String> {


}
