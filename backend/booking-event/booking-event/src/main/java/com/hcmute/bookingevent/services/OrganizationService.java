package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.config.CloudinaryConfig;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.CustomerMapper;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.mapper.OrganizationMapper;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
//import com.hcmute.bookingevent.models.OrderStats;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.EOrganization;
import com.hcmute.bookingevent.models.organization.Organization;
//import com.hcmute.bookingevent.models.organization.Statistics;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.request.OrganizationProfileReq;
import com.hcmute.bookingevent.payload.request.OrganizationSubmitReq;
import com.hcmute.bookingevent.payload.response.*;
import com.hcmute.bookingevent.repository.*;
import com.hcmute.bookingevent.services.mail.EMailType;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationService implements IOrganizationService {

    private final OrganizationRepository organizationRepository;
    private final CloudinaryConfig cloudinary;
    private final OrderRepository orderRepository;
    private final EventRepository eventRepository;

    private final AccountRepository accountRepository;
    private final MailService mailService;
    private final EventService eventService;
    private final OrderService orderService;
    private final EventMapper eventMapper;

    private MongoTemplate mongoTemplate;

    private final PasswordEncoder encoder;
    private final OrganizationMapper organizationMapper;
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;


    public ResponseEntity<?> createOrganization(Organization organization) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create Organization successfully ", organizationRepository.save(organization), 200));

    }

    @Override
    public ResponseEntity<?> findAll()
    {
        List<Organization> list = organizationRepository.findAll();
        List<AllOrganizationRes> allOrganizationRes = list.stream().map(organizationMapper::toOrganizationRes ).collect(Collectors.toList());

        if (allOrganizationRes.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all organization Account", allOrganizationRes,200));
        throw new NotFoundException("Can not find any Organization");
    }
    @Override
    public ResponseEntity<?> findEventsByOrganization(String email) {
        try {
            Optional<Organization> organization = organizationRepository.findByEmail(email);
            if(organization.isPresent()) {
                // ds các id
                List<String> eventList= organization.get().getEventList();
                List<EventOrderViewResponse> eventOrderViewResponses= eventList.stream().map(eventMapper::toEventOrder).collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Get all ticket", eventOrderViewResponses,200));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Organization has no exist", "", 200));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "", 400));
        }
    }
    @Override
    public ResponseEntity<?> findOrganizationById(String id) {
        try {
            Optional<Account> account = accountRepository.findById(id);
            return findOrganizationByEmail(account.get().getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "", 400));
        }
    }

    @Override
    public ResponseEntity<?> updateBioAndAddress(String email, OrganizationProfileReq profileReq) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            organization.get().setBiography(profileReq.getBiography());
            organization.get().setProvince(profileReq.getProvince());
            organization.get().setVenue(profileReq.getVenue());
            organization.get().setAddress(profileReq.getAddress());
            organizationRepository.save(organization.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Add bio successfully ", organization.get(), 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Add bio failed", "", 404));
        }
    }

    @Override
    public ResponseEntity<?> findOrganizationByEventid(String eventId) {
        try {
            Optional<Organization> organization = organizationRepository.findOrganizationByEventId(eventId);
            if (organization.isPresent()) {
                Optional<Account> account = accountRepository.findByEmail(organization.get().getEmail());
                return getOrganizerResponse(organization, account);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Organization has no exist", "", 400));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "", 400));
        }
    }

    private ResponseEntity<?> getOrganizerResponse(Optional<Organization> organization, Optional<Account> account) {
        OrganizerResponse organizerResponse = new OrganizerResponse(account.get().getId(),account.get().getName(),account.get().getAvatar(),account.get().getPhone(),account.get().getRole(),account.get().getEmail(),organization.get().getBiography(),organization.get().getProvince(),organization.get().getVenue(),organization.get().getAddress(),organization.get().getUSDBalance(),organization.get().getVNDBalance());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Get Organization successfully", organizerResponse, 200));
    }

    @Override
    public ResponseEntity<?> findOrganizationByEmail(String email) {
        try {
            Optional<Account> account = accountRepository.findByEmail(email);
            Optional<Organization> organization = organizationRepository.findByEmail(email);
            if (organization.isPresent()) {
                // ds các id
                return getOrganizerResponse(organization, account);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Organization has no exist", "", 400));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "", 400));
        }
    }

    @SneakyThrows
    @Override
    public ResponseEntity<?> submitOrganization(OrganizationSubmitReq organizationSubmitReq) {
        try {

            if (accountRepository.existsByEmail(organizationSubmitReq.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Email is already in use!", 400));
            }

            if (accountRepository.existsByPhone(organizationSubmitReq.getPhoneNumber())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Phone: Phone is already in use!", 400));
            }

            Account account = new Account(organizationSubmitReq.getName(), organizationSubmitReq.getEmail(), organizationSubmitReq.getPhoneNumber(), "", Constants.AVATAR_DEFAULT, Constants.ROLE_ORGANIZATION);
            accountRepository.save(account);
            // gửi mail
            mailService.sendMail(account, "", EMailType.BECOME_ORGANIZATION);

            //
            Organization organization = new Organization(account.getEmail(), EOrganization.DISABLED);
            organizationRepository.save(organization);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create organization account successfully", "", 200));
        } catch (MailSendException e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    new ResponseObject(false, "Create organization fail", e.getMessage(), 500));

        }
    }
    @SneakyThrows
    @Override
    public ResponseEntity<?> approveOrganization(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Account> account = accountRepository.findByEmail(email);
        if(account.isPresent() && organization.isPresent()) {
            String randomPassword = Constants.getAlphaNumericString(8);
            account.get().setPassWord(encoder.encode(randomPassword));
            accountRepository.save(account.get());
            organization.get().setStatus(EOrganization.ACCEPTED);
            organization.get().setUSDBalance("0");
            organization.get().setVNDBalance("0");
            organizationRepository.save(organization.get());
            mailService.sendMail(account.get(), randomPassword, EMailType.OFFICIAL_ORGANIZATION);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create organization account successfully", "", 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Request is not valid", "", 400));

        }

    }

    @SneakyThrows
    @Override
    public ResponseEntity<?> refuseOrganization(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Account> account = accountRepository.findByEmail(email);
        if (account.isPresent() && organization.isPresent()) {
            mailService.sendMail(account.get(), "", EMailType.REFUSE_ORGANIZATION);

            accountRepository.delete(account.get());
            organizationRepository.delete(organization.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "refuse organization account successfully", "", 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "can not refuse form", "", 400));

        }

    }

    @Override
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<Organization> organizations = organizationRepository.findAll(pageable);
        List<Organization> organizationList = organizations.toList();
        if (organizationList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all user success", organizationList, 200));
        throw new NotFoundException("Can not find any organization");
    }
    // tài khoản chỉ đc xóa tại thời điểm xét duyệt
    @Override
    public ResponseEntity<?> deleteOrganization(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            organizationRepository.deleteByEmail(email);
            accountRepository.deleteByEmail(email);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete organization account successfully ", "", 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete account fail with email:" + email, "", 404));
        }

    }

    public ResponseEntity<?> getFollowedList(String email)
    {
        List<String> ids = Arrays.asList(email);
        List<Customer> customerList =  customerRepository.findByFollowList(ids);
        if(customerList.size()>0)
        {
            List<FollowedListRes> followedListResList = customerList.stream().map(customerMapper::toFollowedListRes ).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "show getFollowedList successfully ",followedListResList ,200));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "fail to show getFollowedList with email:" + email, "",404));

        }
    }
    @Override
    public ResponseEntity<?> PaymentStatus(String email)
    {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "show PaymentStatus successfully ", organization.get().getPaymentPendings(), 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "can not show PaymentStatus with email:" + email, "", 404));
        }
    }
    @Override
    public ResponseEntity<?> findAllPaymentStatus()
    {
        List<Organization> organizationList = organizationRepository.findAll();


        if (organizationList.size()>0) {
            List<PaymentStatusRes> paymentStatusRes = organizationList.stream().map(organizationMapper::toPaymentStatusList ).collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "show paymentStatusRes successfully ", paymentStatusRes, 200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "can not show PaymentStatus with email:" , "", 404));
        }
    }
    @Override
    public ResponseEntity<?> removeBio(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            organization.get().setBiography("");
            organizationRepository.save(organization.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Remove bio successfully ", "", 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Remove bio failed", "", 404));
        }
    }

    @Override
    public ResponseEntity<?> createTemplateTickets(String email, List<Ticket> tickets) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            organization.get().setTemplateTickets(tickets);
            organizationRepository.save(organization.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Saved template tickets successfully ", "", 200));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Save tenplate tickets failed", "", 404));
        }


    }

    @Override
    public ResponseEntity<?> getTemplateTickets(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (!organization.get().getTemplateTickets().isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get template tickets successfully ", organization.get().getTemplateTickets(), 200));

        }
        return null;
    }
    @Override
    public ResponseEntity<?> findTicketListByEventId(String eventId,String email) {
        Optional<Event> event= eventRepository.findEventById(eventId);
        Optional<Organization> organization = organizationRepository.findByEmail(email);

        if(organization.isPresent() && !organization.get().getEventList().contains(eventId))
        {
            throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
        }
        if(event.isPresent())
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "findTicketListByEventId successfully ",  event.get().getOrganizationTickets(), 200));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "findTicketListByEventId fail ", "", 400));

        }
    }
    @Override
    public ResponseEntity<?> statistic(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if(organization.isPresent())
        {
            int count=0;
            int countOder=0;
            List<CustomerListByEventIdRes> orderList = orderRepository.getOrderWithTotalPriceAndQuantityByIdEvent();

            for(CustomerListByEventIdRes element: orderList)
            {
                if(organization.get().getEventList().contains(element.getIdEvent()))
                {
                    count+= element.getTotalQuantity();
                    countOder+= orderRepository.countOrderByEventId(element.getIdEvent());
                    System.out.println(countOder);
                }
            }

            OrganizationStatics organizationStatics = new OrganizationStatics(organization.get().getUSDBalance(),organization.get().getVNDBalance(),organization.get().getEventList().size(),count, (long) countOder);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "statistic successfully ",organizationStatics, 200));

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject(false, "statistic fail ",  "", 200));

    }
    @Override
    public ResponseEntity<?> getStatistics(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Map<String, Object> statistics = new HashMap<>();
        List<String> eventNameList = organization.get().getEventList();
        List<Order> orderList = new ArrayList<>();
        List<Integer> numTicketList= new ArrayList<>();
        List<BigDecimal> usdRevenueList= new ArrayList<>();
        List<BigDecimal> vndRevenueList= new ArrayList<>();
        for(String eventName: eventNameList){
            Optional<Event> event = eventRepository.findEventById(eventName);
            orderList.addAll(orderRepository.findAllByIdEvent(event.get().getId()));
            for(Order order : orderRepository.findAllByIdEvent(event.get().getId())){
                numTicketList.add(order.getTotalQuantity());
                BigDecimal totalPrice = new BigDecimal(order.getTotalPrice());
                if(order.getCurrency().equals("USD")){
                    usdRevenueList.add(totalPrice);
                } else {
                    vndRevenueList.add(totalPrice);
                }

            }
        }
        // Get number of events
        int numEvents = eventNameList.size();
        statistics.put("numEvents", numEvents);



        // Get number of orders
        int numOrders = orderList.size();
        statistics.put("numOrders", numOrders);

        // Get number of tickets
        int numTickets = numTicketList.stream().mapToInt(Integer::intValue).sum();
        statistics.put("numTickets", numTickets);

        // Get revenue
        BigDecimal usdRevenue = usdRevenueList.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal vndRevenue = vndRevenueList.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        statistics.put("vndRevenue", vndRevenue);
        statistics.put("usdRevenue", usdRevenue);
        // TODO: Calculate change from yesterday's statistics
        int numEventsChange = numEvents - eventService.getPreviousDayEventCount(email);
        int numOrderChange = numOrders - orderService.getPreviousDayOrderCount(email);
        statistics.put("eventsSizeChange", numEventsChange);
        statistics.put("ordersSizeChange", numOrderChange);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(false, "statistic successful ",  statistics, 200));
    }
    @Override
    public ResponseEntity<?> findCustomerListByEventId(String eventId,String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);

        if(organization.isPresent() && !organization.get().getEventList().contains(eventId))
        {
            throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
        }
        List<CustomerListRes> orderList = orderRepository.getOrderWithTotalPriceAndQuantity(eventId);

        orderList.removeIf(element -> !element.getIdEvent().equals(eventId));

        for(CustomerListRes element:orderList){
            List <Order> orderListWithEmailList = orderRepository.findAllByIdEventAndEmail(element.getIdEvent(),element.getEmail());
            BigDecimal tempx = new BigDecimal("0");
            element.setVNDRevenue(tempx);
            element.setUSDRevenue(tempx);
            for(Order orderInside: orderListWithEmailList)
            {
                BigDecimal temp = new BigDecimal("0");
                BigDecimal ticketPrice = new BigDecimal(orderInside.getTotalPrice());
                temp = temp.add(ticketPrice);
                if(orderInside.getCurrency().equals("USD"))
                {
                    element.setUSDRevenue( element.getUSDRevenue().add(temp) );
                }
                else {
                    element.setVNDRevenue( element.getVNDRevenue().add(temp) );
                }
            }
        }

        if(orderList.size()>0)
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "findTicketListByEventId successfully ",  orderList, 200));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "order is empty ", "", 400));

        }
    }
}
