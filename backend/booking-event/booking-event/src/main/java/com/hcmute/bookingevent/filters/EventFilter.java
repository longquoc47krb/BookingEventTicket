package com.hcmute.bookingevent.filters;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventFilter {
    private String province;
    private String categoryId;
    private String status;
    private Date date;
}
