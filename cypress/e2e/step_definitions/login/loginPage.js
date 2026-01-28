const URL = Cypress.env("API_LOGIN_URL");
const USERNAME_INPUT = "#Email";
const PASSWORD_INPUT = "#Password";
const SUBMIT_BUTTON = "#LoginButton";
const ERROR_MESSAGE_CLASS = ".alert-danger";
const ERROR_MESSAGE_TEXT = "O e-mail ou senha não confere";
const TEST_CLIENT_ID = Cypress.env("TEST_CLIENT_ID");
const TEST_CLIENT_SECRET = Cypress.env("TEST_CLIENT_SECRET");
const CODE_VERIFIER = Cypress.env("CODE_VERIFIER");

class LoginPage {
  static visitLoginPage() {
    cy.visit(URL);
  }

  static fillUsername(name) {
    cy.get(USERNAME_INPUT).type(name);
  }

  static fillPassword(password) {
    cy.get(PASSWORD_INPUT).type(password);
  }

  static submit() {
    cy.get(SUBMIT_BUTTON).click();
  }

  static getErrorMessage() {
    cy.get(ERROR_MESSAGE_CLASS).contains(ERROR_MESSAGE_TEXT);
  }

  static makeAccessTokenRequest() {
    cy.location("search").then((search) => {
      const urlParams = new URLSearchParams(search);
      const capturedCode = urlParams.get("code");
      cy.log("O código capturado é: " + capturedCode);
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
    
  }
}

export default LoginPage;
