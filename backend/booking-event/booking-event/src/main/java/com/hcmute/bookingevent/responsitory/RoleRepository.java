package com.hcmute.bookingevent.responsitory;


import com.hcmute.bookingevent.models.role.ERole;
import com.hcmute.bookingevent.models.role.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role,String> {
    Optional<Role> findByName(ERole name);
}
