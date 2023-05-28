package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.Order;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.payload.response.LoginRes;
import com.hcmute.bookingevent.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@AllArgsConstructor
@Service
public class AccountMapper {
    private final AccountRepository accountRepository;

    public LoginRes toLoginRes(Account account) {
        LoginRes loginRes = new LoginRes();
        if (account != null) {
            loginRes.setId(account.getId());
            loginRes.setName(account.getName());
            loginRes.setPhone(account.getPhone());
            loginRes.setEmail(account.getEmail());
            loginRes.setAvatar(account.getAvatar());
            loginRes.setRole(account.getRole());

        }
        return loginRes;
    }
    public Account toAccount(Customer customer)
    {
        Optional<Account>account =  accountRepository.findByEmail(customer.getEmail());
        return account.get();

    }
    public Account fromOrder(Order order)
    {
        Optional<Account>account =  accountRepository.findByEmail(order.getEmail());
        return account.get();

    }
}
