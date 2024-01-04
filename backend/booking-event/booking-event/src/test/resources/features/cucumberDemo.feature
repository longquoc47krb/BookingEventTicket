Feature: feature to test Event API

  Scenario: test event successfully
    Given the event is empty
    When the client GET event
    Then the client GET event result
  Scenario: google test
    Given I am on the google site
    When I enter "google" as a keyword
    And I click on the search button
    Then I see at least 5 character result