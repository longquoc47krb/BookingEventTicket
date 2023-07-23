package com.hcmute.bookingevent.models.account;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hcmute.bookingevent.models.OTP.OTP;
import com.hcmute.bookingevent.models.account.EAccount;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;


@Document("account")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    private String id;
    @NotBlank(message = "Name is required")
    private String name;
    //@Nullable
    //@Indexed(unique = true)
    private String phone;
    @NotBlank(message = "Email is required")
    @Size(max = 100)
    @Email(message = "Email is invalidate")
    @Indexed(unique = true)
    private String email;
    private String avatar;
    @JsonIgnore
    private String passWord;
    @NotBlank(message = "Role is required")
    private String role;
    private OTP otp;
    private Date loginTime;
    private EAccount loginType;
    public Account(String name,  String email,String passWord, String avatar) {

        this.name = name;
        this.email = email;
        this.passWord = passWord;
        this.avatar = avatar;
    }
    public Account(String name,  String email,String passWord, String avatar,String role) {

        this.name = name;
        this.email = email;
        this.passWord = passWord;
        this.avatar = avatar;
        this.role = role;
    }
    public Account(String name,  String email, String phone,String passWord, String avatar,String role) {
        this.name = name;
        this.email = email;
        this.phone= phone;
        this.passWord = passWord;
        this.avatar = avatar;
        this.role = role;
    }
    public Account(OTP otp)
    {
        this.otp = otp;
    }
    public Account(String avatar) {
        this.avatar = avatar;
    }


}
