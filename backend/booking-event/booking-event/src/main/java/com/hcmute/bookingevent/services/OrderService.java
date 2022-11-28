package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IOrderService;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.CustomerRepository;
import com.hcmute.bookingevent.repository.EventRepository;
import com.hcmute.bookingevent.repository.OrderRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.*;

import static com.hcmute.bookingevent.services.TicketService.setStatusForTicketType;

@Service
@RequiredArgsConstructor
//@Transactional
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrganizationRepository organizationRepository;

    private final EventRepository eventRepository;

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
                //
                for (Ticket ticketOfCustomer : order.getCustomerTicketList()) {
                    for (Ticket ticket : event.get().getOrganizationTickets()) {
                        if (ticket.getId().equals(ticketOfCustomer.getId())) {
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
                        BigDecimal usdBalance = new BigDecimal(organization.get().getUSDBalance());
                        organization.get().setUSDBalance((usdBalance.add(orderPrice)).toString());
                    } else if (order.getCurrency().equals("VND")) {
                        BigDecimal vndBalance = new BigDecimal(organization.get().getVNDBalance());
                        organization.get().setVNDBalance(vndBalance.add(orderPrice).toString());
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
        if(event.isPresent())
        {
            for (Ticket ticketOfCustomer : order.getCustomerTicketList()) {
                for (Ticket ticket : event.get().getOrganizationTickets()) {
                    //
                    if (ticket.getId().equals(ticketOfCustomer.getId())) {
                        if(ticket.getQuantityRemaining() - ticketOfCustomer.getQuantity() <0)
                        {
                            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                                    new ResponseObject(false, "check  Order availability fail with ticket: " + ticket.getTicketName() ,ticket.getTicketName(), 400));
                        }
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "check  Order availability successfully" , "", 200));
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
    public ResponseEntity<?> findOrderByEventId(String eventId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "findOrderByEventId successfully ", orderRepository.findAllByIdEvent(eventId), 200));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "findOrderByEventId fail ", e.getMessage(), 400));

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
}
