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

import static com.hcmute.bookingevent.utils.Utils.toSlug;

@EnableSwagger2
@SpringBootApplication
public class BookingEventApplication {

	public static void main(String[] args) throws ParseException {
		String startDateString = "11/10/2022";

		// This object can interpret strings representing dates in the format MM/dd/yyyy
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");

		// Convert from String to Date
		Date startDate = df.parse(startDateString);

		System.out.println("Date in format dd/MM/yyyy: " + startDate);
		SpringApplication.run(BookingEventApplication.class, args);
	}

}
