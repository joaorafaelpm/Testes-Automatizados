/// <reference types="cypress" />

import AutoStore_Homepage_PO from "../../support/pageObjects/automation-test-store/autoStore_HomePage_PO";
import AutoStore_Haircare_PO from "../../support/pageObjects/automation-test-store/autoStore_Haircare_PO";

describe("Add multiple itens to basket", () => {
  const autoStore_HomePage = new AutoStore_Homepage_PO();
  const autoStore_Haircare = new AutoStore_Haircare_PO();

  before(() => {
    cy.fixture("products").then((data) => {
      globalThis.data = data;
    });
  });
  beforeEach(() => {
    // Both commands will clear the local storage and cookies
    // Cypress already delete all the cookies and local storage between the tests, but if you want to do it to clear a specific cookie or local storage, you can do it like this:
    // cy.clearLocalStorage();
    // cy.clearCookies();
    autoStore_HomePage.accessHomepage();
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
  });
  it("Add specific itens to basket", () => {
    autoStore_Haircare.addHairCareProductsToBasket();
  });
});
