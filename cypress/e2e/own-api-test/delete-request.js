/// <reference types="cypress" />

describe("Delete Request", () => {
    it("Delete a post via /posts api", () => {
      cy.request({
        method: "DELETE",
        url: "http://localhost:80/v1/cities/3bb34834-6160-4570-aad2-0149f2941005",
        headers: {
          Authorization: `Bearer ${Cypress.env("access_token")}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eql(204);
      });
    });
});