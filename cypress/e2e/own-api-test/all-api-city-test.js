/// <reference types="cypress" />

describe("Post, Get and Delete City request", () => {
    let createdCity = null;
    it("Create a new city via /cities api", () => {
        cy.request({
        method: "POST",
        url: "http://localhost:80/v1/cities",
        headers: {
            Authorization: `Bearer ${Cypress.env("access_token")}`,
            "Content-Type": "application/json",
        },
        body: {
            name: "São Carlos",
            stateId: {
            id: "869fffa5-0a9e-11f1-8477-9696d1d7fdde",
            },
        },
        }).then((response) => {
            expect(response.status).to.eql(201);
        });
    });

    it("Validate /posts api contains the correct keys and values", () => {
        cy.request({
            method: "GET",
            url: "localhost:80/v1/cities",
            headers: {
                Authorization: `Bearer ${Cypress.env("access_token")}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            response.body._embedded.cities.forEach(function (item) {
              if (item["name"] === "São Carlos") {
                createdCity = item;
                cy.log(item)
              }
            });
        });
    });

    it("Delete a post via /cities api", () => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:80/v1/cities/${createdCity.id}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("access_token")}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eql(204);
      });
    });
});
