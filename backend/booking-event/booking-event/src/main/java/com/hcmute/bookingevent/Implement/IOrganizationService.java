package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.payload.request.OrganizationSubmitReq;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface IOrganizationService {
     ResponseEntity<?> createOrganization(Organization organization);
     ResponseEntity<?> findAll();
     ResponseEntity<?> submitOrganization(OrganizationSubmitReq organizationSubmitReq);
     ResponseEntity<?> findAll(Pageable pageable);
     ResponseEntity<?> deleteOrganization(String email);
     ResponseEntity<?> findEventsByOrganization(String email);
     ResponseEntity<?> approveOrganization(String email);
     ResponseEntity<?> findOrganizationByEmail(String email);
     ResponseEntity<?> addBio(String bio,String email);
     ResponseEntity<?> removeBio(String email);
}
