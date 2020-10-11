import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { BookInterface } from '../models/book.interface';
import { UserNoteInterface } from '../models/user-note.interface';

enum RequestMethodEnum {
	LOGIN = 'login',
	SIGNUP = 'signup',
	LOGOUT = 'logout',
	BOOKS = 'books',
}

const mockedBook = {
	id: 1,
	imageUrl: 'https://picsum.photos/250',
	author: 'J.K. Rowling',
	title: 'Harry Potter and the Philosopher Stone',
	publishingHouse: 'Media Rodzina',
	releasedYear: 2000,
	averageNote: 4
} as BookInterface;

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

	constructor() {
	}

	// @ts-ignore
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const requestUrl = request.url.split('/');
		const id = +(requestUrl[requestUrl.length - 1]);
		let requestMethod = requestUrl.pop();
		if (id) {
			requestMethod = requestUrl.pop();
		}
		if (requestMethod === RequestMethodEnum.SIGNUP || requestMethod === RequestMethodEnum.LOGIN) {
			// @ts-ignore
			const status = request.body['message'] ? 500 : 200;
			if (status === 500) {
				// @ts-ignore
				return throwError({message: request.body['message']});
			}
			return of(new HttpResponse({status, body: request.body}));
		} else if (requestMethod === RequestMethodEnum.BOOKS) {
			const localStorageBooks = JSON.parse(localStorage.getItem('books') as string);
			const books = (localStorageBooks ? localStorageBooks as BookInterface[] : [])
				.sort((a: BookInterface, b: BookInterface) => (b.id as number) - (a.id as number));
			switch (request.method) {
				case 'GET':
					return this.handleGET(request.params, id, books);
				case 'POST':
					return this.handlePOST(request, books);
				case 'PUT':
					return this.handlePUT(request, id, books);
				default:
					return of(new HttpResponse({status: 200}));
			}
		}
	}

	private handleGET(params: HttpParams, id: number, books: BookInterface[]): Observable<HttpResponse<unknown>> {
		if (params.keys().length) {
			const filters = Object.entries(params)
				.filter(([key, _]: [string, Map<string, number[] | string>]) => key === 'map')
				.map(([_, value]: [string, Map<string, number[] | string>]) => value).pop() as Map<string, number[] | string>;
			const filteredBooks = books.filter((book: BookInterface) => {
				for (const [key, values] of filters) {
					if (key === 'author' && values instanceof String) {
						if (values[0].includes(book[key])) {
							return book;
						}
					} else {
						// @ts-ignore
						if (values.includes(book[key])) {
							return book;
						}
					}
				}
			});
			return of(new HttpResponse({status: 200, body: filteredBooks}));
		} else if (id) {
			const findBook = books.find((book: BookInterface) => book.id === id);
			return of(new HttpResponse({status: 200, body: findBook}));
		}
		return of(new HttpResponse({status: 200, body: books}));
	}

	private handlePOST(request: HttpRequest<unknown>, books: BookInterface[]): Observable<HttpResponse<unknown>> {
		const lastId = books.map((book: BookInterface) => book.id).pop() as number;
		const properId = lastId === undefined ? 0 : lastId;
		const body = request.body as BookInterface;
		const newBook = {...body, id: properId + 1} as BookInterface;
		const newBooks = [...books, newBook];
		localStorage.setItem('books', JSON.stringify(newBooks));
		return of(new HttpResponse({status: 200, body: newBooks}));
	}

	private handlePUT(request: HttpRequest<unknown>, id: number, books: BookInterface[]): Observable<HttpResponse<unknown>> {
		const desiredBook = books.find((book: BookInterface) => book.id === id);
		const body = request.body as BookInterface;
		const modifiedBook = {...desiredBook, ...body} as BookInterface;
		modifiedBook.averageNote = this.calculateAverageNote(modifiedBook.notes as UserNoteInterface[]);
		const modifiedBooks = books.map((book: BookInterface) => {
			if (book.id === id) {
				return modifiedBook;
			}
			return book;
		});
		localStorage.setItem('books', JSON.stringify(modifiedBooks));
		return of(new HttpResponse({status: 200, body: modifiedBook}));
	}

	private calculateAverageNote(notes: UserNoteInterface[]): number {
		if (notes) {
			return notes.reduce((acc: number, curr: UserNoteInterface) => acc + curr.note, 0) / notes.length;
		}
		return 0;
	}
}
