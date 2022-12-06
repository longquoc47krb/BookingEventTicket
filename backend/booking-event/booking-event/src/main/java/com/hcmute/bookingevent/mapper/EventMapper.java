package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.payload.response.EventOrderViewResponse;
import com.hcmute.bookingevent.payload.response.EventViewResponse;
import com.hcmute.bookingevent.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventMapper {
    private final EventRepository eventRepository;

    public EventViewResponse toEventRes(Event event) {
        return new EventViewResponse(event.getId(), event.getName(),event.getProvince(),event.getVenue(), event.getStartingTime(),event.getEndingTime(),
                event.getStartingDate(),event.getEndingDate(),event.getBackground(),event.getStatus(),event.getEventCategoryList(), event.getOrganizationTickets(),event.getTicketTotal(),event.getTicketRemaining());
    }
    public EventViewResponse toEventTicket(String idEvent) {
        Optional<Event> event= eventRepository.findEventById(idEvent);
        if(event.isPresent())
        {
            return new EventViewResponse(event.get().getId(), event.get().getName(),event.get().getProvince(),event.get().getVenue(), event.get().getStartingTime(),event.get().getEndingTime(),
                    event.get().getStartingDate(),event.get().getEndingDate(),event.get().getBackground(),event.get().getStatus(),event.get().getEventCategoryList(), event.get().getOrganizationTickets(),event.get().getTicketTotal(),event.get().getTicketRemaining());

        }
       throw new NotFoundException("Can not find any event");
    }
    public EventOrderViewResponse toEventOrder(String eventId){
        Optional<Event> event= eventRepository.findEventById(eventId);
        if(event.isPresent())
        {
            return new EventOrderViewResponse(event.get().getId(),event.get().getName(),event.get().getStartingDate(),event.get().getEndingDate(),event.get().getBackground(),event.get().getStatus(), event.get().getTicketTotal(),event.get().getTicketRemaining(),event.get().getCreatedDate(),event.get().getUpdatedDate(), event.get().getEventCategoryList(), event.get().getOrganizationTickets());

        }
        throw new NotFoundException("Can not find any event");

    }
//    public Event toCreateEvent(EventReq eventReq) {
//        return new Event(eventReq.getName(),eventReq.getProvince(),eventReq.getVenue(),eventReq.getVenue_address(),eventReq.getStartingTime(),
//                eventReq.getEndingTime(),eventReq.getStartingDate(),eventReq.getEndingDate(),eventReq.getHost_id(),eventReq.getDescription()
//        ,eventReq.getBackground(),eventReq.getEventCategoryList(),eventReq.getOrganizationTickets());
//
//    }
}
