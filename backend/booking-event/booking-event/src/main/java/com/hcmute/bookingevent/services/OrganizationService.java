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
import com.hcmute.bookingevent.services.mail.EMailType;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final MailService mailService;

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

    @SneakyThrows
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
        // gửi mail
        mailService.sendMail(account, "", EMailType.BECOME_ORGANIZATION);

        //
        Organization organization = new Organization(account.getEmail(), EOrganization.DISABLED);
        organizationRepository.save(organization);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create organization account successfully", "",200));
    }
    @Override
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<Organization> organizations = organizationRepository.findAll(pageable);
        List<Organization> organizationList = organizations.toList();
        if (organizationList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all user success", organizationList,200));
        throw new NotFoundException("Can not find any organization");
    }
    // tài khoản chỉ đc xóa tại thời điểm xét duyệt
    @Override
    public ResponseEntity<?> deleteOrganization(String email) {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        if (organization.isPresent()) {
            organizationRepository.deleteByEmail(email);
            accountRepository.deleteByEmail(email);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Delete organization account successfully ", "",200));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Delete account fail with email:" + email, "",404));
        }

    }
}
