package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.payload.response.AllOrganizationRes;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.payload.response.LoginRes;
import com.hcmute.bookingevent.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationMapper {
    private final AccountRepository accountRepository;
    public AllOrganizationRes toOrganizationRes(Organization organization) {
        Optional<Account> account= accountRepository.findByEmail(organization.getEmail());
        if(account.isPresent())
        {
            return new AllOrganizationRes(account.get().getName(),organization);
        }
        return new AllOrganizationRes();
    }
}
