import { Given, When,  Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "./loginPage";

const TEST_USERNAME = Cypress.env("TEST_USERNAME");
const TEST_PASSWORD = Cypress.env("TEST_PASSWORD");


Given("I'm on the login page", () => {
  LoginPage.visitLoginPage();
})

When("I type a registered email and password",() => {
    LoginPage.fillUsername(TEST_USERNAME);
    LoginPage.fillPassword(TEST_PASSWORD);
    LoginPage.submit();
})

When("I type a registered username: {string}", TEST_USERNAME => {
  LoginPage.fillUsername(TEST_USERNAME);
});

When("I type a registered password: {string}", TEST_PASSWORD => {
  LoginPage.fillPassword(TEST_PASSWORD);
});

When("I click submit button", () => {
  LoginPage.submit();
});

Then("I should see a error page", () => {
  LoginPage.getErrorMessage();
});

Then("I have a successful login and see my access_token", () => {
  LoginPage.makeAccessTokenRequest();
});