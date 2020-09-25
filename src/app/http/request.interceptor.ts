import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../models/user.interface';

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
        const user = request.body as UserInterface;
        user.role = user.username.includes('admin') ? 'ROLE_ADMINISTRATOR' : null;
        localStorage.setItem('user', JSON.stringify(request.body));
        request = request.clone({
          body: {
            user,
            message: null
          }
        });
        return next.handle(request);
      }
      default:
        return next.handle(request);
    }
  }
}
