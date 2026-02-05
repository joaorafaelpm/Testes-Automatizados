/// <reference types="cypress" />

describe("Cypress web security", () => {
  it("Validating visiting two different domains", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.origin("https://automationteststore.com/", () => {
      cy.visit("/");
    });
   
  });

  it("Validating visiting two different domains via user actions", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    // This method works beacuse we are removing the target attribute which forces the link to open in the same tab
    // And we remove the google security policy so its not triggered
    cy.get("#automation-test-store")
      .invoke("removeAttr", "target")
      .click({ force: true });
  });
});