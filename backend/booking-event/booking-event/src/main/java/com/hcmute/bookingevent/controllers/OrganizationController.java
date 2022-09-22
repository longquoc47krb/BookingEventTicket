package com.hcmute.bookingevent.controllers;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.ResponseObject;
import com.hcmute.bookingevent.responsitory.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/organization")
public class OrganizationController {
    @Autowired
    OrganizationRepository organizationRepository;

    @PostMapping("/newEvent")
    public ResponseEntity<ResponseObject> testCreateOrganization()
    {

        Event event = new Event("ev_1","to chuc A","55555 address", "1:00","3:00","host","01","No Description","No Background",300,150);
        List<Event> eventList =new ArrayList<Event>();
        eventList.add(event);
        Organization s = new Organization("001","1234 address", eventList);
        //organizationRepository.save(s);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Save data successfully ",  organizationRepository.save(s))
        );

    }

}
