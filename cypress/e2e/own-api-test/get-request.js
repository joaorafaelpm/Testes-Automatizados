/// <reference types="cypress" />

describe("Get Request", () => {
  let result;
  it("Validate status code of the /cities api", () => {
      result = cy.request({
        method: "GET",
        url: "localhost:80/v1/cities",
        headers: {
          Authorization: `Bearer ${Cypress.env("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      result.its("status").should("equal", 200);
    });

   it("Validate /posts api contains the correct keys and values", () => {
    result = cy.request({
      method: "GET",
      url: "localhost:80/v1/cities",
      headers: {
        Authorization: `Bearer ${Cypress.env("access_token")}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        expect(body._embedded.cities[0]).has.property("name", "São Paulo");
        expect(body._embedded.cities[1]).has.property("name", "Campinas");
       
        body._embedded.cities.forEach(function (item) {
          expect(item).to.have.all.keys("_links", "id", "name", "state");
          cy.log("Name: " + item["name"] + " & State: " + item["state"]);
        });
     });
   });

});
