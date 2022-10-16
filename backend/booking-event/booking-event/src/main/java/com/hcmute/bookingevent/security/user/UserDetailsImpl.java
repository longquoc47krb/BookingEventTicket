package com.hcmute.bookingevent.security.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private final String username;

    private final String email;

    @JsonIgnore
    private String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities) {

        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(Account user) {
        // have problem
//        List<GrantedAuthority> authorities = user.getRoles().stream()
//                .map(role -> new SimpleGrantedAuthority(role.toString()))
//                .collect(Collectors.toList());
       GrantedAuthority authorities = new SimpleGrantedAuthority( user.getRole());
        //GrantedAuthority authorities = Collections.singleton(new SimpleGrantedAuthority(user.getRole()));

        return new UserDetailsImpl(
                user.getUserName(),
                user.getEmail(),
                user.getPassWord(),
                Collections.singleton(authorities));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    //@Override
    public String getEmail() {
        return email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    //
}