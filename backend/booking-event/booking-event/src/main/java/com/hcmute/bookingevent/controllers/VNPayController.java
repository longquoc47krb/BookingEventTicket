package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.services.VNPayService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class VNPayController {

    private final VNPayService vnpayService;

//    @PostMapping("/payment")
//    public String createPayment(@RequestBody PaymentRequest paymentRequest) {
//        // Tạo mã thanh toán và trả về URL để chuyển hướng người dùng đến trang thanh toán của VNPAY
//        String paymentUrl = vnpayService.generatePaymentUrl(paymentRequest);
//        return paymentUrl;
//    }
//
//    @PostMapping("/payment/callback")
//    public void handlePaymentCallback(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        // Xử lý kết quả thanh toán từ VNPAY
//        VnpayCallbackResponse callbackResponse = vnpayService.handlePaymentCallback(request);
//        if (callbackResponse.isSuccess()) {
//            // Thanh toán thành công, cập nhật trạng thái đơn hàng trong cơ sở dữ liệu của ứng dụng
//        } else {
//            // Thanh toán thất bại, xử lý theo yêu cầu của ứng dụng
//        }
//        // Trả về HTTP status 200 để thông báo cho VNPAY rằng xử lý callback thành công
//        response.setStatus(HttpServletResponse.SC_OK);
//    }
}
