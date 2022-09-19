package com.hcmute.bookingevent.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseObject {
    private boolean isSuccess;
    private String message;
    private Object data;

}