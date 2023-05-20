package com.hcmute.bookingevent.config.paypal;

import org.springframework.context.annotation.Configuration;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.List;
@Configuration
public class VNPayConfig {

    public static String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static String vnp_Returnurl =
            "/api/payment/VNPay/success";
    public static String vnp_HashSecret = "EQCQGZHANETTRMXKRTPUYZAGPXTSVLUU"; //"OYGPDLSJTUSULTMOWBFFJMPTHNKMILXS";//CYRZSLSDARTODVXSOAOSGJMZULNPUQZI
    public static String vnp_apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
    public static String vnp_orderType = "200000";
    public static String vnp_TmnCode = "HU9APPS9";//LDASSMNX
    public static String vnp_currCode = "VND";
    public static String vnp_Version = "2.1.0";
    public static String vnp_Command = "pay";
    public static final String vnp_Version_k = "vnp_Version";
    public static final String vnp_Command_k = "vnp_Command";
    public static final String vnp_TmnCode_k = "vnp_TmnCode";
    public static final String vnp_Amount = "vnp_Amount";
    public static final String vnp_CurrCode = "vnp_CurrCode";
    public static final String vnp_TxnRef_k  = "vnp_TxnRef";
    public static final String vnp_OrderInfo_k = "vnp_OrderInfo";
    public static final String vnp_OrderType = "vnp_OrderType";
    public static final String vnp_Locale = "vnp_Locale";
    public static final String vn = "VN";
    public static final String vnp_ReturnUrl = "vnp_ReturnUrl";
    public static final String vnp_IpAddr = "vnp_IpAddr";
    public static final String yyyyMMddHHmmss = "yyyyMMddHHmmss";
    public static final String vnp_CreateDate = "vnp_CreateDate";
    public static final String vnp_ExpireDate = "vnp_ExpireDate";
    public static final String vnp_Bill_FirstName = "vnp_Bill_FirstName";
    public static final String vnp_Bill_LastName = "vnp_Bill_LastName";
    public static final String GMT = "Etc/GMT+7";
    public static final String vnp_SecureHash = "&vnp_SecureHash=";
    public static final String responseSuccessCode = "00";
    public static final String responseCancelCode = "24";

    public static final List<String> responseErrCode = List.of(new String[]{
            "06", "05","24","07","09","10","11","12","99","75"
    });

    public static String getIpAddress(HttpServletRequest request) {
        String ipAddress;
        try {
            ipAddress = request.getHeader("X-FORWARDED-FOR");
            if (ipAddress == null) {
                ipAddress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAddress = "Invalid IP:" + e.getMessage();
        }
        return ipAddress;
    }

    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null)
                throw new NullPointerException();
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (Exception ex) {
            return "";
        }
    }
}
