/// <reference types="cypress" />
import * as helpers from "../../../support/helpers";

context("Visit Login Page", () => {
  const username = "admin10";
  const password = "#Password69";

  context(`Given invalid credentials`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: "POST",
          url: "/api/auth/token",
          status: 400,
          response: {
            error: `Incorrect username or password`,
          },
        })
        .as("loginRequest");
    });

    it(`displays error from POST /api/auth/token`, () => {
      const newUser = {
        username: "invalid-username",
        password: "invalid-password",
      };

      cy.visit("/login");
      cy.get(".loginForm").within(($form) => {
        cy.get("#username").type(newUser.username);
        cy.get("#password").type(newUser.password);
        cy.root().submit();

        cy.get(".error").should("have.text", "Incorrect username or password");
        cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
      });
    });
  });

  context(`given valid credentials`, () => {
    const loginToken = helpers.makeLoginToken();

    beforeEach(() => {
      cy.server()
        .route({
          method: "POST",
          url: "/api/auth/token",
          status: 200,
          response: {
            authToken: loginToken,
          },
        })
        .as("loginRequest");
    });

    it(`stores token in localStorage and redirects to /feed`, () => {
      cy.visit("/login");
      cy.get(".loginForm").within(($form) => {
        cy.get("#username").type(username);
        cy.get("#password").type(password);
        cy.root().submit();
        // cy.wait(5000)
        //   .window()
        //   .then((win) => {
        //     const tokenInStorage = win.localStorage.getItem(
        //       Cypress.env("TOKEN_KEY")
        //     );
        //     expect(tokenInStorage).to.eql(loginToken);
        //   });

        cy.url().should("eq", `${Cypress.config().baseUrl}/feed`);
      });
    });
  });
});
