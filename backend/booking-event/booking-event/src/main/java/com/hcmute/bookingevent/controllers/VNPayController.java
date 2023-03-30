package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.payload.request.PriceRes;
import com.hcmute.bookingevent.services.VNPayService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/payment")
public class VNPayController {

    private final VNPayService vnpayService;

    @PostMapping("/VNPayOrder")
    public ResponseEntity<?> payment(@Valid @RequestBody PriceRes priceRes, HttpServletRequest request) {
        return vnpayService.createPayment(request,priceRes);

    }
    @GetMapping(value = "/VNPay/cancel")
    public ResponseEntity<?> cancelPay(HttpServletRequest request, HttpServletResponse response) {
        return vnpayService.cancelPayPalPayment(request,response);
    }

    @GetMapping(value = "/VNPay/success")
    public ResponseEntity<?> successPay(@RequestParam(value = "vnp_ResponseCode", required = false) String responseCode,
                                        @RequestParam(value = "vnp_OrderInfo", required = false) String id,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        return vnpayService.executePayment(responseCode,id,request,response);

    }
}
