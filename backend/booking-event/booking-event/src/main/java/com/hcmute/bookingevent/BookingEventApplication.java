package com.hcmute.bookingevent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.hcmute.bookingevent.utils.Utils.toSlug;

@EnableSwagger2
@SpringBootApplication
public class BookingEventApplication {

	public static void main(String[] args) {
		String test = toSlug("[YÊN | HOÀNG DŨNG Bước qua cơn Đau");
		System.out.println(test);
		SpringApplication.run(BookingEventApplication.class, args);
	}

}
