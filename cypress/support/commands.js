// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (loginModel) => {
  cy.get('#email').type(loginModel.email);
  cy.get('#password').type(loginModel.password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('signup', (user) => {
  cy.get('#username').type(user.username);
  cy.get('#password').type(user.password);
  cy.get('#repeatPassword').type(user.repeatPassword);
  cy.get('#favouriteAuthor').type(user.favouriteAuthor);
  cy.get('#favouriteBook').type(user.favouriteBook);
  cy.get('button[type="submit"]').click();
});
