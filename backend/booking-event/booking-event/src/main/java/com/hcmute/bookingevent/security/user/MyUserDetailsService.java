package com.hcmute.bookingevent.security.user;


import com.hcmute.bookingevent.models.Account;
import com.hcmute.bookingevent.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService{
   // @Autowired
    private final AccountRepository accountRepository;


    @Override
    //@Transactional(rollbackFor = Exception.class)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //System.out.println("Email : "+ email);
        Account user = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return UserDetailsImpl.build(user);
    }
}