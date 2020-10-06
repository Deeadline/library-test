import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInterface } from '../models/user.interface';

enum RequestMethodEnum {
	LOGIN = 'login',
	SIGNUP = 'signup',
	LOGOUT = 'logout'
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

	constructor() {
	}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const requestMethod = request.url.match(/[^\/]+$/)[0];
		let newRequest = request;
		let users = [];
		if (JSON.parse(localStorage.getItem('users'))) {
			users = JSON.parse(localStorage.getItem('users')) as UserInterface[];
		}
		switch (requestMethod) {
			case RequestMethodEnum.SIGNUP: {
				const user = request.body as UserInterface;
				user.role = user.username.includes('admin') ? 'ROLE_ADMINISTRATOR' : null;
				if (users.map((u: UserInterface) => u.username).includes(user.username)) {
					newRequest = request.clone({
						body: {
							user: null,
							message: 'Signup failed'
						}
					});
				} else {
					users.push(user);
					localStorage.setItem('users', JSON.stringify(users));
					localStorage.setItem('isAuthenticated', 'true');
					localStorage.setItem('user', JSON.stringify(user));
					newRequest = request.clone({
						body: {
							user,
							message: null
						}
					});
				}
				return next.handle(newRequest);
			}
			case RequestMethodEnum.LOGIN: {
				const user = request.body as UserInterface;
				const foundUser = users.find((u) => u.username === user.username && u.password === user.password);
				if (foundUser) {
					localStorage.setItem('isAuthenticated', 'true');
					localStorage.setItem('user', JSON.stringify(request.body));
					newRequest = request.clone({
						body: {
							user: foundUser,
							message: null
						}
					});
				} else {
					localStorage.setItem('isAuthenticated', 'false');
					newRequest = request.clone({
						body: {
							user: null,
							message: 'Login failed!'
						}
					});
				}
				return next.handle(newRequest);
			}
			default:
				return next.handle(newRequest);
		}
	}
}
