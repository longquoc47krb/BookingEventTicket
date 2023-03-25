package com.hcmute.bookingevent.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowedListRes {
    private String name;
    private String email;

}
