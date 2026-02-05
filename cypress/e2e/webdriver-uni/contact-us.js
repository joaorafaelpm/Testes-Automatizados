/// <reference types="cypress" />

describe("test contact us form via webdriveruni", () => {
  it("should be able to submit a successful submission via contact us form", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.get("#contact-us").invoke("removeAttr", "target").click({ force: true });
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    cy.title().should("include", "WebDriver | Contact Us");
    cy.url().should("include", "contactus");

    cy.get('[name="first_name"]').type("Roberto");
    cy.get('[name="last_name"]').type("Fezzbear", { force: true });
    cy.get('[name="email"]').type("roberto.fezzbear@example.com");
    cy.get('[name="message"]').type(
      "Hello, this is a test message for the contact us form.",
      { force: true },
    );
    cy.get('[type="submit"]').click({ force: true });
    cy.get("h1").should("have.text", "Thank You for your Message!");
  });

  it("should not be able to submit a successful submission via contact us form as all fields are required", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.get("#contact-us").invoke("removeAttr", "target").click({ force: true });
    cy.get('[name="first_name"]').type("Rodolfo");
    cy.get('[name="last_name"]').type("Fezzbear", { force: true });
    cy.get('[name="message"]').type(
      "Hello, this is a test message for the contact us form.",
      { force: true },
    );
    cy.get('[type="submit"]').click({ force: true });
    cy.get("body").contains("Error: all fields are required");
  });
});
