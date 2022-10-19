package com.hcmute.bookingevent.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    @NotBlank
    private String token;
    @NotBlank
    private String name;

    private String email;
    //@NotBlank
    private List<String> roles;
    private String message;

}
