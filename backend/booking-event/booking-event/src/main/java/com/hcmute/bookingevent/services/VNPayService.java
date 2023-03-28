package com.hcmute.bookingevent.services;

import lombok.Value;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Service
public class VNPayService {

//    @Value("${vnpay.api.url}")
//    private String vnpayUrl;
//
//    @Value("${vnpay.tmn_code}")
//    private String tmnCode;
//
//    @Value("${vnpay.hash_secret}")
//    private String hashSecret;
//
//    public String generatePaymentUrl(Order order) throws Exception {
//        // Tạo một đối tượng VnPayRequest từ thông tin đơn hàng
//        VnPayRequest vnPayRequest = new VnPayRequest();
//        vnPayRequest.setVnp_TmnCode(tmnCode);
//        vnPayRequest.setVnp_Amount(order.getAmount());
//        vnPayRequest.setVnp_Command("pay");
//        vnPayRequest.setVnp_CreateDate(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
//        vnPayRequest.setVnp_CurrCode("VND");
//        vnPayRequest.setVnp_IpAddr(order.getIpAddress());
//        vnPayRequest.setVnp_Locale("vn");
//        vnPayRequest.setVnp_OrderInfo(order.getOrderInfo());
//        vnPayRequest.setVnp_OrderType("default");
//        vnPayRequest.setVnp_ReturnUrl(order.getReturnUrl());
//        vnPayRequest.setVnp_TxnRef(order.getOrderId());
//
//        // Tính toán hash và set giá trị cho vnp_SecureHash
//        String vnpHashData = vnPayRequest.getVnp_Amount() + vnPayRequest.getVnp_BankCode() + vnPayRequest.getVnp_Command() + vnPayRequest.getVnp_CreateDate()
//                + vnPayRequest.getVnp_CurrCode() + vnPayRequest.getVnp_IpAddr() + vnPayRequest.getVnp_Locale()
//                + vnPayRequest.getVnp_OrderInfo() + vnPayRequest.getVnp_OrderType() + vnPayRequest.getVnp_ReturnUrl() + vnPayRequest.getVnp_TmnCode()
//                + vnPayRequest.getVnp_TxnRef() + vnPayRequest.getVnp_TransactionNo() + vnPayRequest.getVnp_Version();
//        String vnpSecureHash = Utils.sha256(hashSecret + vnpHashData);
//        vnPayRequest.setVnp_SecureHash(vnpSecureHash);
//
//        // Tạo URL payment từ thông tin request
//        String paymentUrl = vnpayUrl + "?" + Utils.buildQueryUrl(vnPayRequest);
//
//        return paymentUrl;
//    }
//
//    public boolean verifyVnPayResponse(Map<String, String> params) throws Exception {
//        String vnp_SecureHash
//    }
}
