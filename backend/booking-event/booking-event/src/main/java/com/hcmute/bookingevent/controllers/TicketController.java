package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.payload.request.OrganizationTicketReq;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import com.hcmute.bookingevent.services.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class TicketController {
    private final TicketService ticketService;
    private final JwtTokenProvider jwtUtils;

    @PostMapping("/organization/ticket/{userId}/{eventId}")
    public ResponseEntity<?> createSingleTicket(@PathVariable String userId, @PathVariable String eventId, @RequestBody OrganizationTicketReq organizationTicketReq, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return ticketService.createTicket(account.getEmail(), organizationTicketReq,eventId);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @PostMapping("/organization/ticket/list/{userId}")
    public ResponseEntity<?> createMultipleTicket(@PathVariable String userId, @PathVariable String eventId, @RequestBody List<OrganizationTicketReq> organizationTicketReq, HttpServletRequest request)
    {

        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return ticketService.createMultipleTickets(account.getEmail(), organizationTicketReq,eventId );
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @GetMapping(path = "/organization/{userId}/ticket-statistics")
    public ResponseEntity<?> getOrderStatisticsForDate(
            @PathVariable String userId, @RequestParam(value = "period", required = false) String period,
            @RequestParam(value = "startDate", required = false) String startDateString,
            @RequestParam(value = "endDate", required = false) String endDateString

    ){
        // Get the current date
        Calendar today = Calendar.getInstance();
        Calendar firstDay = Calendar.getInstance();
        Calendar lastDay = Calendar.getInstance();
        Calendar prevWeeks = Calendar.getInstance();
        Calendar prevYears = Calendar.getInstance();
        // Set the day of the week to Sunday (1 = Sunday, 2 = Monday, etc.)
        firstDay.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        lastDay.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
        prevWeeks.add(Calendar.WEEK_OF_YEAR, -4);
        prevWeeks.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        prevYears.add(Calendar.YEAR, -4);
        prevYears.set(Calendar.DAY_OF_YEAR, 1);
        prevYears.set(Calendar.MONTH, Calendar.JANUARY);
        LocalDate startDate;
        LocalDate endDate;
        if (startDateString != null && endDateString != null) {
            startDate = firstDay.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            endDate = lastDay.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }
        switch(period){
            case "weekly":
                startDate = prevWeeks.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                endDate = today.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                break;
            case "yearly":
                startDate = prevYears.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                endDate = today.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                break;
            case "custom":
                startDate = LocalDate.parse(startDateString);
                endDate = LocalDate.parse(endDateString);
                break;
            case "daily":
            default:
                startDate = firstDay.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                endDate = lastDay.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                break;


        }
        return ticketService.getTicketStatistics(userId, period, startDate, endDate);
    }

}
