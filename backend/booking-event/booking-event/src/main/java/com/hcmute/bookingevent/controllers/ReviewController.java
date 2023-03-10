package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.Implement.IReviewService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.Review;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class ReviewController {
    private final JwtTokenProvider jwtUtils;
    IReviewService iReviewService;

    @PostMapping(path = "/customer/review/{id}")
    public ResponseEntity<?> submitReview(@PathVariable String id,@Valid @RequestBody Review review,
                                    HttpServletRequest request) {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(id)) {
            return iReviewService.submitReview(review,account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @PutMapping(path = "/customer/review/{id}")
    public ResponseEntity<?> updateReview(@PathVariable String id,@Valid @RequestBody Review review,
                                          HttpServletRequest request) {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(id)) {
            return iReviewService.updateReview(review,account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @GetMapping(path = "/review")
    public ResponseEntity<?> getAllReviewByEventId(String eventId) {
       return iReviewService.findAllByEventId(eventId);
    }
    @GetMapping(path = "/customer/review/checkReview/{id}")
    public ResponseEntity<?> checkReview(@PathVariable String id, @RequestParam(value="eventId", required = false) String  eventId,HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(id)) {
            return iReviewService.isReviewAvailable(account.getEmail(), eventId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @DeleteMapping(path = "/customer/review/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable String id, @RequestParam(value="eventId", required = false) String  eventId,HttpServletRequest request) {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if (account.getId().equals(id)) {
            return iReviewService.deleteReview(account.getEmail(), eventId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
}
