package com.hcmute.bookingevent.exception;

import lombok.Data;

@Data
public class ExceptionRes {
    private int status;
    private Object message;
    private boolean success;

    public ExceptionRes(int status, Object message) {
        this.status = status;
        this.message = message;
        this.success = false;
    }
}
