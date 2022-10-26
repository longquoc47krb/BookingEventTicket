package com.hcmute.bookingevent;

import com.hcmute.bookingevent.models.role.ERole;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import static com.hcmute.bookingevent.utils.DateUtils.isAfterToday;
import static com.hcmute.bookingevent.utils.Utils.toSlug;

@EnableSwagger2
@SpringBootApplication
//@SpringBootApplication(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
public class BookingEventApplication {

	public static void main(String[] args) throws ParseException {

		System.out.println(ERole.ROLE_USER);

		SpringApplication.run(BookingEventApplication.class, args);
	}

}
