package com.hcmute.bookingevent.services;


import com.hcmute.bookingevent.Implement.IEventSlugGeneratorService;

import com.hcmute.bookingevent.models.event.EventSlug;
import com.hcmute.bookingevent.repository.EventSlugGeneratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.hcmute.bookingevent.utils.Utils.toSlug;

@Service
@RequiredArgsConstructor
public class EventSlugGeneratorService implements IEventSlugGeneratorService {

    private final EventSlugGeneratorRepository sequenceGeneratorRepository;

    @Override
    public String generateSlug(String slug) {
        EventSlug eventSlug = sequenceGeneratorRepository.findById(slug)
                .orElse(new EventSlug(slug, toSlug(slug)));
        String sequence = eventSlug.getSlug();
        return sequence;
    }
}
