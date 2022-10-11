package com.hcmute.bookingevent.utils;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.responsitory.EventRepository;

import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class DateUtils {

    public static List<Event> sortEventByDateAsc(EventRepository eventRepository) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Comparator<Event> comparator = Comparator.comparing(events -> LocalDate.parse(events.getStartingDate(), formatter));
        List<Event> eventList = eventRepository.findAll().stream().sorted(comparator).collect(Collectors.toList());
        return eventList;
    }
    /**
     * get current time
     *
     * @param dateFormat time format
     * @return converted time format
     */
    public static String getStringToday(String dateFormat) {
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        String dateString = formatter.format(currentTime);
        return dateString;
    }

    /**
     * Convert string date to date
     *
     * @param dateStr string date
     * @param dateFormat date format
     * @return
     */
    public static Date stringToDate(String dateStr, String dateFormat) {
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        try {
            return formatter.parse(dateStr);
        } catch (ParseException e) {
            return null;
        }
    }

    /**
     * date to string
     *
     * @param date
     * @param dateFormat
     * @return
     */
    public static String dateToString(Date date, String dateFormat) {
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        return formatter.format(date);
    }

    /**
     * The interval between two time points (minutes)
     *
     * @param before start time
     * @param after end time
     * @return the interval between two time points (minutes)
     */
    public static long compareMin(Date before, Date after) {
        if (before == null || after == null) {
            return 0l;
        }
        long dif = 0;
        if (after.getTime() >= before.getTime()) {
            dif = after.getTime() - before.getTime();
        } else if (after.getTime() < before.getTime()) {
            dif = after.getTime() + 86400000 - before.getTime();
        }
        dif = Math.abs(dif);
        return dif / 60000;
    }
    public static boolean isAfterToday(String date ){
        Date today = new Date();
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date startDate = null;
        try {
            startDate = formatter.parse(date);
            if(startDate.after(today)){
                return true;
            }
            return false;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    /**
     * Get the time after the specified interval in minutes
     *
     * The time specified by @param date
     * @param min interval minutes
     * @return time after interval minutes
     */
    public static Date addMinutes(Date date, int min) {
        if (date == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MINUTE, min);
        return calendar.getTime();
    }

    /**
     * Return to the specified term according to the time, entertain yourself, and adjust it yourself
     *
     * @param hourday hour
     * @return
     */
    public static String showTimeView(int hourday) {
        if (hourday >= 22 && hourday <= 24) {
            return "night";
        } else if (hourday >= 0 && hourday <= 6) {
            return "early morning";
        } else if (hourday > 6 && hourday <= 12) {
            return "AM";
        } else if (hourday > 12 && hourday < 22) {
            return "afternoon";
        }
        return null;
    }
}
