// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@testing-library/cypress/add-commands';

import { BookInterface } from '../../src/app/models/book.interface';
import { UserInterface } from '../../src/app/models/user.interface';

import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
export type FixtureType = {
	'admin-login': {
		'email': string,
		'password': string
	},
	'user-login': {
		'email': string,
		'password': string
	},
	'fetch-users': UserInterface[],
	'example-book': BookInterface,
	'example-list-of-book': BookInterface[],
	'signup-mock': {
		username: string,
		password: string,
		repeatPassword: string,
		favouriteAuthor: string,
		favouriteBook: string
	}
};
