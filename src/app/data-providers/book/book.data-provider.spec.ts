import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BookService } from '../../http/book/book.service';
import { BookInterface } from '../../models/book.interface';

import { BookDataProvider } from './book.data-provider';

const mockedBooksCollection: BookInterface[] = [
	{author: 'J.K. Rowling', title: 'Harry Potter and the Philosopher Stone', publishingHouse: 'Media Rodzina', releasedYear: 2000},
	{author: 'J.K. Rowling', title: 'Harry Potter and the Chamber of Secrets', publishingHouse: 'Media Rodzina', releasedYear: 2000},
	{author: 'J.K. Rowling', title: 'Harry Potter and the Prisoner of Azkaban', publishingHouse: 'Media Rodzina', releasedYear: 2001},
	{author: 'Rick Riordan', title: 'Percy Jackson and The Lightning Thief', publishingHouse: 'Galeria Książki', releasedYear: 2009}
];

const expectedError = {status: 500, statusText: 'Internal server error'};

describe('Book.DataProviderService', () => {
	let provider: BookDataProvider;
	let service: BookService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [BookService, BookDataProvider]
		});
		provider = TestBed.inject(BookDataProvider);
		service = TestBed.inject(BookService);
	});

	test('should be created', () => {
		expect(provider).toBeTruthy();
	});

	test('create() should add book and return with new id', () => {
		spyOn(provider, 'create').and.returnValue(of({...mockedBooksCollection[0], id: 1}));
		provider.create(mockedBooksCollection[0]).subscribe(
			(response: BookInterface) => expect(response).toEqual(({...mockedBooksCollection[0], id: 1}))
		);
	});

	test('create() should call service method', () => {
		spyOn(service, 'create');
		provider.create(mockedBooksCollection[0]);
		expect(service.create).toHaveBeenCalled();
	});

	test('create() should call service method with proper arguments', () => {
		spyOn(service, 'create');
		provider.create(mockedBooksCollection[0]);
		expect(service.create).toHaveBeenCalledWith(mockedBooksCollection[0]);
	});

	test('create() should return 500 if backend return error', () => {
		spyOn(provider, 'create').and.returnValue(of(expectedError));
		provider.create(mockedBooksCollection[0]).subscribe(
			(response: BookInterface) => expect(response).toEqual(expectedError)
		);
	});

	test('update() should return modified book', () => {
		const description = 'The boy who lived started new year in Hogwart school. New experiences are waiting for him.';
		spyOn(provider, 'update').and.returnValue(of({...mockedBooksCollection[0], description}));
		provider.update(1, mockedBooksCollection[0])
			.subscribe(
				(response: BookInterface) => expect(response).toEqual({...mockedBooksCollection[0], description})
			);
	});

	test('update() should call service method', () => {
		const description = 'The boy who lived started new year in Hogwart school. New experiences are waiting for him.';
		spyOn(service, 'update');
		provider.update(1, {...mockedBooksCollection[0], description});
		expect(service.update).toHaveBeenCalled();
	});

	test('update() should call service method with proper arguments', () => {
		const description = 'The boy who lived started new year in Hogwart school. New experiences are waiting for him.';
		spyOn(service, 'update');
		provider.update(1, {...mockedBooksCollection[0], description});
		expect(service.update).toHaveBeenCalledWith(1, {...mockedBooksCollection[0], description});
	});

	test('update() should return 500 if backend return error', () => {
		spyOn(provider, 'update').and.returnValue(of(expectedError));
		provider.update(1, mockedBooksCollection[0]).subscribe(
			(response: BookInterface) => expect(response).toEqual(expectedError)
		);
	});

	test('getById() should return desired book', () => {
		spyOn(provider, 'getById').and.returnValue(of(mockedBooksCollection[0]));
		provider.getById(1).subscribe((response: BookInterface) => {
			expect(response).toEqual(mockedBooksCollection[0]);
		});
	});

	test('getById() should call service method', () => {
		spyOn(service, 'getById');
		provider.getById(1);
		expect(service.getById).toHaveBeenCalled();
	});

	test('getById() should call service method with proper argument', () => {
		spyOn(service, 'getById');
		provider.getById(1);
		expect(service.getById).toHaveBeenCalledWith(1);
	});

	test('getById() should return 500 if backend returns an error', () => {
		spyOn(provider, 'getById').and.returnValue(of(expectedError));
		provider.getById(1).subscribe((response: BookInterface) => {
			expect(response).toEqual(expectedError);
		});
	});

	test('getAll() should return all items', () => {
		let result: BookInterface[] = [];
		spyOn(provider, 'getAll').and.returnValue(of(mockedBooksCollection));
		provider.getAll().subscribe((response: BookInterface[]) => {
			result = response;
		});
		expect(result).toEqual(mockedBooksCollection);
	});

	test('getAll() should return filtered items', () => {
		let result: BookInterface[] = [];
		const filteredItems = mockedBooksCollection.filter((y: BookInterface) => y.author === 'J.K. Rowling');
		spyOn(provider, 'getAll').and.returnValue(of(filteredItems));
		provider.getAll({author: 'J.K. Rowling'}).subscribe((response: BookInterface[]) => result = response);
		expect(result).toEqual(filteredItems);
	});

	test('getAll() should be called with parameters', () => {
		spyOn(provider, 'getAll');
		provider.getAll({author: 'J.K. Rowling'});
		expect(provider.getAll).toHaveBeenCalledWith({author: 'J.K. Rowling'});
	});

	test('getAll() should call getListByQuery', () => {
		spyOn(service, 'getListByQuery');
		provider.getAll({author: 'J.K. Rowling'});
		expect(service.getListByQuery).toHaveBeenCalled();
	});

	test('getAll() should send proper params to getListByQuery', () => {
		spyOn(service, 'getListByQuery');
		provider.getAll({author: 'J.K. Rowling'});
		const mockedParams = new HttpParams().append('author', 'J.K. Rowling');
		expect(service.getListByQuery).toHaveBeenCalledWith(mockedParams);
	});

	test('getAll() should call getList', () => {
		spyOn(service, 'getList');
		provider.getAll();
		expect(service.getList).toHaveBeenCalled();
	});

	test('getAll() should return 500 if backend return error', () => {
		spyOn(provider, 'getAll').and.returnValue(expectedError);
		expect(provider.getAll()).toEqual(expectedError);
	});
});
