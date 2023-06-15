package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IPaymentService;
import com.hcmute.bookingevent.payload.request.PriceRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

//@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/payment")
public class VNPayController {
    @Autowired
    @Qualifier("VNPayService")
    private  IPaymentService iPaymentService;
    @PostMapping("/VNPayOrder")
    public ResponseEntity<?> payment(@Valid @RequestBody PriceRes priceRes, HttpServletRequest request) {
        return iPaymentService.createPayment(priceRes,request);

    }
    @GetMapping(value = "/VNPay/cancel")
    public ResponseEntity<?> cancelPay(HttpServletRequest request, HttpServletResponse response) {
        return iPaymentService.cancelPayPalPayment(request,response);
    }

    @GetMapping(value = "/VNPay/success")
    public ResponseEntity<?> successPay(@RequestParam(value = "vnp_ResponseCode", required = false) String responseCode,
                                        @RequestParam(value = "vnp_OrderInfo", required = false) String id,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        return iPaymentService.executePayPalPayment(responseCode,id,request,response);

    }
}
