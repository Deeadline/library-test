import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BookInterface} from '../../models/book.interface';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public readonly API_URL = 'http://localhost:4200/';

  constructor(private http: HttpClient) {
  }

  getList(): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>(`${this.API_URL}books`);
  }

  getById(id: number): Observable<BookInterface> {
    return this.http.get<BookInterface>(`${this.API_URL}books/${id}`);
  }

  getListByQuery(query: HttpParams): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>(`${this.API_URL}books`, {params: query});
  }

  create(book: BookInterface): Observable<BookInterface> {
    return this.http.post<BookInterface>(`${this.API_URL}books`, book);
  }

  update(id: number, book: BookInterface): Observable<BookInterface> {
    return this.http.put<BookInterface>(`${this.API_URL}books/${id}`, book);
  }
}
