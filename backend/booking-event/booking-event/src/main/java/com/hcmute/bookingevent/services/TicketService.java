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
    public ResponseEntity<?> getTicketStatistics(String email, String period, LocalDate startDate, LocalDate endDate) {
        Organization organization = organizationRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Organization not found"));

        List<Event> events = new ArrayList<>();
        for (String eventName : organization.getEventList()) {
            Optional<Event> event = eventRepository.findEventById(eventName);
            event.ifPresent(events::add);
        }
        // Initialize the orderCountsByDate map with 0 values for each day in the range
        Map<LocalDate, Integer> ticketCountsByDate = new HashMap<>();
        Map<LocalDate, Integer> ticketCountsByWeek = new HashMap<>();
        Map<LocalDate, Integer> ticketCountsByMonth = new HashMap<>();
        Map<LocalDate, Integer> ticketCountsByYear = new HashMap<>();
        Map<LocalDate, String> revenueCountByDate = new HashMap<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            ticketCountsByDate.put(date, 0);
        }

        for (String eventName: organization.getEventList()) {
            Optional<Event> event = eventRepository.findEventById(eventName);
            for (Order order : orderRepository.findAllByIdEvent(event.get().getId())) {
                LocalDate orderDate = order.getCreatedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                if (isWithinPeriod(orderDate, period, startDate, endDate)) {
                    ticketCountsByDate.put(orderDate, ticketCountsByDate.getOrDefault(orderDate, 0) + order.getTotalQuantity());
                    revenueCountByDate.put(orderDate, revenueCountByDate.getOrDefault(orderDate, "0") + order.getTotalPrice());
                }
            }
        }

        List<Map<String, Object>> ticketStatistics = new ArrayList<>();
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            Map<String, Object> ticketStat = new HashMap<>();
            ticketStat.put("date", currentDate);
            ticketStat.put("numberTickets", ticketCountsByDate.getOrDefault(currentDate, 0));
            ticketStat.put("revenue", revenueCountByDate.getOrDefault(currentDate, "0"));
            ticketStatistics.add(ticketStat);
            currentDate = getNextDate(currentDate, period);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Ticket statistics for " + period + " period", ticketStatistics, 200));

    }
    private boolean isWithinPeriod(LocalDate date, String period, LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            return false;
        }
        switch (period) {
            case "daily":
                LocalDate startOfWeek = startDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                LocalDate endOfWeek = endDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
                return date.isEqual(startOfWeek) || date.isEqual(endOfWeek) || (date.isAfter(startOfWeek) && date.isBefore(endOfWeek));
            case "weekly":
                startOfWeek = startDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                endOfWeek = endDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
                return date.isEqual(startDate) || (date.isAfter(startOfWeek) && date.isBefore(endOfWeek));
            case "monthly":
                return date.getMonthValue() == startDate.getMonthValue() && date.getYear() == startDate.getYear();
            case "yearly":
                return date.getYear() == startDate.getYear();
            case "custom":
                return !date.isBefore(startDate) && !date.isAfter(endDate);
            default:
                return false;
        }
    }

    private LocalDate getNextDate(LocalDate date, String period) {
        switch (period) {
            case "daily":
                return date.plusDays(1);
            case "weekly":
                return date.plusWeeks(1);
            case "monthly":
                return date.plusMonths(1);
            case "yearly":
                return date.plusYears(1);
            default:
                return date;
        }
    }


}
