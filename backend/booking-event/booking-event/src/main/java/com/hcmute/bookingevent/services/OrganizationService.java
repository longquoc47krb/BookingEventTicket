package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.models.organization.EOrganization;
import com.hcmute.bookingevent.payload.request.OrganizationReq;
import com.hcmute.bookingevent.payload.response.MessageResponse;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationService implements IOrganizationService {

    private final OrganizationRepository organizationRepository;
    private final AccountRepository accountRepository;
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

    @Override
    public ResponseEntity<?> submitOrganization(OrganizationReq organizationReq)
    {
        if (accountRepository.existsByEmail(organizationReq.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!",400));
        }

        if (accountRepository.existsByPhone(organizationReq.getPhoneNumber())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Phone: Phone is already in use!",400));
        }

        Account account = new Account(organizationReq.getName(),organizationReq.getEmail(),organizationReq.getPhoneNumber(),"", Constants.AVATAR_DEFAULT,Constants.ROLE_ORGANIZATION);
        accountRepository.save(account);
        Organization organization = new Organization(account.getEmail(), EOrganization.DISABLED);
        organizationRepository.save(organization);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create organization account successfully", "",200));
    }
}
