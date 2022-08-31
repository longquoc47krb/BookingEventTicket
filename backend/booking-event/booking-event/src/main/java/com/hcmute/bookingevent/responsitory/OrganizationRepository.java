package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrganizationRepository extends MongoRepository<Organization,String> {

}
