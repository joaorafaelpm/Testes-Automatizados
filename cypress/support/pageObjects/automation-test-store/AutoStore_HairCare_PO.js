class AutoStore_HairCare_PO {
  addHairCareProductsToBasket() {
    globalThis.data.productName.forEach(function (element) {
      cy.addProductToBasket(element).then(() => {
        // If we add this line in the "then()" command we can easly debug our code by simply inspect an element in the page and then wait for the code to happen
        // And then it instant stops the code for debug and shows you where the "debugger" code is
        // debugger

      });
    });
    // Or we can also choose this method
    // cy.get(".dropdown-toggle > .fa").click().debug();
    cy.get(".dropdown-toggle > .fa").click();
  }
}
export default AutoStore_HairCare_PO;
