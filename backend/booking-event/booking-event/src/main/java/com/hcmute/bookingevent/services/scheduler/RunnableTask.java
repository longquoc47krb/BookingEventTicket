package com.hcmute.bookingevent.services.scheduler;

import lombok.AllArgsConstructor;

import lombok.extern.slf4j.Slf4j;


import java.util.Date;

@AllArgsConstructor
@Slf4j
public class RunnableTask implements Runnable{
    private String message;



    @Override
    public void run() {
        log.info(new Date()+" Runnable Task with "+message
                +" on thread "+Thread.currentThread().getName());
        System.out.println(new Date()+" Runnable Task with "+message
                +" on thread "+Thread.currentThread().getName());
    }
}
