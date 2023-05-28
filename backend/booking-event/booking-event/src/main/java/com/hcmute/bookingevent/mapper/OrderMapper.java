package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.payload.response.AllOrganizationRes;
import com.hcmute.bookingevent.payload.response.CustomerListRes;
import com.hcmute.bookingevent.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@AllArgsConstructor
@Service
public class OrderMapper {
    private final AccountRepository accountRepository;

    public Account toAccount(Order order)
    {
        Optional<Account>account =  accountRepository.findByEmail(order.getEmail());
        return account.get();

    }
}
