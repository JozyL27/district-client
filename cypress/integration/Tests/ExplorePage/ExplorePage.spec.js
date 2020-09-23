/// <reference types="cypress" />

context("Landing Page", () => {
  it("should render explore page without crashing", () => {
    cy.visit("/explore");
  });
});
