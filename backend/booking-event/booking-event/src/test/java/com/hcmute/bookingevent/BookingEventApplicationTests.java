package com.hcmute.bookingevent;

import com.hcmute.bookingevent.models.Event;
import com.hcmute.bookingevent.models.Organization;
import com.hcmute.bookingevent.responsitory.OrganizationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class BookingEventApplicationTests {
	@Autowired
	private OrganizationRepository organizationRepository;
	@Test
	void contextLoads() {
		Event event = new Event("ev_1","to chuc A","55555 address", LocalDateTime.now(),LocalDateTime.now(),"host","01","No Description","No Background",300,150);
		List<Event> eventList =new ArrayList<Event>();
		eventList.add(event);
		Organization organization = new Organization("001","1234 address", eventList);

	}

}
