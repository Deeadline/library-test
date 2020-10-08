import { BookInterface } from '../../src/app/models/book.interface';
import { UserInterface } from '../../src/app/models/user.interface';

type FixtureType = {
	'admin-login': {
		'email': string,
		'password': string
	},
	'user-login': {
		'email': string,
		'password': string
	},
	'fetch-users': UserInterface[],
	'example-book': BookInterface
};

type RequiredBookType = Required<BookInterface>;
type InsertBookType = Pick<RequiredBookType, 'title' | 'releasedYear' | 'author' | 'publishingHouse' | 'imageUrl'>;

describe('Book module', () => {
	let fixtures: FixtureType;
	beforeEach(() => {
		cy.fixture('example.json').then((f: FixtureType) => {
			fixtures = f;
			localStorage.setItem('users', JSON.stringify(
				fixtures['fetch-users']
			));
		});
	});

	after(() => {
		cy.get('[data-cy="logout"]').click();
	});

	beforeEach(() => {
		cy.visit('/auth/login');
	});

	it('login as admin and add book', () => {
		cy.url().should('include', '/auth/login');
		cy.login(fixtures['admin-login']);
		cy.url().should('include', '/app/book');
		cy.get('[data-cy="create-book"').click();
		cy.url().should('include', '/app/book/create');
		cy.insertBook(fixtures['example-book'] as InsertBookType);
		cy.url().should('include', '/app/book');
		cy.get('[data-cy="book"]').should('have.length', 1);
		cy.get('[data-cy="book"]').contains(fixtures['example-book'].title);
	});

	it('create book and update with description', () => {
		cy.url().should('include', '/auth/login');
		cy.login(fixtures['admin-login']);
		cy.url().should('include', '/app/book');
		cy.get('[data-cy="create-book"').click();
		cy.url().should('include', '/app/book/create');
		cy.insertBook(fixtures['example-book'] as InsertBookType);
		cy.url().should('include', '/app/book');
		cy.get('[data-cy="book"]').should('have.length', 1);
		cy.get('[data-cy="book"]').find('a[href*="app/book/edit/1"]').click();
		cy.url().should('include', '/app/book/edit/1');
		cy.get('[data-cy-id="description"]').type('This is description of example book');
		cy.get('[data-cy="submit"]').click();
		cy.get('[data-cy="book"]').contains('This is description of example book');
	});
});
