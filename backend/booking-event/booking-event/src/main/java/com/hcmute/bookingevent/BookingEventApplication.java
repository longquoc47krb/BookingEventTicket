package com.hcmute.bookingevent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


import java.text.ParseException;


@EnableSwagger2
@SpringBootApplication
public class BookingEventApplication {


	public static void main(String[] args) throws ParseException {
		SpringApplication.run(BookingEventApplication.class, args);
	}

}
