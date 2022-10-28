package com.hcmute.bookingevent.payload.request;

import com.hcmute.bookingevent.models.role.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Data
public class RegisterReq {
    @NotBlank
    private String name;
    @NotBlank
    private String password;
    @NotBlank
    @Email(message = "Email invalidate")
    private String email;
    //private Set<String> roles = new HashSet<>();
    private String role;
}
