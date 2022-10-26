package com.hcmute.bookingevent;

import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@RequiredArgsConstructor

class BookingEventApplicationTests {
	@Autowired
	private OrganizationRepository organizationRepository;
	private final PasswordEncoder encoder = new PasswordEncoder() {
		@Override
		public String encode(CharSequence rawPassword) {
			return null;
		}

		@Override
		public boolean matches(CharSequence rawPassword, String encodedPassword) {
			return false;
		}
	};
	@Test
	void contextLoads() {

		encoder.matches("123456", "$2a$11$2oTT9dlV5vEo6YNOSVWob.EyH0H3x4thwQ8Gjab7X3tyPxYROShc2");
	}
	@Test
	void testPasswords()
	{
		//Boolean check =  encoder.matches("123456", "$2a$10$RSA7Y6LAGqQFEffJ1C8S7OEyGi3P6EESjHtzbNqAGyRZ.4TWtAmI6");
		System.out.println(encoder.matches("123456", "$2a$11$2oTT9dlV5vEo6YNOSVWob.EyH0H3x4thwQ8Gjab7X3tyPxYROShc2"));
	}
}
