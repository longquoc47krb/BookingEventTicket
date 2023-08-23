package com.example.kafka.controller;

import com.example.kafka.entity.Account;
import com.example.kafka.entity.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class KafkaController {
    @Autowired
    KafkaTemplate<String,Object> kafkaTemplate;
    @PostMapping("/newAccount")
    public Account createAccount(@RequestBody Account account)
    {
        //Account account = new Account("anhtuan","anhtuan@gmail.com");
        kafkaTemplate.send("notification",account);
        System.out.println("Posted to kafka notification");
        return account;
    }
    @PostMapping("/newStatistics")
    public Statistics createStatistics(@RequestBody Statistics statistics)
    {
        //Account account = new Account("anhtuan","anhtuan@gmail.com");
        kafkaTemplate.send("statistic",statistics);
        System.out.println("Posted to kafka statistic");
        return statistics;
    }
//    @GetMapping("/newAccount_test")
//    public Statistics createAccount_test()
//    {
//        //Account account = new Account("anhtuan","anhtuan@gmail.com");
//        kafkaTemplate.send("statistic",statistics);
//        System.out.println("Posted to kafka statistic");
//        return statistics;
//    }
}
