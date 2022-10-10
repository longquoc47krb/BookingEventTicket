package com.hcmute.bookingevent.services;


import com.hcmute.bookingevent.Implement.ISequenceGeneratorService;
import com.hcmute.bookingevent.models.DatabaseSequence;
import com.hcmute.bookingevent.responsitory.SequenceGeneratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.hcmute.bookingevent.utils.Utils.toSlug;

@Service
@RequiredArgsConstructor
public class SequenceGeneratorService implements ISequenceGeneratorService {

    private final SequenceGeneratorRepository sequenceGeneratorRepository;

    @Override
    public String generateSequence(String sequenceName) {
        DatabaseSequence databaseSequence = sequenceGeneratorRepository.findById(sequenceName)
                .orElse(new DatabaseSequence(sequenceName, toSlug(sequenceName)));
        String sequence = databaseSequence.getSequence();
        sequenceGeneratorRepository.save(databaseSequence);
        return sequence;
    }
}
