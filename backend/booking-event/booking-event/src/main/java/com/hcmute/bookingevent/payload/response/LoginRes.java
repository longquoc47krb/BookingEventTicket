package com.hcmute.bookingevent.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRes {
    private String id;
    private String name;
    private String phone;
    private String email;
    private String avatar;
    private String role;
    private String token;

}
