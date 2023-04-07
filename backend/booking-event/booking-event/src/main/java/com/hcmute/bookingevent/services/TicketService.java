package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.ITicketService;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.mapper.TicketMapper;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.event.EventStatus;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.ticket.TicketStatus;
import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrderRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class TicketService implements ITicketService {


    private final OrganizationRepository organizationRepository;
    private final OrderRepository orderRepository;
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
    static void setStatusForTicketType(Ticket ticket) {
        int quantityRemaining = ticket.getQuantityRemaining();
        if(quantityRemaining == 0){
            ticket.setStatus(TicketStatus.SOLD_OUT);
        }
        else {
            if((float)((ticket.getQuantity() - ticket.getQuantityRemaining() )/ ticket.getQuantity()) > 0.7)
            {
                ticket.setStatus(TicketStatus.BEST_SELLER);
            }
            else
            {
                ticket.setStatus(TicketStatus.AVAILABLE);
            }

        }
    }
    @Override
    public ResponseEntity<?> getListOrderPerDay(String email, String period) {
        Organization organization = organizationRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Organization not found"));
        int numOrders = 0;
        List<Event> events = new ArrayList<>();
        List<Order> orders = new ArrayList<>();

        // Get the start and end dates for the desired period
        LocalDate startDate, endDate;
        switch (period) {
            case "week":
                startDate = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                endDate = LocalDate.now().with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
                break;
            case "month":
                startDate = LocalDate.now().withDayOfMonth(1);
                endDate = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
                break;
            case "year":
                startDate = LocalDate.now().withDayOfYear(1);
                endDate = LocalDate.now().withDayOfYear(LocalDate.now().lengthOfYear());
                break;
            default:
                // If no period is specified, default to counting orders for all time
                startDate = LocalDate.MIN;
                endDate = LocalDate.MAX;
        }
        // Iterate over all events and orders and count the number of orders for each date
        Map<LocalDate, Integer> orderCountsByDate = new HashMap<>();
        for(String eventName: organization.getEventList() ){
            Optional<Event> event = eventRepository.findEventById(eventName);
            for (Order order : orderRepository.findAllByIdEvent(event.get().getId())) {
                LocalDate orderDate = order.getCreatedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                if (orderDate.isAfter(startDate) && orderDate.isBefore(endDate)) {
                    orderCountsByDate.put(orderDate, orderCountsByDate.getOrDefault(orderDate, 0) + order.getTotalQuantity());
                }   }
        }

        // Convert the order counts map to an array of objects
        List<Map<String, Object>> orderStatistics = new ArrayList<>();
        for (Map.Entry<LocalDate, Integer> entry : orderCountsByDate.entrySet()) {
            Map<String, Object> orderStat = new HashMap<>();
            orderStat.put("date", entry.getKey());
            orderStat.put("numOrders", entry.getValue());
            orderStatistics.add(orderStat);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "getListOrderPerDay successfully ", orderStatistics, 200));

    }


}
