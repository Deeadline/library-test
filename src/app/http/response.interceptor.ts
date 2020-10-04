import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {BookInterface} from '../models/book.interface';
import {UserNoteInterface} from '../models/user-note.interface';

enum RequestMethodEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  LOGOUT = 'logout',
  BOOKS = 'books',
}

const mockedBook = {
  id: 1,
  description: null,
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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestUrl = request.url.split('/');
    const id = +(requestUrl[requestUrl.length - 1]);
    let requestMethod = requestUrl.pop();
    if (id) {
      requestMethod = requestUrl.pop();
    }
    if (requestMethod === RequestMethodEnum.SIGNUP || requestMethod === RequestMethodEnum.LOGIN) {
      const status = (request.body as any).message !== null ? 500 : 200;
      if (status === 500) {
        return throwError({message: (request.body as any).message});
      }
      return of(new HttpResponse({status, body: request.body}));
    } else if (requestMethod === RequestMethodEnum.BOOKS) {
      const localStorageBooks = JSON.parse(localStorage.getItem('books'));
      const books = (localStorageBooks ? localStorageBooks as BookInterface[] : [mockedBook])
        .sort((a, b) => b.id - a.id);
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
        .filter(([key, value]) => key === 'map')
        .map(([key, value]: [string, Map<string, string[]>]) => value).pop();
      const filteredBooks = books.filter(book => {
        for (const [key, values] of filters) {
          if (key === 'author') {
            if (values[0].includes(book[key])) {
              return book;
            }
          } else {
            if (values.includes(book[key])) {
              return book;
            }
          }
        }
      });
      return of(new HttpResponse({status: 200, body: filteredBooks}));
    } else if (id) {
      const findBook = books.find(book => book.id === id);
      return of(new HttpResponse({status: 200, body: findBook}));
    }
    return of(new HttpResponse({status: 200, body: books}));
  }

  private handlePOST(request: HttpRequest<unknown>, books: BookInterface[]): Observable<HttpResponse<unknown>> {
    const lastId = books.map(book => book.id).pop();
    const body = request.body as BookInterface;
    const newBook = {...body, id: lastId + 1} as BookInterface;
    const newBooks = [...books, newBook];
    localStorage.setItem('books', JSON.stringify(newBooks));
    return of(new HttpResponse({status: 200, body: newBooks}));
  }

  private handlePUT(request: HttpRequest<unknown>, id: number, books: BookInterface[]): Observable<HttpResponse<unknown>> {
    const desiredBook = books.find(book => book.id === id);
    const body = request.body as BookInterface;
    const modifiedBook = {...desiredBook, ...body} as BookInterface;
    modifiedBook.averageNote = this.calculateAverageNote(modifiedBook.notes);
    const modifiedBooks = books.map(book => {
      if (book.id === id) {
        return modifiedBook;
      }
      return book;
    });
    localStorage.setItem('books', JSON.stringify(modifiedBooks));
    return of(new HttpResponse({status: 200, body: modifiedBook}));
  }

  private calculateAverageNote(notes: UserNoteInterface[]): number {
    return notes.reduce((acc, curr) => acc += curr.note, 0) / notes.length;
  }
}
