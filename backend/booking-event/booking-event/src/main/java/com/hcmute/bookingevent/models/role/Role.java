package com.hcmute.bookingevent.models.role;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Document( "roles")
@Getter
@Setter
public class Role {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

//    @Enumerated(EnumType.STRING)
//    @Column(length = 20)
    private ERole name;

    public Role() {

    }

    public Role(ERole name) {
        this.name = name;
    }

//    public Integer getId() {
//        return id;
//    }

    public void setId(String id) {
        this.id = id;
    }

//    public ERole getName() {
//        return name;
//    }

    public void setName(ERole name) {
        this.name = name;
    }
}