package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.services.PayPalService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/payment")
public class PayPalController {

    private final PayPalService service;
    @PostMapping("/payOrder")
    public ResponseEntity<?> payment(@RequestBody Order order, HttpServletRequest request) {
        return service.createPayPalPayment(order,request);

    }
    @GetMapping(value = "/pay/cancel")
    public ResponseEntity<?> cancelPay(HttpServletRequest request, HttpServletResponse response) {
        return service.cancelPayPalPayment(request,response);
    }

    @GetMapping(value = "/pay/success")
    public ResponseEntity<?> successPay(@RequestParam("paymentId") String paymentId,
                                        @RequestParam("PayerID") String payerId,
                                        HttpServletRequest request,
                             HttpServletResponse response) {
        return service.executePayPalPayment(paymentId,payerId,request,response);

    }

}