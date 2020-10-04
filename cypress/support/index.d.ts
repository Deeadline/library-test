/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    login(loginModel: { email: string, password: string }): Chainable<Element>;

    signup(user: {
      username: string,
      password: string,
      repeatPassword: string,
      favouriteAuthor: string,
      favouriteBook: string
    }): Chainable<Element>;
  }
}
