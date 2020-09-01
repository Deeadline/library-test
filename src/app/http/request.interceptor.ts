import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

enum RequestMethodEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  LOGOUT = 'logout'
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestMethod = request.url.match(/[^\/]+$/)[0];
    switch (requestMethod) {
      case RequestMethodEnum.SIGNUP:
      case RequestMethodEnum.LOGIN: {
        localStorage.setItem('isAuthenticated', 'true');
        request = request.clone({
          body: {
            user: request.body,
            message: null
          }
        });
        return next.handle(request);
      }
      case RequestMethodEnum.LOGOUT: {
        request = request.clone({
          body: {
            user: null,
            message: null
          },
        });
        localStorage.setItem('isAuthenticated', 'false');
        return next.handle(request);
      }
      default:
        return next.handle(request);
    }
  }
}
