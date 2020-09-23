/// <reference types="cypress" />

context("Visit Login Page", () => {
  const userame = "admin";
  const password = "#Password69";

  beforeEach(() => {
    cy.visit("/login");
  });

  it("accepts input", () => {
    cy.get("#username").type(userame).should("have.value", userame);
    cy.get("#password").type(password).should("have.value", password);
  });

  it("Submits username and password for login", () => {
    cy.get("#username").type(userame).type("{tab}");
    cy.get("#password").type(password).type("{enter}");
  });
});
