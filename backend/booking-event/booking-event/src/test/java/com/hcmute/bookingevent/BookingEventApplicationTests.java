package com.hcmute.bookingevent;

import com.hcmute.bookingevent.common.Constants;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.event.EventStatus;
import com.hcmute.bookingevent.models.organization.EOrganization;
import com.hcmute.bookingevent.repository.*;
import com.hcmute.bookingevent.services.PaymentService;
import com.hcmute.bookingevent.models.admin.Admin;
import com.hcmute.bookingevent.models.EPaymentStatus;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.organization.PaymentPending;
import lombok.RequiredArgsConstructor;

import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.hcmute.bookingevent.utils.DateUtils.isBeforeToday;
import static com.hcmute.bookingevent.utils.DateUtils.sortEventByDateAsc;

@SpringBootTest
@RequiredArgsConstructor
class BookingEventApplicationTests {
	@Autowired
	private  OrganizationRepository organizationRepository;
	@Autowired
	private  AccountRepository accountRepository;

	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private EventRepository eventRepository;
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

		PaymentPending paymentPending = paymentService.setPaymentToInProgress("sai-gon-tren-nhung-dam-may---chillies-concert-tour-14063");
		organization.get().getPaymentPendings().add(paymentPending);

		organizationRepository.save(organization.get());

	}


	@Test
	void setPaymentCancel()
	{
		Optional<Organization> organization = organizationRepository.findByEmail("admin@amazingshow.com");

		//paymentMapper.setPaymentToCancel();
//		List<PaymentPending> pendingList= organization.get().getPaymentPendings();
//		paymentService.setPaymentToCancel(pendingList,"sai-gon-tren-nhung-dam-may---chillies-concert-tour-14063");
//		organizationRepository.save(organization.get());
//		System.out.println("ket qua");


	}
	@Test
	void testAdmin()
	{
//		Admin admin = new Admin();
//		admin.getUSDBalance();
		Optional<Admin> admin1= adminRepository.findByEmail("lotusticket.vn@gmail.com");

		//admin1.get().setUSDBalance("0");
		//admin1.get().setVNDBalance("0");
		//admin1.get().setUSDPendingProfit("0");
		//admin1.get().setVNDPendingProfit("0");
		admin1.get().setUSDBalance("0");
		admin1.get().setVNDBalance("0");
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
	@Test
	void testAdminPayment() {
		//Optional<Admin> admin1= adminRepository.findByEmail("lotusticket.vn@gmail.com");
		Optional<Event> event = eventRepository.findEventById("sai-gon-tren-nhung-dam-may---chillies-concert-tour-14063");
		List<Organization> organizationList = organizationRepository.findAll();
		for (Organization element : organizationList) {
			if (element.getEventList().contains("sai-gon-tren-nhung-dam-may---chillies-concert-tour-14063")) {
				for (PaymentPending elementPayment : element.getPaymentPendings()) {
					if (elementPayment.getIdEvent().equals("sai-gon-tren-nhung-dam-may---chillies-concert-tour-14063")) {
						//get adminAccount
						Optional<Admin> admin = adminRepository.findByEmail("lotusticket.vn@gmail.com");
						elementPayment.setStatus(EPaymentStatus.COMPLETED);
						//devide 5
						BigDecimal num5 = new BigDecimal("5");
						BigDecimal num100 = new BigDecimal("100");

						if (event.get().getOrganizationTickets().get(0).getCurrency().equals("USD")) {
							BigDecimal totalPaymentOfOrganizerUSD = new BigDecimal(element.getUSDBalance());
							BigDecimal usdBlock = new BigDecimal(elementPayment.getUSDBalanceLock());
							BigDecimal addMoneyForAdmin = usdBlock.multiply(num5).divide(num100);
							//BigDecimal totalPendingUSD = new BigDecimal(admin.get().getUSDPendingProfit());
							//admin.get().setVNDPendingProfit(totalPendingUSD.subtract(usdBlock).toString());
							//add vào tài khoản admin
							admin.get().setVNDBalance(addMoneyForAdmin.toString());
							adminRepository.save(admin.get());
							//số tiền thực mà organizer nhận được
							BigDecimal subtractResult = usdBlock.subtract(addMoneyForAdmin);
							//cộng vào số dư sau khi đã trừ đi tiền mà admin nhận
							BigDecimal result = totalPaymentOfOrganizerUSD.add(subtractResult).setScale(2, RoundingMode.DOWN);
							element.setUSDBalance(result.toString());
						} else {
							BigDecimal totalPaymentOfOrganizerVND = new BigDecimal(element.getVNDBalance());
							BigDecimal vndBlock = new BigDecimal(elementPayment.getVNDBalanceLock());
							//lấy số khóa chia cho 5
							BigDecimal addMoneyForAdmin = vndBlock.multiply(num5).divide(num100);
							//trừ tiền pending profit của admin
							//BigDecimal totalPendingVND = new BigDecimal(admin.get().getVNDPendingProfit());
							//admin.get().setVNDPendingProfit(totalPendingVND.subtract(vndBlock).toString());
							//add vào tài khoản admin
							admin.get().setVNDBalance(addMoneyForAdmin.toString());
							adminRepository.save(admin.get());
							//số tiền thực mà organizer nhận được
							BigDecimal subtractResult = vndBlock.subtract(addMoneyForAdmin);
							//cộng vào số dư sau khi đã trừ đi tiền mà admin nhận
							BigDecimal result = totalPaymentOfOrganizerVND.add(subtractResult).setScale(2, RoundingMode.DOWN);
							element.setVNDBalance(result.toString());
						}
						organizationRepository.save(element);
					}
				}
				return;
			}
		}
	}
	@Test
	void testAddFollow()
	{
		List<String> ids = Arrays.asList("ramen@konoha.com");
		List<Customer> customer = customerRepository.findByFollowList(ids);
		if(customer.size()>0)
		{
			System.out.println("co " + customer.size()); // Output: 3.33

		}
		else
		{
			System.out.println("khong "); // Output: 3.33

		}
	}
	@Test
	void testSubmitOrg()
	{
		Account account = new Account("SonTung Agency", "18110152@student.hcmute.edu.vn", "0911452369", "", Constants.AVATAR_DEFAULT, Constants.ROLE_ORGANIZATION);

		Organization organization = new Organization(account.getEmail(), EOrganization.DISABLED);
		organizationRepository.save(organization);
		accountRepository.save(account);

	}
	@Test
	void testPendingProfit()
	{
		BigDecimal A = new BigDecimal("699000"); // Tham số đầu vào A
		BigDecimal hundred = new BigDecimal("100");
		BigDecimal five = new BigDecimal("5");

		BigDecimal  realMoneyForAdmin = A.multiply(five).divide(hundred); // X = A * 5 / 100
		BigDecimal realMoneyForOrganizer = A.subtract(realMoneyForAdmin); // Y = A - X

		System.out.println("realMoneyForOrganizer = " + realMoneyForOrganizer);
		System.out.println("realMoneyForAdmin = " + realMoneyForAdmin);
	}
	@Test
	void testBeforeDate()
	{
		if(isBeforeToday("29/5/2023"))
		{
			System.out.println("true");

		}

	}
	@Test
	void testOrgForEventList()
	{
		Optional<Organization> organization = organizationRepository.findByEventList("may-saigon-livestage-liveshow-lam-thuy-van-24887");
		if (organization.isPresent())
		{
			System.out.println(organization.get().getId());
			System.out.println("true");

		}
		else
			System.out.println("false");


	}
	private MongoOperations mongoOperations;
	public Organization findElementInList(String listElement) {
		Query query = new Query();
		query.addCriteria(Criteria.where("a").is(listElement));

		return mongoOperations.findOne(query, Organization.class);
	}
	@Test
	public void testString()
	{
		String html = "<span style=3D\"color:black;font-weight:700;font-family:Calibri \">[M=C2Y LANG THANG] LIVESHOW ?NG HO=\r\n=C0NG PH=DAC & KH=C1CH M?I : QUANG ??NG TR?N</span>";

		String decodedHtml = StringEscapeUtils.unescapeHtml4(html);
		System.out.println(decodedHtml);
	}
}
