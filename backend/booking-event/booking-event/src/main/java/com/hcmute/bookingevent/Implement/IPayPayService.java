package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Order;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IPayPayService {
   // ResponseEntity<?> createPayment(HttpServletRequest request, Order order);
   ResponseEntity<?> createPayPalPayment(Order order, HttpServletRequest request) ;
   ResponseEntity<?> executePayPalPayment(String paymentId, String payerId, HttpServletRequest request, HttpServletResponse response);
   ResponseEntity<?> cancelPayPalPayment(HttpServletRequest request, HttpServletResponse response);

}
