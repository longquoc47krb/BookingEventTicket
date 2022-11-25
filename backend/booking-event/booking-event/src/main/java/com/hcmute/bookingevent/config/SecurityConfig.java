package com.hcmute.bookingevent.config;

import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.filters.AuthTokenFilter;
import com.hcmute.bookingevent.models.role.ERole;
import com.hcmute.bookingevent.security.jwt.JwtAuthenticationEntryPoint;
import com.hcmute.bookingevent.security.oauth.CustomOAuth2UserService;
import com.hcmute.bookingevent.security.oauth.handlers.Failure;
import com.hcmute.bookingevent.security.oauth.handlers.Success;
import com.hcmute.bookingevent.security.user.MyUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
@Configuration
@EnableWebSecurity
@AllArgsConstructor

public class SecurityConfig {

    private final MyUserDetailsService customUserDetailService;


    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final CustomOAuth2UserService oauthUserService;
    private final Success successHandler;

    private final String[] ALLOWED_LIST_URLS = {
            // System
            "/api/auth/**",
            "/oauth2/**",
            "/login/**",
            "/payment/**",
            "/api/payment/**",
            // SwaggerUI
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/ws/**"
    };

    private final String[] ALLOWED_GET_LIST_URLS = {
            //"/api/event/**",
            //"/api/**",
            "/api/event/**",
            "/api/account/findAll",
            "/api/order/**",
            "/api/category/**",
            "/api/ticket/**",
            "/api/organization/findAll",
            "/api/organization/test/**"
            //"/api/ticket/**",
            //organizer
            //"/api/organization/**",
            //customer
            //"/api/customer/**",
            //admin
            //"/api/admin"

    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers(ALLOWED_LIST_URLS).permitAll()
                .and()
                .authorizeRequests().antMatchers( HttpMethod.GET,ALLOWED_GET_LIST_URLS).permitAll()
                .and()
                .authorizeRequests().antMatchers("/api/admin/**").hasAuthority(Constants.ROLE_ADMIN)
                .and().authorizeRequests().antMatchers("/api/customer/**").hasAuthority(Constants.ROLE_USER)
                .and().authorizeRequests().antMatchers("/api/organization/**").hasAuthority(Constants.ROLE_ORGANIZATION)
                .and()
                .authorizeRequests().antMatchers("/api/account/**").hasAnyAuthority(Constants.ROLE_USER,Constants.ROLE_ORGANIZATION)
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(oauthUserService)
                .and()
                .successHandler(successHandler)
                .failureHandler(authenticationFailureHandler())
                ;

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }


    @Bean
    public AuthenticationManager authenticationManager (
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(customUserDetailService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new Failure();
    }


}


