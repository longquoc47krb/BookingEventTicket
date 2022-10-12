package com.hcmute.bookingevent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
public class BookingEventApplication {

	public static void main(String[] args) throws ParseException {

		SpringApplication.run(BookingEventApplication.class, args);
	}

}
