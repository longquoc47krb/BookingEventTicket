package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface ICustomerService {
    ResponseEntity<?> findAll();
    ResponseEntity<?> createAccount(Customer newAccount);
    ResponseEntity<?> findAll(Pageable pageable);
   // ResponseEntity<?> deleteCustomer(String email);
    ResponseEntity<?> deleteAllWishList(String email);
    ResponseEntity<?> deleteItemWishList(String idItem,String email);
    ResponseEntity<?> addWishList(String idItem,String email);
    ResponseEntity<?> viewWishList(String email);
    ResponseEntity<?> createCustomerOrder(String email, Order order);
}
