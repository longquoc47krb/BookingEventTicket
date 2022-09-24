package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.OrganizationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/organization")
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
}
