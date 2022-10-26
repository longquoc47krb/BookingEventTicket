package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.payload.response.LoginRes;
import org.springframework.stereotype.Service;

@Service
public class AccountMapper {
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
}
