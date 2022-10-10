package com.hcmute.bookingevent.utils;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.responsitory.EventRepository;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class DateUtils {

    public static List<Event> sortEventByDateAsc(EventRepository eventRepository) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Comparator<Event> comparator = Comparator.comparing(events -> LocalDate.parse(events.getStartingDate(), formatter));
        List<Event> eventList = eventRepository.findAll().stream().sorted(comparator).collect(Collectors.toList());
        return eventList;
    }
}
