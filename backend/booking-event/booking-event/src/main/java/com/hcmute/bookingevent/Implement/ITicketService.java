package com.hcmute.bookingevent.Implement;

import org.springframework.http.ResponseEntity;

public interface ITicketService {
    ResponseEntity<?> findAll();
}
