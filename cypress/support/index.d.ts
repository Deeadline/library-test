/// <reference types="cypress" />
/// <reference types=""

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

		insertBook(book: {
			title: string;
			releasedYear: number;
			author: string;
			publishingHouse: string;
			imageUrl: string
		}): Chainable<Element>;

		logout(): Chainable<Element>;
	}
}
