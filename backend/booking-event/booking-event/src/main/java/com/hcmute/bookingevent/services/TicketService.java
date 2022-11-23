package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.ITicketService;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.mapper.TicketMapper;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.event.EventStatus;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.ticket.TicketStatus;
import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TicketService implements ITicketService {

    private final OrganizationRepository organizationRepository;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final TicketMapper ticketMapper;
//    @Override
//    public ResponseEntity<?> findAll()
//    {
//        List<Ticket> list = ticketRepository.findAll();
//
//        if (list.size() > 0)
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(true, "Get all ticket", list,200));
//        throw new NotFoundException("Can not found any ticket");
//    }
    @Override
    public ResponseEntity<?> createTicket(String email, OrganizationTicketReq organizationTicketReq, String eventId)
    {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Event> event= eventRepository.findEventById(eventId);
        try
        {
            if(organization.isPresent() && event.isPresent())
            {
                Ticket ticket = new Ticket(organizationTicketReq);
                event.get().getOrganizationTickets().add(ticket);
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
    public ResponseEntity<?> createMultipleTickets(String email, List<OrganizationTicketReq> organizationTicketReq, String eventId )
    {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Event> event= eventRepository.findEventById(eventId);

        try
        {
            if(organization.isPresent() &&  event.isPresent())
            {
                List<Ticket> ticketList = organizationTicketReq.stream().map(ticketMapper::toTicket ).collect(Collectors.toList());

                event.get().setOrganizationTickets(ticketList);
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

    @Override
    public ResponseEntity<?> reduceTicketQuantity(String eventId, String ticketId) {
        try
        {
        Optional<Event> event = eventRepository.findEventById(eventId);
        if(event.isPresent()){
        List<Ticket> tickets = event.get().getOrganizationTickets();

        Ticket filterTicket = tickets.stream().filter(t -> t.getId().equals(ticketId)).collect(Collectors.toList()).get(0);

        int quantityRemaining = filterTicket.getQuantityRemaining();
        if(quantityRemaining == 0){
            filterTicket.setStatus(TicketStatus.SOLD_OUT);
        }
        else {
            filterTicket.setQuantityRemaining(quantityRemaining - 1);
            if(filterTicket.getQuantityRemaining() == 0){
                filterTicket.setStatus(TicketStatus.SOLD_OUT);
            }else{
                filterTicket.setStatus(TicketStatus.AVAILABLE);
            }

        }

        int index = IntStream.range(0, tickets.size()).filter(t -> filterTicket.equals(tickets.get(t))).findFirst().orElse(-1);

        int ticketRemaining = event.get().getTicketRemaining();


            for (Ticket ticket : tickets) {
                if (ticket.getId().equals(filterTicket.getId())) {
                    tickets.set(index, filterTicket);
                }

            }
            if(ticketRemaining == 0){
                event.get().setStatus(EventStatus.SOLD_OUT);
            }
            else {
                event.get().setTicketRemaining(ticketRemaining - 1);
                if(event.get().getTicketRemaining() == 0){
                    event.get().setStatus(EventStatus.SOLD_OUT);
                }else{
                    event.get().setStatus(EventStatus.AVAILABLE);
                }

            }
            event.get().setOrganizationTickets(tickets);
            eventRepository.save(event.get());
             return ResponseEntity.status(HttpStatus.OK).body(
                     new ResponseObject(true, "Success ", tickets,200));

          }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(true, "Failure ", "",400));
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "",400));
        }
    }


}
