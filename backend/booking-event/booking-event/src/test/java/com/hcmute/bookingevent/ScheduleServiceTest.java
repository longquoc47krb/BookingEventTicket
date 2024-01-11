package com.hcmute.bookingevent;


import com.hcmute.bookingevent.services.scheduler.Scheduler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.TaskScheduler;

import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import java.util.Date;


@SpringBootTest
public class ScheduleServiceTest {
    @Autowired
    private  ThreadPoolTaskScheduler threadPoolTaskScheduler;
    @Test
    void scheduler()
    {

        TaskScheduler taskScheduler = threadPoolTaskScheduler;
        Scheduler scheduler = new Scheduler(taskScheduler);
        scheduler.reSchedule("test");
    }
    @Test
    void scheduler2()
    {
        System.out.println(new Date(System.currentTimeMillis() + 3000));

    }
}
