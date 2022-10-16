package com.hcmute.bookingevent.security.user;


import java.util.ArrayList;
import java.util.List;

import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.responsitory.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//@Transactional(readOnly = true)
@Service
public class MyUserDetailsService implements UserDetailsService{
    @Autowired
    AccountRepository accountRepository;

    @Override
    //@Transactional(rollbackFor = Exception.class)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account user = accountRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }
}