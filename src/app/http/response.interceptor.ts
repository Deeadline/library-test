import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {BookInterface} from '../models/book.interface';

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
    const requestMethod = request.url.match(/[^\/]+$/)[0];
    if (requestMethod === RequestMethodEnum.SIGNUP || requestMethod === RequestMethodEnum.LOGIN) {
      return of(new HttpResponse({status: 200, body: request.body}));
    } else if (requestMethod === RequestMethodEnum.BOOKS) {
      const localStorageBooks = JSON.parse(localStorage.getItem('books'));
      const books = localStorageBooks ? localStorageBooks as BookInterface[] : [mockedBook];
      if (request.method === 'GET') {
        if (request.params.keys().length) {
          const filters = Object.entries(request.params)
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
        }
        return of(new HttpResponse({status: 200, body: books}));
      }
      if (request.method === 'POST') {
        
      }
      return of(new HttpResponse({status: 200}));
    }
  }
}
