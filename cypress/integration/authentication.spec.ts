/// <reference types="cypress"/>
/// <reference types="../support"/>

describe('Authentication page', () => {
	beforeEach(() => {
		cy.visit('/auth/login');
	});

	it('Visit login page', () => {
		cy.url().should('include', '/auth/login');
	});

	it('Display error on login', () => {
		cy.get('#email').type('admin@test.com');
		cy.get('#password').type('Adm!nistrat0r');
		cy.get('button[type="submit"]').click();
		cy.get('simple-snack-bar').contains('Login failed');
	});

	it('Visit signup page', () => {
		cy.get('button[type="button"]').click();
		cy.url().should('include', '/auth/signup');
	});

	///
	it('Should register user', () => {
		cy.get('button[type="button"]').click();
		cy.url().should('include', '/auth/signup');
		cy.signup({
			username: 'admin@test.com',
			password: 'Adm!nistrat0r',
			repeatPassword: 'Adm!nistrat0r',
			favouriteAuthor: 'J.K. Rowling',
			favouriteBook: 'Harry Potter and The Philosopher Stone'
		});
		cy.url().should('include', '/app/book');
	});

	it('Should authenticate user', () => {
		localStorage.setItem('users', JSON.stringify([{
			username: 'admin@test.com',
			password: 'Adm!nistrat0r',
			role: 'ROLE_ADMINISTRATOR',
			favouriteAuthor: 'J.K. Rowling',
			favouriteBook: 'Harry Potter and The Philosopher Stone',
			id: 1
		}]));
		cy.login({email: 'admin@test.com', password: 'Adm!nistrat0r'});
		cy.url().should('include', '/app/book');
	});

	it('Display error on register user', () => {
		localStorage.setItem('users', JSON.stringify([{
			username: 'admin@test.com',
			password: 'Adm!nistrat0r',
			role: 'ROLE_ADMINISTRATOR',
			favouriteAuthor: 'J.K. Rowling',
			favouriteBook: 'Harry Potter and The Philosopher Stone',
			id: 1
		}]));
		cy.get('button[type="button"]').click();
		cy.url().should('include', '/auth/signup');
		cy.signup({
			username: 'admin@test.com',
			password: 'Adm!nistrat0r',
			repeatPassword: 'Adm!nistrat0r',
			favouriteAuthor: 'J.K. Rowling',
			favouriteBook: 'Harry Potter and The Philosopher Stone'
		});
		cy.get('simple-snack-bar').contains('Signup failed');
	});
});
