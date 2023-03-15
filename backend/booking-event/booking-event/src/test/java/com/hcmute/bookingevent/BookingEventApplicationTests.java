package com.hcmute.bookingevent;

import com.hcmute.bookingevent.services.PaymentService;
import com.hcmute.bookingevent.models.Admin;
import com.hcmute.bookingevent.models.EPaymentStatus;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.organization.PaymentPending;
import com.hcmute.bookingevent.repository.AdminRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@RequiredArgsConstructor
class BookingEventApplicationTests {
	@Autowired
	private  OrganizationRepository organizationRepository;
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private PaymentService paymentService;

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
	@Test
	void setPaymentCompleted()
	{
		//Optional<Organization> organization = organizationRepository.findByEventList("amazing-show-trung-quan-idol---hien-thuc-15271");
		//System.out.println(organization.get().getPaymentPendings().size());
		List<Organization> organizationList = organizationRepository.findAll();

		for (Organization element : organizationList)
		{
			if(element.getEventList().contains("amazing-show-trung-quan-idol---hien-thuc-15271"))
			{
				for(PaymentPending elementPayment : element.getPaymentPendings())
				{
					if(elementPayment.getIdEvent().equals("amazing-show-trung-quan-idol---hien-thuc-15271"))
					{
						elementPayment.setStatus(EPaymentStatus.COMPLETED);
						organizationRepository.save(element);
						System.out.println("ket qua"+elementPayment.getStatus());
					}
				}
				return ;
			}
		}
	}
	@Test
	void setPaymentInProgress()
	{
		Optional<Organization> organization = organizationRepository.findByEmail("ramen@konoha.com");

		PaymentPending paymentPending = paymentService.setPaymentToInProgress("ha-noi-nhung-thanh-pho-mo-mang---summer-tour-2023-6421");
		organization.get().getPaymentPendings().add(paymentPending);

		organizationRepository.save(organization.get());

	}


	@Test
	void setPaymentCancel()
	{
		Optional<Organization> organization = organizationRepository.findByEmail("admin@amazingshow.com");

		//paymentMapper.setPaymentToCancel();
		List<PaymentPending> pendingList= organization.get().getPaymentPendings();
		paymentService.setPaymentToCancel(pendingList,"sai-gon-tren-nhung-dam-may---chillies-concert-tour-14063");
		organizationRepository.save(organization.get());
		System.out.println("ket qua");


	}
	@Test
	void testAdmin()
	{
//		Admin admin = new Admin();
//		admin.getUSDBalance();
		Optional<Admin> admin1= adminRepository.findByEmail("lotusticket.vn@gmail.com");
		//admin1.get().setUSDBalance("0");
		//admin1.get().setVNDBalance("0");
		admin1.get().setUSDPendingProfit("0");
		admin1.get().setVNDPendingProfit("0");

		adminRepository.save(admin1.get());
	}
	@Test
	void testDivision()
	{
		BigDecimal num1 = new BigDecimal("5.5");
		BigDecimal num2 = new BigDecimal("5");
		BigDecimal result = num1.divide(num2);
		result = result.setScale(2, RoundingMode.DOWN); // giới hạn số thập phân thành 2
		System.out.println(result); // Output: 3.33
	}
}
