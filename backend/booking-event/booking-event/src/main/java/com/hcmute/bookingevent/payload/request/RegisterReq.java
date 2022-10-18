package com.hcmute.bookingevent.payload.request;

import com.hcmute.bookingevent.models.role.Role;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Data
public class RegisterReq {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String email;
    //private Set<String> roles = new HashSet<>();
    private String role;
}
