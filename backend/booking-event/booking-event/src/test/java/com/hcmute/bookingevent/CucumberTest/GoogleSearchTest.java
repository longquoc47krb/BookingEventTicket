package com.hcmute.bookingevent.CucumberTest;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

//@SpringBootTest
public class GoogleSearchTest {
    @Given("I am on the google site")
    public void start_google() {
    }
    @When("I enter {string} as a keyword")
    public void enter_keyword(String keyword) throws Throwable {
    }
    @And("I click on the search button")
    public void click_on() throws Throwable {
    }
    @Then("I see at least {int} character result")
    public void cucumber_event_result(int character) throws Throwable {
    }
}
