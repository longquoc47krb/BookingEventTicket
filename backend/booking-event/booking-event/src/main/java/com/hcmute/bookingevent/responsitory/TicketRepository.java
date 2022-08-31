package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TicketRepository extends MongoRepository<Ticket,String> {


}
