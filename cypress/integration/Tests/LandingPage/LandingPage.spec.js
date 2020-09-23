/// <reference types="cypress" />

context("Landing Page", () => {
  it("Visits the landing page without crashing", () => {
    cy.visit("/");
  });
});
