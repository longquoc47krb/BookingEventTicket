package com.hcmute.bookingevent.payload.response;

import com.hcmute.bookingevent.models.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizerResponse {
    private String id;
    private String name;
    private String avatar;
    private String role;
    private String email;
    private String biography;
}
