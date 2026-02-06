/// <reference types="cypress" />

describe("Handling Iframe and modals", () => {
  it("Handle webdriveruni iframe    ", () => {
    cy.visit("http://www.webdriveruniversity.com/");
    cy.get("#iframe").invoke("removeAttr", "target").click({ force: true });
    
    cy.get('#frame').then(($iframe) => {
        // To access an element inside the iframe we need to get the body of the iframe and then wrap it to use cypress commands on it
        const body = $iframe.contents().find('body');
        cy.wrap(body).as('iframe');
    });

    cy.get('@iframe').find('#button-find-out-more').click();
    cy.get('@iframe').find('#myModal').as('modal');

    cy.get('@modal').should(($expectedText) => {
        const text = $expectedText.text();
        expect(text).to.include("Welcome to webdriveruniversity.com we sell a wide range of electrical goods");
    });

    cy.get('@modal').contains('Close').click();

  });
});
