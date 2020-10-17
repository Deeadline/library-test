/// <reference types="cypress"/>
// tslint:disable-next-line:no-reference-import
/// <reference types="../support"/>

import { FixtureType } from '../support';

describe('Authentication module', () => {

	let fixtures: FixtureType;

	beforeEach(() => {
		cy.fixture('example.json').then((f: FixtureType) => {
			fixtures = f;
		});
	});

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

	it('Should register user', () => {
		cy.get('button[type="button"]').click();
		cy.url().should('include', '/auth/signup');
		cy.signup(fixtures['signup-mock']);
		cy.url().should('include', '/app/book');
	});

	it('Should authenticate user', () => {
		localStorage.setItem('users', JSON.stringify(fixtures['fetch-users']));
		cy.login(fixtures['admin-login']);
		cy.url().should('include', '/app/book');
	});

	it('Display error on register user', () => {
		localStorage.setItem('users', JSON.stringify(fixtures['fetch-users']));
		cy.get('button[type="button"]').click();
		cy.url().should('include', '/auth/signup');
		cy.signup(fixtures['signup-mock']);
		cy.get('simple-snack-bar').contains('Signup failed');
	});
});
