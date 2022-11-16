package com.hcmute.bookingevent.repository;

import com.hcmute.bookingevent.models.organization.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrganizationRepository extends MongoRepository<Organization,String> {
    void deleteByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<Organization> findByEmail(String email);
    Optional<Organization> findOrganizationById(String id);


}
