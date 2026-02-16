
# We can execute especific tests by tagging them with @regression and then running the tests with the tag filter. This allows us to run only the tests that are relevant to a specific category, such as regression tests, without having to run the entire test suite.
# So, by using the command `npx cypress run --spec "cypress/e2e/webdriver-uni/features/login.feature" --env grepTags=@regression` we can execute only the tests that are tagged with @regression in the login.feature file. This is a useful way to organize and run specific subsets of tests based on their tags.
@regression
Feature: WebdriverUniversity Login Page

# This current approach will work but it is not the best way since it break the DRY principle "Don't Repeat Yourself". We are repeating the same steps in both scenarios. We can optimize this by using Scenario Outline and Examples.
    Scenario: Login using valid credentials
        Given I access the WebdriverUniversity Login Page
        When I enter a username webdriver
        And I enter a password "webdriver123"
        And I click on the login button
        Then I should be presented with the following message "validation succeeded"

    Scenario: Login using invalid credentials
        Given I access the WebdriverUniversity Login Page
        When I enter a username webdriver
        And I enter a password "webdriver555"
        And I click on the login button
        Then I should be presented with the following message "validation failed"

# Substitute the above scenarios with the following Scenario Outline and Examples:

    @login
    Scenario Outline: Test Login via WebdriverUniversity Login Portal
        Given I access the WebdriverUniversity Login Page
        When I enter a username <username>
        And I enter a password <password>
        And I click on the login button
        Then I should be presented with the following message <message>

        Examples:
            | username  | password     | message              |
            | webdriver | "webdriver123" | "validation succeeded" |
            | webdriver | "webdriver555" | "validation failed"    |
            | joe       | "pass123"      | "validation failed"   |