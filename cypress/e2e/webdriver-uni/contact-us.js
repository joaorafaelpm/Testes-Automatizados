/// <reference types="cypress" />

import Contact_Us_PO from "../../support/pageObjects/webdriver-uni/Contact_Us_PO";
import HomePage_PO from "../../support/pageObjects/webdriver-uni/Homepage_PO";

describe("test contact us form via webdriveruni", () => {
  const contactUsPO = new Contact_Us_PO();
  const homePage_PO = new HomePage_PO();

  beforeEach(()=> {
    // This command is a good way to set a viewport and test the application as a mobile device
    // You can also do it as a global configuration
    // cy.viewport(550, 750);
    homePage_PO.visitCustomUrl("/Contact-Us/contactus.html");
  })
  before(()=> {
    cy.fixture('example').then((data) => {
      // If this aproach does not work, we can use the following
      // this.data = data;
      globalThis.data = data;
    })
  })
  it("should be able to submit a successful submission via contact us form", () => {
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    // cy.pause()
    cy.title().should("include", "WebDriver | Contact Us");
    // A usefull way to improve our debug in cypress
    // cy.url().pause().should("include", "contactus");
    cy.url().should("include", "contactus");

    // Another way to debug (for example, I need my API to make a request in less than 3s, or smth like that)
    // cy.wait(3000);
    contactUsPO.contactForm_Submission(
    Cypress.env("first_name"),
    data.last_name,
    data.email,
    data.comment,
    "h1",
    "Thank You for your Message!",
    );
  });

  it("should not be able to submit a successful submission via contact us form as all fields are required", () => {
    contactUsPO.contactForm_Submission(
      data.first_name,
      data.last_name,
      " ",
      data.comment,
      "body",
      "Error: Invalid email address",
    );
  });
});
