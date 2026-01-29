/// <reference types="cypress" />

describe("test contact us form via webdriveruni", () => {
    it("should be able to submit a successful submission via contact us form", () => {
        cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.get('[name="first_name"]').type("Roberto");
        cy.get('[name="last_name"]').type("Fezzbear",{force:true});
        cy.get('[name="email"]').type("roberto.fezzbear@example.com");
        cy.get('[name="message"]').type("Hello, this is a test message for the contact us form.",{ force: true });
        cy.get('[type="submit"]').click({ force: true });
    });

    it.only("should not be able to submit a successful submission via contact us form as all fields are required", () => {
        cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.get('[name="first_name"]').type("Rodolfo");
        cy.get('[name="last_name"]').type("Fezzbear", { force: true });
        cy.get('[name="message"]').type(
        "Hello, this is a test message for the contact us form.",
        { force: true },
        );
        cy.get('[type="submit"]').click({ force: true });
    });

});
