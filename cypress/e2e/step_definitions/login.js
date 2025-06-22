import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import {loginPage} from '@pages/LoginPage'

Given("A web browser is at the saucelabs login page", () => {
  cy.visit("/");
});

When("A user enters the username {string}, the password {string}, and clicks on the login button", (username,password) => {
  loginPage.submitLogin(username,password)
  
});

When("A user provides incorrect credentials, and clicks on the login button", (table) => {
  table.hashes().forEach((row) => {
    cy.log(row.username);
    cy.log(row.password);
    loginPage.submitLogin(row.username, row.password)

  });
});
Then("the url will contains the inventory subdirectory", () => {
  cy.url().should("contains", "/inventory.html");
});
Then("The error message {string} is displayed", (errorMessage) => {
  loginPage.elements.errorMessage().should("have.text", errorMessage);
});

let aiLoginData = [];

Given("I load AI-generated login data", () => {
  cy.fixture("loginTestData.json").then((data) => {
    aiLoginData = data;
  });
});

When("I run AI-based login tests", () => {
  aiLoginData.forEach((testCase) => {
    // cy.log(`Running test: ${testCase.test_name}`);
    cy.visit("/");
    loginPage.submitLogin(testCase.username, testCase.password);

    if (testCase.expected_result) {
      cy.url().should("include", "/inventory.html");
    } else {
      loginPage.elements.errorMessage().should("be.visible");
    }
  });
});

Then("I see AI login results match expectations", () => {
  // Assertions are inside the above loop
});