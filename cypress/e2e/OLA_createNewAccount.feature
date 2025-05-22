Feature: Motability OLA Application - Create New Account

Motability OLA Application - Create New Account

  Background:
    Given Admin user has logged on to the OLA Application site
    Then I am on the OLA Application home page

  @focus
  Scenario: OLA Application - Create New Account
    When I click on the "Create New Account" button
    Then I should see the "Create New Account" form
    When I fill in the "Create New Account" form with valid details
    And I click on the "Submit" button
    Then I should see a confirmation message