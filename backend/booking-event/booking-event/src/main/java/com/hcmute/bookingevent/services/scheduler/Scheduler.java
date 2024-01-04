package com.hcmute.bookingevent.services.scheduler;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.TaskScheduler;


import java.util.Date;
@AllArgsConstructor
public class Scheduler {
    private TaskScheduler taskScheduler;
    public void reSchedule(String cronExpressionStr) {
        taskScheduler.schedule(
                new RunnableTask("Specific time, 3 Seconds from now"),
                new Date(System.currentTimeMillis() + 3000)
        );
    }
}
