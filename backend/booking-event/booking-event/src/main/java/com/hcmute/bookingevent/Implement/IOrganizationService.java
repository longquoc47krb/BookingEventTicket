package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.request.OrganizationReq;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface IOrganizationService {
     ResponseEntity<?> createOrganization(Organization organization);
     ResponseEntity<?> findAll();
     ResponseEntity<?> submitOrganization(OrganizationReq organizationReq);
     ResponseEntity<?> findAll(Pageable pageable);
     ResponseEntity<?> deleteOrganization(String email);
}
