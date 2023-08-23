package com.example.kafka.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig {
    @Bean
    NewTopic notification()
    {
        //topic name / partition/replication
        return new NewTopic("accounts",2,(short)1);

    }
    @Bean
    NewTopic statistic()
    {
        return new NewTopic("statistic",1,(short)1);
    }

}
