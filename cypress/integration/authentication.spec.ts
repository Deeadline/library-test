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
		cy.visit('/auth/login');
	});

	it('Should authenticate user', () => {
		cy.url().should('include', '/auth/login');
		localStorage.setItem('users', JSON.stringify(fixtures['fetch-users']));
		cy.login(fixtures['admin-login']);
		cy.url().should('include', '/app/book');
	});

	it('Display error on login', () => {
		cy.url().should('include', '/auth/login');
		cy.login(fixtures['admin-login']);
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

	it('Display error on register user', () => {
		localStorage.setItem('users', JSON.stringify(fixtures['fetch-users']));
		cy.get('button[type="button"]').click();
		cy.url().should('include', '/auth/signup');
		cy.signup(fixtures['signup-mock']);
		cy.get('simple-snack-bar').contains('Signup failed');
	});
});
