package com.hcmute.bookingevent.models;


import com.hcmute.bookingevent.models.OTP.OTP;
import com.hcmute.bookingevent.models.account.EAccount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    private String id;

    private String name;
    //@Nullable
    //@Indexed(unique = true)
    private String phone;
    //@Indexed(unique = true)
    private String email;
    private String avatar;

    private String passWord;
    private String role;
    private OTP otp;
    private EAccount loginType;
    //private String resetPasswordToken;
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
    public Account(OTP otp)
    {
        this.otp = otp;
    }


}
