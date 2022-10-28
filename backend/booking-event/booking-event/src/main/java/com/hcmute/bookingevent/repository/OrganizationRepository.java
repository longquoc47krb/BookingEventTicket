package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrganizationRepository extends MongoRepository<Organization,String> {
    void deleteByEmail(String email);
}
