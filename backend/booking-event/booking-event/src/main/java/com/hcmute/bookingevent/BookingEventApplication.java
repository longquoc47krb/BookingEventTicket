package com.hcmute.bookingevent;

import com.hcmute.bookingevent.models.account.Account;

import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.context.support.WebApplicationContextUtils;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


import java.text.ParseException;
import java.util.Arrays;


@EnableSwagger2
@SpringBootApplication
public class BookingEventApplication {


	public static void main(String[] args) throws ParseException {
		//SpringApplication.run(BookingEventApplication.class, args);
		//AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BookingEventApplication.class);
		AnnotationConfigApplicationContext  applicationContext = new AnnotationConfigApplicationContext(BookingEventApplication.class);

		String[] beanNames = applicationContext.getBeanDefinitionNames();
		for (String beanName : beanNames) {
			System.out.println(beanName);
		}

	}


}
