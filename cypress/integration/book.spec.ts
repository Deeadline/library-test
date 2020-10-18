import { BookInterface } from '../../src/app/models/book.interface';
import { FixtureType } from '../support';

type RequiredBookType = Required<BookInterface>;
type InsertBookType = Pick<RequiredBookType, 'title' | 'releasedYear' | 'author' | 'publishingHouse' | 'imageUrl'>;

describe('Book module', () => {

	describe('Admin block', () => {

		const goToCreateBook = () => {
			cy.url().should('include', '/app/book');
			cy.get('[data-cy="create-book"').click();
			cy.url().should('include', '/app/book/create');
		};

		const addBook = () => {
			cy.insertBook(fixtures['example-book'] as InsertBookType);
			cy.url().should('include', '/app/book');
			cy.get('[data-cy="book"]').should('have.length', 1);
		};

		const loginAsAdmin = () => {
			cy.url().should('include', '/auth/login');
			cy.login(fixtures['admin-login']);
		};

		let fixtures: FixtureType;

		beforeEach(() => {
			cy.fixture('example.json').then((f: FixtureType) => {
				fixtures = f;
				localStorage.setItem('users', JSON.stringify(
					fixtures['fetch-users']
				));
			});
		});

		beforeEach(() => {
			cy.visit('/auth/login');
			loginAsAdmin();
		});

		after(() => {
			cy.logout();
		});

		it('login as admin and add book', () => {
			goToCreateBook();
			addBook();
			cy.get('[data-cy="book"]').contains(fixtures['example-book'].title);
		});

		it('create book and update with description', () => {
			goToCreateBook();
			addBook();
			cy.get('[data-cy="book"]').find('a[href*="app/book/edit/1"]').click();
			cy.url().should('include', '/app/book/edit/1');
			cy.get('[data-cy-id="description"]').type('This is description of example book');
			cy.get('[data-cy="submit"]').click();
			cy.get('[data-cy="book"]').contains('This is description of example book');
		});
	});

	describe('User block', () => {
		const loginAsUser = () => {
			cy.url().should('include', '/auth/login');
			cy.login(fixtures['user-login']);
		};

		let fixtures: FixtureType;

		beforeEach(() => {
			cy.fixture('example.json').then((f: FixtureType) => {
				fixtures = f;
				localStorage.setItem('users', JSON.stringify(
					fixtures['fetch-users']
				));
				localStorage.setItem('books', JSON.stringify(
					fixtures['example-list-of-book']
				));
			});
		});

		beforeEach(() => {
			cy.visit('/auth/login');
			loginAsUser();
		});

		after(() => {
			cy.logout();
		});

		it('user should comment book', () => {
			cy.get('[data-cy="book"]').find('a[href*="app/book/detail/1"]').click();
			cy.get('[data-cy-id="comment"]').type('This book is amazing!');
			cy.get('[data-cy="submit-comment"]').click();
			cy.get('app-book-comment-container').should('have.length', 1);
			cy.get('app-book-comment-container').contains('This book is amazing!');
			cy.get('textarea').should('not.exist');
		});

		it('should rate book and display new average rate', () => {
			cy.get('[data-cy="book"]').find('a[href*="app/book/detail/1"]').click();
			cy.get('p-rating').find('span.p-rating-icon:last-of-type').click();
			cy.get('[data-cy="submit-rate"]').click();
			cy.get('p-rating').find('.p-rating').should('have.class', 'p-readonly');
			cy.get('mat-nav-list').find('a[href*="app/book"]').click();
			cy.url().should('include', '/app/book');
			cy.get('[data-cy="book"]').find('mat-card-subtitle').contains(10);
		});

		it('should have 3 elements when search by author', () => {
			cy.get('[data-cy="book"]').should('have.length', 7);
			cy.get('[data-cy-id="author-input"]').type('Rick Riordan');
			cy.get('[data-cy="book"]').should('have.length', 3);
		});

		it('should have 2 elements when search by year range', () => {
			cy.get('[data-cy="years"]').click();
			cy.get('.p-multiselect-item[aria-label="2001"]').click();
			cy.get('.p-multiselect-item[aria-label="2004"]').click();
			cy.get('[data-cy="list-toolbar"]').click();
			cy.get('[data-cy="book"]').should('have.length', 2);
		});

		it('should have 5 elements when search by notes range', () => {
			cy.get('[data-cy="notes"]').click();
			cy.get('.p-multiselect-item[aria-label="1"]').click();
			cy.get('[data-cy="list-toolbar"]').click();
			cy.get('[data-cy="book"]').should('have.length', 5);
		});
	});
});
