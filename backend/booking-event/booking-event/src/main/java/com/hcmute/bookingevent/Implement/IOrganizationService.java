package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.request.OrganizationReq;
import org.springframework.http.ResponseEntity;

public interface IOrganizationService {
     ResponseEntity<?> createOrganization(Organization organization);
     ResponseEntity<?> findAll();
     ResponseEntity<?> submitOrganization(OrganizationReq organizationReq);
}
