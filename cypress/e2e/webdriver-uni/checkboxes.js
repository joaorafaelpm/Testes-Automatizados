/// <reference types="cypress" />

describe("Verify checkboxes via webdriveruni", () => {
  it("Check and validate checkbox", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons").invoke("removeAttr", "target").click({ force: true });
    
    // cy.get("#checkboxes > :nth-child(1) > input").check().should("be.checked");

    cy.get("#checkboxes > :nth-child(1) > input").as("option-1");
    cy.get("@option-1").check().should("be.checked");
  });

  it("Uncheck and validate checkbox", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons").invoke("removeAttr", "target").click({ force: true });
    
    cy.get("#checkboxes > :nth-child(5) > input").as("option-5");
    cy.get("@option-5").uncheck().should("not.be.checked");
  });

  it.only("Check multiples checkboxes", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons").invoke("removeAttr", "target").click({ force: true });
     
    // We can check multiple checkboxes by passing an array of values to the check command
    cy.get("input[type='checkbox']")
      .check(["option-1", "option-2", "option-3", "option-4"])
      .should("be.checked");
  });
});
