package com.hcmute.bookingevent.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseObjectWithPagination {
    private boolean isSuccess;
    private String message;
    private int currentPage;
    private int pageSize;
    private int totalItems;
    private Object data;
}
