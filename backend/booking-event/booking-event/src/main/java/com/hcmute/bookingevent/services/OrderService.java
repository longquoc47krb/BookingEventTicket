package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IOrderService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
//import com.hcmute.bookingevent.models.OrderStats;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

import static com.hcmute.bookingevent.services.TicketService.setStatusForTicketType;

@Service
@RequiredArgsConstructor
//@Transactional
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final AccountRepository accountRepository;
    private final EventMapper eventMapper;
    private final CustomerRepository customerRepository;
    private final OrganizationRepository organizationRepository;

    private final MongoTemplate mongoTemplate;
    private final EventRepository eventRepository;
    private final PaymentService paymentService;


    //handle order after meeting all secure criteria
    @Override
    public ResponseEntity<?> createCustomerOrder(String email, Order order) {
        try {
            System.out.println("date:" + new Date());
            order.setCreatedDate(new Date());
            Optional<Customer> customer = customerRepository.findByEmail(email);
            Optional<Event> event = eventRepository.findEventById(order.getIdEvent());
            if (customer.isPresent() && event.isPresent()) {
                event.get().setTicketRemaining(event.get().getTicketRemaining() - order.getTotalQuantity());
                for (Ticket ticketOfCustomer : order.getCustomerTicketList()) {
                    for (Ticket ticket : event.get().getOrganizationTickets()) {
                        if (ticket.getId().equals(ticketOfCustomer.getId())) {
                            if(ticket.getQuantityRemaining() - ticketOfCustomer.getQuantity() <0)
                            {
                                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                                        new ResponseObject(false, "No more ticket", "", 501));
                            }
                            ticket.setQuantityRemaining(ticket.getQuantityRemaining() - ticketOfCustomer.getQuantity() );
                            setStatusForTicketType(ticket);
                        }
                    }
                }
                //cap nhat o organization  (cong tien)
                Optional<Organization> organization = organizationRepository.findOrganizationByEventId(order.getIdEvent());
                if (organization.isPresent()) {
                    BigDecimal orderPrice = new BigDecimal(order.getTotalPrice());
                    if (order.getCurrency().equals("USD")) {
                        paymentService.setPaymentToCountedUSD(organization.get(),order.getIdEvent(),orderPrice );
                    } else if (order.getCurrency().equals("VND")) {
                        paymentService.setPaymentToCountedVND(organization.get(),order.getIdEvent(),orderPrice );
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                                new ResponseObject(false, "Problem with currency ", "", 400));

                    }
                    organizationRepository.save(organization.get());
                }
                eventRepository.save(event.get());

                orderRepository.save(order);
                customerRepository.save(customer.get());

                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Create Order for Customer successfully ", orderRepository.findById(order.getId()), 200));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Create Order fail with email:" + email, "", 404));
            }
            //throw new Exception("test");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Create Order fail with email:" + email, e.getMessage(), 404));
        }
    }

    @Override
    public ResponseEntity<?> checkOrderAvailability( Order order) {
        Optional<Event> event = eventRepository.findEventById(order.getIdEvent());
        Map<String,Boolean> map=new HashMap<String,Boolean>();
        if(event.isPresent())
        {
            for (Ticket ticketOfCustomer : order.getCustomerTicketList()) {
                for (Ticket ticket : event.get().getOrganizationTickets()) {
                    //
                    if (ticket.getId().equals(ticketOfCustomer.getId())) {
                        if(ticket.getQuantityRemaining() - ticketOfCustomer.getQuantity() <0)
                        {
                            map.put(ticket.getTicketName(),false);
                        }
                    }
                }
            }
            if(!map.isEmpty())
            {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                        new ResponseObject(false, "check  Order availability fail " ,map, 400));

            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "check  Order availability successfully" , new ArrayList<>(), 200));
    }




    @Override
    public ResponseEntity<?> findCustomerOrderByEmail(String email) {
        Optional<Customer> customer = customerRepository.findByEmail(email);
        if (customer.isPresent()) {

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "findCustomerOrderByEmail successfully ", orderRepository.findAllByEmail(email), 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "findCustomerOrderByEmail fail with email:" + email, "", 400));

        }
    }

    @Override
    public ResponseEntity<?> findAll() {

        List<Order> orderList = orderRepository.findAll();
        if (orderList.size() > 0) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "find All order", orderList, 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "find All order fail", "", 400));

        }

    }

    @Override
    public ResponseEntity<?> findOrderByEventId(String eventId,String email) {
        List <Order> orderList = orderRepository.findAllByIdEvent(eventId);
        Optional<Organization> organization = organizationRepository.findByEmail(email);

        if(organization.isPresent() && !organization.get().getEventList().contains(eventId))
        {
            throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
        }
        if(orderList.size()>0)
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "finding List of Order successfully ", orderList, 200));

        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "finding List of Order   fail ", new ArrayList<>(), 400));

        }
    }


    @Override
    public ResponseEntity<?> findOrderByTicketType(String ticketTypeId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "findOrderByTicketType successfully ", orderRepository.findAllByCustomerTicketList_Id(ticketTypeId), 200));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "findOrderByTicketType fail ", e.getMessage(), 400));

        }

    }
    public int getPreviousDayOrderCount(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        List<Order> orders = new ArrayList<>();
        List<Event> events = new ArrayList<>();
        for(String eventId : organization.get().getEventList()){
            events.add(eventRepository.findEventById(eventId).get());
            orders.addAll(orderRepository.findAllByIdEvent(eventId));
        }

        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime startOfPast = LocalDateTime.of(2000, 1, 1, 0, 0, 0);

        Date startOfYesterdayDate = Date.from(startOfYesterday.atZone(ZoneId.systemDefault()).toInstant());
        Date startOfPastDate = Date.from(startOfPast.atZone(ZoneId.systemDefault()).toInstant());

        long orderCount = orders.stream()
                .filter(order -> order.getCreatedDate().after(startOfPastDate) &&
                        order.getCreatedDate().before(startOfYesterdayDate))
                .count();

        return (int) orderCount;
    }

}
