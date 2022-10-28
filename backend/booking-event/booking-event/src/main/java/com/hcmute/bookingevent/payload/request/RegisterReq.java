package com.hcmute.bookingevent.payload.request;

import com.hcmute.bookingevent.models.role.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
public class RegisterReq {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Password is required")
    @Size( min = 6, max = 100)
    private String password;
    @NotBlank
    @Email(message = "Email invalidate")
    private String email;
    @NotBlank(message = "Role is required")
    private String role;
}
