package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.IOrganizationService;
import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.mapper.EventMapper;
import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.models.organization.EOrganization;
import com.hcmute.bookingevent.payload.request.OrganizationSubmitReq;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.payload.response.MessageResponse;
import com.hcmute.bookingevent.payload.response.OrganizerResponse;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationService implements IOrganizationService {

    private final OrganizationRepository organizationRepository;
    private final AccountRepository accountRepository;
    private final MailService mailService;
    private final EventMapper eventMapper;
    private final PasswordEncoder encoder;

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
        throw new NotFoundException("Can not find any Organization");
    }
    @Override
    public ResponseEntity<?> findEventsByOrganization(String email)
    {
        try
        {
            Optional<Organization> organization = organizationRepository.findByEmail(email);
            if(organization.isPresent())
            {
                // ds các id
                List<String> eventList= organization.get().getEventList();
                List<EventViewResponse> eventViewResponses= eventList.stream().map(eventMapper::toEventTicket ).collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Get all ticket", eventViewResponses,200));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Organization has no exist", "",200));
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "",400));
        }
    }
    @Override
    public ResponseEntity<?> findOrganizationById(String id)
    {
        try
        {
            Optional<Account> account = accountRepository.findById(id);
            Optional<Organization> organization = organizationRepository.findByEmail(account.get().getEmail());
            if(organization.isPresent())
            {
                // ds các id
                OrganizerResponse organizerResponse = new OrganizerResponse(account.get().getId(),account.get().getName(),account.get().getAvatar(),organization.get().getEmail(),organization.get().getBiography());

                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(true, "Get Organization successfully", organizerResponse,200));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(false, "Organization has no exist", "",400));
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject(true, e.getMessage(), "",400));
        }
    }
    @SneakyThrows
    @Override
    public ResponseEntity<?> submitOrganization(OrganizationSubmitReq organizationSubmitReq)
    {
        if (accountRepository.existsByEmail(organizationSubmitReq.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!",400));
        }

        if (accountRepository.existsByPhone(organizationSubmitReq.getPhoneNumber())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Phone: Phone is already in use!",400));
        }

        Account account = new Account(organizationSubmitReq.getName(), organizationSubmitReq.getEmail(), organizationSubmitReq.getPhoneNumber(),"", Constants.AVATAR_DEFAULT,Constants.ROLE_ORGANIZATION);
        accountRepository.save(account);
        // gửi mail
        mailService.sendMail(account, "", EMailType.BECOME_ORGANIZATION);

        //
        Organization organization = new Organization(account.getEmail(), EOrganization.DISABLED);
        organizationRepository.save(organization);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(true, "Create organization account successfully", "",200));
    }
    @SneakyThrows
    @Override
    public ResponseEntity<?> approveOrganization(String email)
    {
        Optional<Organization> organization = organizationRepository.findByEmail(email);
        Optional<Account> account = accountRepository.findByEmail(email);
        if(account.isPresent() && organization.isPresent())
        {
            String randomPassword = Constants.getAlphaNumericString(8);
            account.get().setPassWord(encoder.encode(randomPassword));
            accountRepository.save(account.get());
            organization.get().setStatus(EOrganization.ACCEPTED);
            mailService.sendMail(account.get(), randomPassword, EMailType.OFFICIAL_ORGANIZATION);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create organization account successfully", "",200));

        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject(false, "Request is not valid", "",400));

        }

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

    @Override
    public ResponseEntity<?> addBio(String bio, String email) {
        Optional<Organization> organization =  organizationRepository.findByEmail(email);
        if(organization.isPresent()) {
            organization.get().setBiography(bio);
            organizationRepository.save(organization.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Add bio successfully ", "", 200));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Add bio failed", "",404));
        }

    }

    @Override
    public ResponseEntity<?> removeBio(String email) {
        Optional<Organization> organization =  organizationRepository.findByEmail(email);
        if(organization.isPresent()) {
            organization.get().setBiography("");
            organizationRepository.save(organization.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Remove bio successfully ", "", 200));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(false, "Remove bio failed", "",404));
        }
    }
}
