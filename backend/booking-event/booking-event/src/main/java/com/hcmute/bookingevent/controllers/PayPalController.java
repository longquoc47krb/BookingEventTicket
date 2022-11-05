package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.payload.request.PriceRes;
import com.hcmute.bookingevent.services.PayPalService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/payment")
public class PayPalController {

    private final PayPalService service;
    @PostMapping("/payOrder")
    public ResponseEntity<?> payment(@Valid @RequestBody PriceRes priceRes, HttpServletRequest request) {
        return service.createPayPalPayment(priceRes,request);

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