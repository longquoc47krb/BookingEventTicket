package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.ITicketService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.models.Ticket;
import com.hcmute.bookingevent.models.TicketType;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import com.hcmute.bookingevent.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService implements ITicketService {

    private final TicketRepository ticketRepository;
    private final OrganizationRepository organizationRepository;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    @Override
    public ResponseEntity<?> findAll()
    {
        List<Ticket> list = ticketRepository.findAll();

        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all ticket", list,200));
        throw new NotFoundException("Can not found any ticket");
    }
    @Override
    public ResponseEntity<?> createTicket(String email, TicketType ticketType, String eventId)
    {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Event> event= eventRepository.findEventById(eventId);
        try
        {
            if(organization.isPresent() && event.isPresent())
            {
                event.get().getTicketTypes().add(ticketType);
                eventRepository.save(event.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Create one ticket successfully", "",200));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(true, "Failure ", "",400));
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "",400));
        }
    }
    @Override
    public ResponseEntity<?> createMultipleTickets(String email, List<TicketType> ticketType ,String eventId )
    {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Event> event= eventRepository.findEventById(eventId);

        try
        {
            if(organization.isPresent() &&  event.isPresent())
            {
                event.get().setTicketTypes(ticketType);
                eventRepository.save(event.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Create multiple tickets successfully", "",200));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(true, "Failure ", "",400));
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "",400));
        }
    }

}
