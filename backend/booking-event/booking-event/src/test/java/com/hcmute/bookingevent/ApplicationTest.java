package com.hcmute.bookingevent;

import com.hcmute.bookingevent.models.Review;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.ReviewRepository;
import com.hcmute.bookingevent.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@RequiredArgsConstructor
public class ApplicationTest {

    @Autowired
    private ApplicationContext applicationContext;
    @Autowired

    private ReviewRepository reviewRepository;

//    @Test
//    public void givenInScopeComponents_whenSearchingInApplicationContext_thenFindThem() {
//        //ApplicationContext contextx = new AnnotationConfigApplicationContext(AccountService.class);
//        System.out.println(applicationContext.getBean("Account") );
//        assertNotNull(applicationContext.getBean(AccountService.class));
//
//    }
    @Test
    public void testBuilder()
    {
        Date d1 = new Date();
        Review review = Review.builder().id("646ceaee54980954d70e383b").name("anhtuan dep trai")
                        .email("tuantuan3455@gmail.com")
                .avatar("https://res.cloudinary.com/lotus-ticket-2022/image/upload/v1670572360/booking/jcvpx7qmgblnbsg8gjwd.jpg")
                .idEvent("may-lang-thang-new-year-special-show-27182")
                .message("oke")
                .rate(5)
                .createdAt(d1).build();

        reviewRepository.save(review);

        System.out.println(review.toString());
    }
}
