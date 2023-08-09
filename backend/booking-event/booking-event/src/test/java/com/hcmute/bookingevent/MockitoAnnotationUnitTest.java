package com.hcmute.bookingevent;

import com.hcmute.bookingevent.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationContext;

import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class MockitoAnnotationUnitTest {
    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }
//    @Rule
//    public MockitoRule initRule = MockitoJUnit.rule();
    @Mock
    List<String> mockedList ;
    @Mock
    private ReviewRepository reviewRepository;

    @Test
    public void whenUseMockAnnotation_thenMockIsInjected() {

        mockedList.add("one");
        //mockedList.add("two");
        Mockito.verify(mockedList).add("one");
        System.out.println(mockedList.size());
        assertEquals(0, mockedList.size());

        //Mockito.when(mockedList.add("one")).thenReturn(true);

        //assertEquals(true, mockedList.add("one"));

    }

}
