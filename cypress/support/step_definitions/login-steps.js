import { Before, Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor";

let stub;

Before(() => {
  cy.log("Executing before step");
  // Inicializa a função espiã do Cypress. Ela vai "ouvir" e gravar chamadas feitas a ela
  stub = cy.stub();
});

// Pré-condição: Acessa a URL da página de login
Given("I access the WebdriverUniversity Login Page", () => {
  cy.visit("http://www.webdriveruniversity.com/Login-Portal/index.html");
});

// Ação: O {word} captura uma única palavra (sem espaços) da tabela do Scenario Outline.
// Não exige que a palavra esteja entre aspas ("") no arquivo .feature.
// É por isso que ele não funciona com o {string}, já que precisa de aspas para capturar uma string inteira, mesmo que tenha espaços.
When("I enter a username {word}", (userName) => {
  cy.get("#text").type(userName);
});

When("I enter a password {string}", (password) => {
  cy.get("#password").type(password);
});

When("I click on the login button", () => {
  cy.get("#login-button").click();
  cy.on("window:alert", stub);
});

// Resultado Esperado: Usa Expressão Regular (/^ ... $/) no lugar de aspas duplas ("").
// O (.*) é um grupo de captura que pega TODO o texto que vier após a palavra "message ",
// permitindo capturar frases inteiras com espaços, sem precisar de aspas no .feature.
// Then(/^I should be presented with the following message (.*)$/, (message) => {
//   const expectedMessage = message;
//   cy.log("Expected message: " + expectedMessage);
//   expect(stub.getCall(0)).to.be.calledWith(expectedMessage);
// });

// Mas também tem essa forma mais facil de fazer, usando {string} no lugar de (.*) e sem precisar de Expressão Regular. O {string} captura uma string inteira, mesmo que tenha espaços, desde que esteja entre aspas ("") no arquivo .feature.
Then("I should be presented with the following message {string}", (message) => {
  expect(stub.getCall(0)).to.be.calledWith(message);
});
