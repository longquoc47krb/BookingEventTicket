package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.payload.response.FollowedListRes;
import com.hcmute.bookingevent.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class CustomerMapper {
    private final AccountRepository accountRepository;

    public FollowedListRes toFollowedListRes(Customer customer) {
        Optional <Account> account = accountRepository.findByEmail(customer.getEmail());
        return new FollowedListRes(account.get().getName(),customer.getEmail());
    }
}
