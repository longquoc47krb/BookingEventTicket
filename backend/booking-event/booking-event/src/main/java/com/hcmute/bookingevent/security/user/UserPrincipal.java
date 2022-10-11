package com.hcmute.bookingevent.security.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.Account;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {

    private int id;
    @JsonIgnore
    private String username;
    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(int id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(Account account) {
        Set<Role> roles = account.getRole();
        List<GrantedAuthority> authorities = roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

        return new UserPrincipal(account.getId(), account.getUserName(), account.getPassWord(), authorities);
    }
}