package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.request.OrganizationReq;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/organization")
public class OrganizationController {
    IOrganizationService iOrganizationService;

    @PostMapping("/createOrganization")
    public ResponseEntity<?> createOrganization(@RequestBody Organization organization)
    {
        return iOrganizationService.createOrganization(organization);
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll()
    {
        return iOrganizationService.findAll();
    }
    @PostMapping("/submit")
    public ResponseEntity<?> submitOrganization(@RequestBody OrganizationReq organizationReq)
    {
        return iOrganizationService.submitOrganization(organizationReq);
    }
}
