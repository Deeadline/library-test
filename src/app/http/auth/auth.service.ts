import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthRequestInterface } from '../../models/auth-request.interface';
import { UserInterface } from '../../models/user.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public readonly BASE_URL = 'http://localhost:4200/';

	constructor(
		private http: HttpClient,
		private router: Router
	) {
	}

	public isAuthenticated(): boolean {
		return localStorage.getItem('isAuthenticated') === 'true';
	}

	public login(payload: UserInterface): Observable<AuthRequestInterface> {
		return this.http.post<AuthRequestInterface>(`${this.BASE_URL}login`, payload);
	}

	public signup(payload: UserInterface): Observable<AuthRequestInterface> {
		return this.http.post<AuthRequestInterface>(`${this.BASE_URL}signup`, payload);
	}

	public logout(): void {
		localStorage.removeItem('isAuthenticated');
		localStorage.removeItem('user');
		this.router.navigate(['/auth/login']);
	}
}
