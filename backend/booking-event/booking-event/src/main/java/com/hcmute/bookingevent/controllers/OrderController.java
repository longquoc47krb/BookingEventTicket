package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.payload.response.PriceRes;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class OrderController {
//    @PostMapping("/order")
//    public ResponseEntity<?> payment(@RequestBody PriceRes priceRes, HttpServletRequest request) {
//        return "";
//        //return service.createPayPalPayment(priceRes,request);
//
//    }
}
