package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.config.paypal.VNPayConfig;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;


@RequiredArgsConstructor
@Service
public class VNPayService {
    public static final String MAIN_URL = "https://lotusticket-vn.netlify.app/payment/redirect?";

    @SneakyThrows
    //@Override
    public ResponseEntity<?> createPayment(HttpServletRequest request, Order order) {
        //order.setState(Constants.ORDER_STATE_PROCESS);
        //order.getPaymentDetail().getPaymentInfo().put("isPaid", false);
        //orderRepository.save(order);
        //Config.getIpAddress(req)
        Map<String, Object> vnp_Params = mapVnPayParam(order, request);
        //Build data to hash and querystring
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName) + "";
            if (!fieldValue.isBlank() && fieldValue.length() > 0) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += VNPayConfig.vnp_SecureHash + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
//        String checkUpdateQuantityProduct = paymentUtils.checkingUpdateQuantityProduct(order, true);
//        if (checkUpdateQuantityProduct == null) {
//            paymentValidatorUtils.setOrderId(order.getId());
//            paymentValidatorUtils.setOrderRepository(orderRepository);
//            paymentValidatorUtils.setPaymentUtils(paymentUtils);
//            taskScheduler.schedule(paymentValidatorUtils, new Date(System.currentTimeMillis() + Constants.PAYMENT_TIMEOUT)) ;
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(true, "Payment Complete", paymentUrl,200));
//        } else throw new AppException(HttpStatus.CONFLICT.value(), "Quantity exceeds the available stock!");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Payment Complete", paymentUrl, 200));
    }

    public Map<String, Object> mapVnPayParam(Order order, HttpServletRequest request) {
        String vnp_IpAddr = VNPayConfig.getIpAddress(request);
        String vnp_TxnRef = String.valueOf(System.currentTimeMillis());
//        String total = String.valueOf((order.getTotalPrice().add(new BigDecimal(order.getDeliveryDetail().getDeliveryInfo().get("fee").toString())))
//                .multiply(BigDecimal.valueOf(100)));
        String total = String.valueOf(order.getTotalPrice());
        Map<String, Object> vnp_Params = new HashMap<>();
        vnp_Params.put(VNPayConfig.vnp_Version_k, VNPayConfig.vnp_Version);
        vnp_Params.put(VNPayConfig.vnp_Command_k, VNPayConfig.vnp_Command);
        vnp_Params.put(VNPayConfig.vnp_TmnCode_k, VNPayConfig.vnp_TmnCode);
        vnp_Params.put(VNPayConfig.vnp_CurrCode, VNPayConfig.vnp_currCode);
        vnp_Params.put(VNPayConfig.vnp_TxnRef_k, vnp_TxnRef);
        vnp_Params.put(VNPayConfig.vnp_OrderInfo_k, order.getId());
        vnp_Params.put(VNPayConfig.vnp_OrderType, VNPayConfig.vnp_orderType);
        vnp_Params.put(VNPayConfig.vnp_Locale, VNPayConfig.vn);
        vnp_Params.put(VNPayConfig.vnp_ReturnUrl, StringUtils.getBaseURL(request) + VNPayConfig.vnp_Returnurl);
        vnp_Params.put(VNPayConfig.vnp_IpAddr, vnp_IpAddr);
        vnp_Params.put(VNPayConfig.vnp_Amount, total);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone(VNPayConfig.GMT));
        SimpleDateFormat formatter = new SimpleDateFormat(VNPayConfig.yyyyMMddHHmmss);
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put(VNPayConfig.vnp_CreateDate, vnp_CreateDate);
        cld.add(Calendar.MINUTE, 5);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put(VNPayConfig.vnp_ExpireDate, vnp_ExpireDate);
        //get email order
        String fullName = order.getEmail();
        if (fullName != null && !fullName.isEmpty()) {
            int idx = fullName.indexOf(' ');
            if (idx != -1) {
                String firstName = fullName.substring(0, idx);
                String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
                vnp_Params.put(VNPayConfig.vnp_Bill_FirstName, firstName);
                vnp_Params.put(VNPayConfig.vnp_Bill_LastName, lastName);
            } else {
                vnp_Params.put(VNPayConfig.vnp_Bill_FirstName, fullName);
                vnp_Params.put(VNPayConfig.vnp_Bill_LastName, fullName);
            }
        }
        return vnp_Params;
    }

    @SneakyThrows
    public ResponseEntity<?> cancelPayPalPayment(HttpServletRequest request, HttpServletResponse response) {
        //response.sendRedirect(MAIN_URL + "success=false&cancel=true");
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                new ResponseObject(true, "cancel payment", "", 200));

    }

    @SneakyThrows
    public ResponseEntity<?> executePayment(String responseCode, String id, HttpServletRequest request, HttpServletResponse response) {
//        Optional<Order> order = orderRepository.findById(id);
//        if (order.isEmpty() || !order.get().getState().equals(Constants.ORDER_STATE_PROCESS)) {
//            response.sendRedirect(MAIN_URL + "success=false&cancel=false");
//            throw new NotFoundException("Can not found order with id: " + id);
//        }
        if (responseCode.equals(VNPayConfig.responseSuccessCode)) {
            response.sendRedirect(MAIN_URL + "success=true&cancel=false");
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Payment Completed", "", 200)
            );
        } else {
            if (responseCode.equals(VNPayConfig.responseCancelCode)) {
                response.sendRedirect(MAIN_URL + "success=true&cancel=true");
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Payment cancel complete", "", 200));
            } else response.sendRedirect(MAIN_URL + "success=false&cancel=false");
            throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Failed when payment");
        }
    }


}
