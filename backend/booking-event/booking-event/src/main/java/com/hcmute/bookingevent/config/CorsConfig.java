package com.hcmute.bookingevent.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class CorsConfig {

    @Value("#{'${allowed.origins}'.split(',')}")
    private List<String> allowedOriginList;

    @Bean
    public WebMvcConfigurer getCorsConfiguration(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(getOrigin())
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true)
                        .allowedHeaders("*");
            }
        };
    }
    public String[] getOrigin() {
        int size = allowedOriginList.size();
        String[] originArray = new String[size];
        return allowedOriginList.toArray(originArray);
    }
}