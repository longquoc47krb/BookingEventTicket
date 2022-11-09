package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.exception.AppException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.request.EmailReq;
import com.hcmute.bookingevent.payload.request.OrganizationSubmitReq;
import com.hcmute.bookingevent.security.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
    public ResponseEntity<?> approveOrganization(@RequestBody EmailReq emailReq)
    {
        return iOrganizationService.approveOrganization(emailReq.getEmail());
    }

    @GetMapping("/organization/findAll")
    public ResponseEntity<?> findAll()
    {
        return iOrganizationService.findAll();
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

}
