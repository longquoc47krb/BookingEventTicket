package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.event.EventSlug;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.payload.response.CustomerListByEventIdRes;
import com.hcmute.bookingevent.payload.response.CustomerListRes;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order,String> {
    Optional<Order> findById(String id);
    List<Order> findAllByEmail(String email);
    List<Order> findAllByCreatedDateBetween(LocalDateTime start, LocalDateTime end);
    Optional<Order> findOrderByCreatedDateBetween(Date date);
    Optional<Order> findByCreatedDate(Date date);

    List<Order> findAllByIdEventAndEmail(String EventId,String email);
    @Query("{ 'idEvent' : ?0 }")
    List<Order> findAllByIdEvent(String idEvent);
    List<Order> findAllByCustomerTicketList_Id(String ticketTypeId);

   // @Aggregation(" { $group : { _id : '$email' }} ")
   // List<Order> getOrderDistance();

    @Query("{ 'idEvent' : ?0 }")
    @Aggregation("{ $group : { _id :  { email : $email , id :$idEvent} , email  : { $first: $email } , idEvent  : { $first: $idEvent }, currency  : { $first: $currency } , totalPrice : { $sum : $totalPrice },totalTicket : { $sum : $totalQuantity } } }")
    //@Aggregation("{ $group : { _id : $email, idEvent  : { $first: $idEvent }, currency  : { $first: $currency } , USDRevenue : { $sum : $USDRevenue },totalTicket : { $sum : $totalQuantity } } }")
    List<CustomerListRes> getOrderWithTotalPriceAndQuantity(String idEvent);

    @Aggregation("{ $group : { _id : $idEvent, currency  : { $first: $currency } , totalPrice : { $sum : $totalPrice },totalQuantity : { $sum : $totalQuantity } } }")
    List<CustomerListByEventIdRes> getOrderWithTotalPriceAndQuantityByIdEvent();

    //List<Order> findDistinctByEmailAndAndIdEvent

    @Query(value = "{idEvent: ?0}", count = true)
    Long countOrderByEventId(String idEvent);


    Order[] findOrderByCreatedDateBetween(LocalDateTime atStartOfDay, LocalDateTime atTime);
}
