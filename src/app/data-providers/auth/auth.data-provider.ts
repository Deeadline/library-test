import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';

import { AuthService } from '../../http/auth/auth.service';
import { AuthRequestInterface } from '../../models/auth-request.interface';
import { UserInterface } from '../../models/user.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthDataProvider {
	public user$: Observable<UserInterface>;
	private readonly userSource = new BehaviorSubject<UserInterface>(null);

	constructor(
		private readonly authService: AuthService
	) {
		this.user$ = this.userSource.asObservable().pipe(
			startWith(JSON.parse(localStorage.getItem('user')) as UserInterface)
		);
	}

	public isAuthenticated(): boolean {
		return this.authService.isAuthenticated();
	}

	public login(request: UserInterface): Observable<AuthRequestInterface> {
		return this.authService.login(request)
			.pipe(
				tap(({user}: { user: UserInterface }) => this.userSource.next(user))
			);
	}

	public signup(request: UserInterface): Observable<AuthRequestInterface> {
		return this.authService.signup(request)
			.pipe(
				tap(({user}: { user: UserInterface }) => this.userSource.next(user))
			);
	}

	public logout(): void {
		this.authService.logout();
		this.userSource.next(null);
	}

	public getRole(): Observable<string> {
		return this.user$.pipe(
			filter((user: UserInterface) => !!user),
			map((user: UserInterface) => user.role)
		);
	}

	public currentUser(): Observable<UserInterface> {
		return this.user$.pipe(
			filter((user: UserInterface) => !!user)
		);
	}
}
