package com.hcmute.bookingevent.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotFoundException extends RuntimeException{
    private String message;
}
