package com.hcmute.bookingevent.Implement;

import com.hcmute.bookingevent.models.Organization;
import org.springframework.http.ResponseEntity;

public interface IOrganizationService {
     ResponseEntity<?> createOrganization(Organization organization);
}
