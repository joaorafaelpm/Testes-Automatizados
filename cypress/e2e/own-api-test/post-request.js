/// <reference types="cypress" />

describe("Post Request", () => {
    var citiesName = new Array();
    // Generating a random name for the city to be created, but I'll keep the ".only" code, beacuse I don't want to create a new city every time I run the tests, just want to validate the latest created city.
    let randomName =
    Math.random().toString(36).substring(1) +
    Math.random().toString(36).substring(1);

    it("Create a new city via /cities api", () => {
        cy.request({
          method: "POST",
          url: "http://localhost:80/v1/cities",
          headers: {
            Authorization: `Bearer ${Cypress.env("access_token")}`,
            "Content-Type": "application/json",
          },
          body: {
            name: "São Carlos2",
            stateId: {
              id: "869fffa5-0a9e-11f1-8477-9696d1d7fdde",
            },
          },
        }).then((response) => {
          expect(response.status).to.eql(201);
        });
    });

    it.only("Validate title of latest post", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:80/v1/cities",
        headers: {
          Authorization: `Bearer ${Cypress.env("access_token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          let body = JSON.parse(JSON.stringify(response.body));
          body._embedded.cities.forEach(function (item) {
            citiesName.push(item["name"]);
          });
        })
        .then(() => {
          let latestCity = citiesName[citiesName.length - 1];
          expect(latestCity).to.eq("São Carlos");
        });
    });
});
