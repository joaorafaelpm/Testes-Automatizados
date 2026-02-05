/// <reference types="cypress" />

describe("Alias and invoke", () => {
  it("Validate a specific hair product", () => {
    cy.visit("https://automationteststore.com/");

    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();

    // Instead of using variables to interact with elements between tests or commands
    // We can use alias and invoke to achieve the same
    // The ".as" is an aliasing command that allows us to store a reference to a value
    // The "invoke" command allows us to call a function on the previously yielded subject
    // So in this case we are calling the "text" function to get the text content of the element, and the element is stored as an alias called "productThumbnail"
    cy.get(".fixed_wrapper .prdocutname").eq(0).invoke('text').as("productThumbnail");
    cy.get("@productThumbnail").its("length").should("be.gt" , 5)
    cy.get("@productThumbnail").should("contain", "Seaweed Conditioner");

  });
  it("Validate product thumbnail", () => {
    cy.visit("https://automationteststore.com/");

    cy.get(".thumbnail").as("productThumbnail");
    cy.get("@productThumbnail").should("have.length", 16);
    cy.get("@productThumbnail").find(".productcart").invoke("attr", "title").should("include", "Add to Cart");
  });
  it.only("Calculate total of sale and normal products", () => {
    cy.visit("https://automationteststore.com/");

    cy.get(".thumbnail").as("productThumbnail");
    
    cy.get(".thumbnail").find(".oneprice").invoke("text").as("itemPrice");
    cy.get(".thumbnail").find(".pricenew").invoke("text").as("saleItemPrice");

    var itemsTotal = 0 ;
    cy.get("@itemPrice").then(($linkText) => {
      // Splitting the text based on $ sign to get individual prices and not the full text
      let itemsTotalPrice = 0;
      let itemPrice = $linkText.split("$")
      let i;
      for (i = 0; i < itemPrice.length; i++) {
        cy.log(itemPrice[i]);
        itemsTotalPrice += Number(itemPrice[i]);
      }
      itemsTotal += itemsTotalPrice;
      cy.log("Non sale items:  " + itemsTotalPrice);

    });
    cy.get("@saleItemPrice").then(($linkText) => {
      // Splitting the text based on $ sign to get individual prices and not the full text
      let salesTotalPrice = 0; 
      let salePrice = $linkText.split("$");
      let i;
      for (i = 0; i < salePrice.length; i++) {
        cy.log(salePrice[i]);
        salesTotalPrice += Number(salePrice[i]);
      }
      itemsTotal += salesTotalPrice;
      cy.log("Sale items total: " + salesTotalPrice);

    })
    .then(() => {
      cy.log("Total of all items: " + itemsTotal);
      expect(itemsTotal).to.equal(673);
    });
  });
});
