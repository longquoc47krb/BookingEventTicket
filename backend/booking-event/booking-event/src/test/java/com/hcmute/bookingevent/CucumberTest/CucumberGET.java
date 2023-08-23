package com.hcmute.bookingevent.CucumberTest;

import com.hcmute.bookingevent.ConfigCucumber.CucumberTest;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

//@SpringBootTest

public class CucumberGET extends CucumberTest {

    @Given("^the event is empty$")
    public void the_event_is_empty() {
        System.out.println("the event is empty");
        throw new io.cucumber.java.PendingException();
    }

    @When("^the client GET event$")
    public void cucumber_event_get_id() throws Throwable {
        throw new io.cucumber.java.PendingException();
    }

    @Then("^the client GET event result$")
    public void cucumber_event_result() throws Throwable {
    }
}
