import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookInterface } from '../../models/book.interface';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	public readonly API_URL = 'http://localhost:4200/';

	constructor(private readonly http: HttpClient) {
	}

	public getList(): Observable<BookInterface[]> {
		return this.http.get<BookInterface[]>(`${this.API_URL}books`);
	}

	public getById(id: number): Observable<BookInterface> {
		return this.http.get<BookInterface>(`${this.API_URL}books/${id}`);
	}

	public getListByQuery(query: HttpParams): Observable<BookInterface[]> {
		return this.http.get<BookInterface[]>(`${this.API_URL}books`, {params: query});
	}

	public create(book: BookInterface): Observable<BookInterface> {
		return this.http.post<BookInterface>(`${this.API_URL}books`, book);
	}

	public update(id: number, book: BookInterface): Observable<BookInterface> {
		return this.http.put<BookInterface>(`${this.API_URL}books/${id}`, book);
	}
}
