package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.ticket.Ticket;
import com.hcmute.bookingevent.payload.request.EmailReq;
import com.hcmute.bookingevent.payload.request.EventReq;
import com.hcmute.bookingevent.payload.request.OrganizationProfileReq;
import com.hcmute.bookingevent.payload.request.OrganizationSubmitReq;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class OrganizationController {
    IOrganizationService iOrganizationService;
    private final JwtTokenProvider jwtUtils;

    @GetMapping(path = "/admin/organizations")
    public ResponseEntity<?> findAllOrganization (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iOrganizationService.findAll(pageable);
    }
    @DeleteMapping(path = "/admin/organization")
    public ResponseEntity<?> deleteOrganizationAccount(@RequestBody EmailReq emailReq) {
        return iOrganizationService.deleteOrganization(emailReq.getEmail());
    }

    @PostMapping("/admin/approve/organization")
    public ResponseEntity<?> approveOrganization(@Valid @RequestBody EmailReq emailReq)
    {
        return iOrganizationService.approveOrganization(emailReq.getEmail());
    }
    @PostMapping("/admin/refuse/organization")
    public ResponseEntity<?> refuseOrganization(@Valid @RequestBody EmailReq emailReq)
    {
        return iOrganizationService.refuseOrganization(emailReq.getEmail());
    }
    @GetMapping("/organization/findAll")
    public ResponseEntity<?> findAll()
    {
        return iOrganizationService.findAll();
    }
    @GetMapping("/organization/{email}")
    public ResponseEntity<?> findOrganizationByEmail(@PathVariable String email)
    {
        return iOrganizationService.findOrganizationByEmail(email);
    }
    @GetMapping("/organization")
    public ResponseEntity<?> findOrganizationById(@RequestParam(value="id") String id)
    {
        return iOrganizationService.findOrganizationById(id);
    }
    @GetMapping("/organization/test/event/{eventId}")
    public ResponseEntity<?> findOrganizationByEventId(@PathVariable String eventId)
    {
        return iOrganizationService.findOrganizationByEventid(eventId);
    }
    @PostMapping("/organization")
    public ResponseEntity<?> submitOrganization(@RequestBody OrganizationSubmitReq organizationSubmitReq)
    {
        return iOrganizationService.submitOrganization(organizationSubmitReq);
    }
    @GetMapping("/organization/event/list/{userid}")
    public ResponseEntity<?> findEventList(@PathVariable String userid, HttpServletRequest request)
    {
        try
        {
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userid)) {
             return iOrganizationService.findEventsByOrganization(account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
        }
        catch (IllegalArgumentException e)
        {
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "JWT String argument cannot be null or empty");

        }
    }

    @PostMapping("/organization/organizerProfile/{userid}")
    public ResponseEntity<?> updateBioAndAddress(@PathVariable String userid, @RequestBody OrganizationProfileReq profileReq, HttpServletRequest request){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userid)) {
            return iOrganizationService.updateBioAndAddress(account.getEmail(), profileReq);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }

    @DeleteMapping("/organization/bio/{userid}")
    public ResponseEntity<?> deleteOrganizerBio(@PathVariable String userid,HttpServletRequest request){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userid)) {
            return iOrganizationService.removeBio(account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");

    }
    @PostMapping("/organization/templateTickets/{userId}")
    public ResponseEntity<?> createTemplateTickets(@PathVariable String userId, HttpServletRequest request, @RequestBody List<Ticket> tickets){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)) {
            return iOrganizationService.createTemplateTickets(account.getEmail(), tickets);
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @GetMapping("/organization/templateTickets/{userId}")
    public ResponseEntity<?> getTemplateTickets(@PathVariable String userId, HttpServletRequest request){
        Account account = jwtUtils.getGmailFromJWT(jwtUtils.getJwtFromHeader(request));
        if(account.getId().equals(userId)){
            return iOrganizationService.getTemplateTickets(account.getEmail());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
}
