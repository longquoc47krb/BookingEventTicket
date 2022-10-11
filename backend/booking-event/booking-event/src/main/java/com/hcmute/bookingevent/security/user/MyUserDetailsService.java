package com.hcmute.bookingevent.security.user;


import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


public class MyUserDetailsService implements UserDetailsService{
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        if(!"codertiensinh".equalsIgnoreCase(userName)) throw new UsernameNotFoundException("User name not found");
        String password = "a12345678";
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_TEACHER");
        authorities.add(authority);
        MyUserDetails userDetail = new MyUserDetails(userName, password, authorities);
        return userDetail;
    }
}