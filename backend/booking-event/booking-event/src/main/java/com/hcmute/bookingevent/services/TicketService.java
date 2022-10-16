package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.ITicketService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Ticket;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.OrganizationRepository;
import com.hcmute.bookingevent.responsitory.TicketRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService implements ITicketService {

    private final TicketRepository ticketRepository;

    @Override
    public ResponseEntity<?> findAll()
    {
        List<Ticket> list = ticketRepository.findAll();

        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all ticket", list));
        throw new NotFoundException("Can not found any ticket");
    }
}
