package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.ICustomerService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.mapper.TicketMapper;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.request.CustomerTicketReq;
import com.hcmute.bookingevent.payload.request.OrderReq;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.CustomerRepository;
import com.hcmute.bookingevent.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService  implements ICustomerService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final TicketMapper ticketMapper;

    @Override
    public ResponseEntity<?> findAll()
    {
        List<Customer> list = customerRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Customer", list,200));
        throw new NotFoundException("Can not found any account");
    }
    @Override
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<Customer> customers = customerRepository.findAll(pageable);
        List<Customer> customerList = customers.toList();
        if (customerList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all user success", customerList,200));
        throw new NotFoundException("Can not find any organization");
    }
//    @Override
//    public ResponseEntity<?> deleteCustomer(String email) {
//        if (accountRepository.existsByEmail(email)) {
//
//            accountRepository.deleteByEmail(email);
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(true, "Delete account successfully ", "",200));
//
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                    new ResponseObject(false, "Delete account fail with email:" + email, "",404));
//        }
//
//    }
    public ResponseEntity<?> viewWishList(String email)
    {
        Optional<Customer> customer =  customerRepository.findByEmail(email);
        if(customer.isPresent())
        {
//            List<Event> eventList = new ArrayList<>();
//            for(String eventId: customer.get().getEventWishList())
//            {
//                Optional<Event>  event=  eventRepository.findEventById(eventId);
//                if(event.isPresent())
//                {
//                    eventList.add(event.get());
//                }
//            }
            //List<EventViewResponse> eventRes = eventList.stream().map(eventMapper::toEventRes ).collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "show WishList Event successfully ", customer.get().getEventWishList(),200));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "show WishList Event fail with email:" + email, "",404));

        }
    }
    public ResponseEntity<?> addWishList(String idItem,String email)
    {
        Optional<Customer> customer =  customerRepository.findByEmail(email);
        if (customer.isPresent() && !customer.get().getEventWishList().contains(idItem)) {

            customer.get().getEventWishList().add(idItem);
            customerRepository.save(customer.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Save WishList Event successfully ", "", 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "addWishList fail with email:" + email, "", 404));

        }
    }
    public ResponseEntity<?> deleteItemWishList(String idItem,String email)
    {
        Optional<Customer> customer =  customerRepository.findByEmail(email);
        if(customer.isPresent())
        {
            customer.get().getEventWishList().remove(idItem);
            customerRepository.save(customer.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete WishList Event successfully ", "",200));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "deleteItemWishList fail with email:" + email, "",404));

        }
    }
    public ResponseEntity<?> deleteAllWishList(String email)
    {
        Optional<Customer> customer =  customerRepository.findByEmail(email);
        if(customer.isPresent())
        {
            customer.get().getEventWishList().clear();
            customerRepository.save(customer.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete WishList Event successfully ", "", 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "deleteItemWishList fail with email:" + email, "", 404));

        }
    }

    @Override
    public ResponseEntity<?> createCustomerOrder(String email, OrderReq orderReq) {
        Optional<Customer> customer = customerRepository.findByEmail(email);
        if (customer.isPresent()) {
            Optional<Event> event = eventRepository.findEventById(orderReq.getIdEvent());
            if (event.isPresent()) {
                // cap nhat o event
                event.get().setTicketRemaining(event.get().getTicketRemaining() - orderReq.getTotalQuantity());

                for (CustomerTicketReq ticketOfCustomer : orderReq.getCustomerTicketReqList()) {
                    for (Ticket ticket : event.get().getOrganizationTickets()) {
                        if (ticket.getId().equals(ticketOfCustomer.getId())) {
                            ticket.setQuantityRemaining(ticket.getQuantityRemaining() - ticketOfCustomer.getQuantity());
                        }
                    }
                }
                eventRepository.save(event.get());
            }
            //convert CustomerTicket to Ticket
            List<Ticket> ticketList = orderReq.getCustomerTicketReqList().stream().map(ticketMapper::toTicket).collect(Collectors.toList());
            Order order = new Order(orderReq);
            order.setIdEvent(orderReq.getIdEvent());
            order.setCustomerTicketList(ticketList);
            //add order from order request
            customer.get().getOrderList().add(order);
            //save order to customer
            customerRepository.save(customer.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create Order for Customer successfully ", "", 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Create Order fail with email:" + email, "", 404));
        }
    }

    @Override
    public ResponseEntity<?> viewCustomerOrder(String email) {
        Optional<Customer> customer = customerRepository.findByEmail(email);
        if (customer.isPresent()) {

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "View Order for Customer successfully ", customer.get().getOrderList(), 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "View Order fail with email:" + email, "", 400));

        }
    }

    @Override
    public ResponseEntity<?> createAccount(Customer newAccount) {
        Customer account = customerRepository.save(newAccount);
        System.out.println(account.getId());
        if (newAccount != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create account successfully ", customerRepository.save(newAccount),200));

        }
        throw new NotFoundException("Can not create any account");
    }
}
