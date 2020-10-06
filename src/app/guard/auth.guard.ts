import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../http/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): UrlTree | boolean {
		if (this.authService.isAuthenticated()) {
			return true;
		}
		this.router.navigate(['/auth/login']);
	}

}
