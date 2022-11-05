package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IPayPayService;
import com.hcmute.bookingevent.payload.request.PriceRes;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.utils.StringUtils;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayPalService implements IPayPayService {
    //public static final String MAIN_URL ="http://localhost:3000";
    public static final String MAIN_URL ="http://localhost:3000/payment/redirect?";


    public static final String SUCCESS_URL = "/api/payment/pay/success";
    public static final String CANCEL_URL = "/api/payment/pay/cancel";
//"http://localhost:3000/" + CANCEL_URL;
//"http://localhost:3000/" + SUCCESS_URL;

    private final APIContext apiContext;

    @Override
    //@Transactional
    public ResponseEntity<?> createPayPalPayment(PriceRes priceRes, HttpServletRequest request) {
        String cancelUrl = StringUtils.getBaseURL(request) + CANCEL_URL;
        String successUrl = StringUtils.getBaseURL(request) + SUCCESS_URL;
        // HttpSession session = request.getSession();
        // session.invalidate();
        try {
            Payment payment = createPayment(
                    Double.parseDouble(priceRes.getPrice()),
                    "USD",
                    "paypal",
                    "sale",
                    "Thanh toan hoa don " ,
                    cancelUrl,
                    successUrl);
           //session.setAttribute("id order", order);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {

                  //  Order order2 = (Order) session.getAttribute("id order");


                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject(true, "Price has entered  ", links.getHref(),200));

                }
            }
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(false, "Transaction has some problem  ", "",400));

        } catch (PayPalRESTException  e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, "Transaction has some problem  ", "",400));
        }

    }


    @SneakyThrows
    @Override
    public ResponseEntity<?> executePayPalPayment(String paymentId, String payerId,   HttpServletRequest request, HttpServletResponse response)
    {
        try {
            log.info("Execute Payment");
          //  HttpSession session = request.getSession();
        //    Order order = (Order) session.getAttribute("id order");

            Payment payment= execute(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                //handle bussiness logi

               // session.invalidate();

                //redirect

                response.sendRedirect(MAIN_URL + "success=true&cancel=false");
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Payment with Paypal complete", "",200)
                );
            }
        } catch (PayPalRESTException | IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, e.getMessage(), "",400));

        }
        response.sendRedirect(MAIN_URL + "success=false&cancel=false");
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                new ResponseObject(false, "Payment with Paypal failed", "",400)
        );
    }

    @SneakyThrows
    public   ResponseEntity<?> cancelPayPalPayment(HttpServletRequest request, HttpServletResponse response)
    {
        response.sendRedirect(MAIN_URL + "success=false&cancel=true");
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                new ResponseObject(true, "cancel payment", "",200));

    }

    public Payment createPayment(
            double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());

        Payment payment = new Payment();
        payment.setIntent(intent.toString());
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public Payment execute(String paymentId, String payerId) throws PayPalRESTException{
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }

}