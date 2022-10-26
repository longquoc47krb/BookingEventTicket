package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService implements IOrganizationService {

    private final OrganizationRepository organizationRepository;

    public ResponseEntity<?> createOrganization(Organization organization){

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create Organization successfully ", organizationRepository.save(organization),200));

    }

    @Override
    public ResponseEntity<?> findAll()
    {
        List<Organization> list = organizationRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Account", list,200));
        throw new NotFoundException("Can not found any Organization");
    }
}
