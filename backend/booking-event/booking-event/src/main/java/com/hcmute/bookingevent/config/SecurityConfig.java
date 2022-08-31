package com.hcmute.bookingevent.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors();
        http.authorizeRequests().anyRequest().permitAll();
//        http.authorizeRequests().antMatchers("/login").permitAll()
//                .antMatchers("/users/**", "/settings/**").hasAuthority("Admin")
//                .hasAnyAuthority("Admin", "Editor", "Salesperson")
//                .hasAnyAut.anyRequest().authenticated()
//                .and().formLogin()
//                .loginPage("/login")
//                .usernameParameter("email")
//                .permitAll()
//                .and()
//                .rememberMe().key("AbcdEfghIjklmNopQrsTuvXyz_0123456789")
//                .and()
//                .logout().permitAll();
//
//        http.headers().frameOptions().sameOrigin();

        return http.build();
    }
}


