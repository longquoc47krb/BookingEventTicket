package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.request.OrganizationReq;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api")
public class OrganizationController {
    IOrganizationService iOrganizationService;

    @GetMapping(path = "/admin/get/organizations")
    public ResponseEntity<?> findAllOrganization (@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,@RequestParam(value="pageSize", defaultValue = "5") int pageSize   ){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        return iOrganizationService.findAll(pageable);
    }
    @DeleteMapping(path = "/admin/delete/organization/{email}")
    public ResponseEntity<?> deleteOrganizationAccount(@PathVariable String email) {
        return iOrganizationService.deleteOrganization(email);

    }
    @PostMapping("/organization/createOrganization")
    public ResponseEntity<?> createOrganization(@RequestBody Organization organization)
    {
        return iOrganizationService.createOrganization(organization);
    }
    @GetMapping("/organization/findAll")
    public ResponseEntity<?> findAll()
    {
        return iOrganizationService.findAll();
    }
    @PostMapping("/organization/submit")
    public ResponseEntity<?> submitOrganization(@RequestBody OrganizationReq organizationReq)
    {
        return iOrganizationService.submitOrganization(organizationReq);
    }
}
