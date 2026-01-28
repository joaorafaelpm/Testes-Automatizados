import { Given, When,  Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "./loginPage";

const TEST_USERNAME = Cypress.env("TEST_USERNAME");
const TEST_PASSWORD = Cypress.env("TEST_PASSWORD");
const TEST_CLIENT_ID = Cypress.env("TEST_CLIENT_ID");
const TEST_CLIENT_SECRET = Cypress.env("TEST_CLIENT_SECRET");
const CODE_VERIFIER = Cypress.env("CODE_VERIFIER");

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
  cy.url().then((url) => {
    const urlObj = new URL(url);
    const capturedCode = urlObj.searchParams.get("code");

    expect(capturedCode).to.not.be.null;

    cy.request({
      method: "POST",
      url: "http://localhost:80/oauth2/token",
      form: true,
      auth: {
        username: TEST_CLIENT_ID,
        password: TEST_CLIENT_SECRET,
      },
      body: {
        grant_type: "authorization_code",
        code: capturedCode,
        redirect_uri: "http://localhost:80/redirect",
        code_verifier: CODE_VERIFIER,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token");
      cy.log("Access Token obtido: " + response.body.access_token);
    });
  });
});