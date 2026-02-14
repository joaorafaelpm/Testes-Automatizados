/// <reference types="cypress" />

describe("test contact us form via Automation Test Store", () => {

  before(() => {
    cy.fixture("userDetails").as("user");
  })

  it("should be able to submit a successful submission via contact us form", 
    {
    retries: {
      runMode: 2,
      openMode: 2
    }
  } ,() => {
    cy.visit("https://automationteststore.com/");
    cy.get("a[href$='contact']").click()
    // The same thing was make above using xpath
    // cy.xpath("//a[contains(@href, 'contact')]").click();
    
    cy.get("@user").then((user) => {
      cy.get("#ContactUsFrm_first_name").type(user.first_name);
      cy.get("#ContactUsFrm_email").type(user.email);
    });
    cy.get("#ContactUsFrm_email").should("have.attr", "name", "email");
    cy.get("#ContactUsFrm_enquiry").type("Hello, this is a test message for the contact us form.",);
    cy.get("button[title=Submit]").click();
    
    cy.get(".mb40 > :nth-child(3)").should("have.text", "Your enquiry has been successfully sent to the store owner!");
    
  });

});
