import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {BookInterface} from '../models/book.interface';
import {UserInterface} from '../models/user.interface';

enum RequestMethodEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  LOGOUT = 'logout',
  BOOKS = 'books',
}

const mockedBook = {
  id: 1,
  description: null,
  imageUrl: null,
  author: 'J.K. Rowling',
  title: 'Harry Potter and the Philosopher Stone',
  publishingHouse: 'Media Rodzina',
  releasedYear: 2000
} as BookInterface;

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestMethod = request.url.match(/[^\/]+$/)[0];
    if (requestMethod === RequestMethodEnum.SIGNUP || requestMethod === RequestMethodEnum.LOGIN) {
      {
        return of(new HttpResponse({status: 200, body: request.body}));
      }
    } else if (requestMethod === RequestMethodEnum.BOOKS) {
      if (request.method === 'GET') {
        if (request.params.keys()) {
          return of(new HttpResponse({status: 200, body: [mockedBook]}));
        }
      }
      return of(new HttpResponse({status: 200}));
    }
  }
}
