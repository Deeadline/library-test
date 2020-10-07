import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

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
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		if (this.authService.isAuthenticated()) {
			return true;
		}
		return this.router.navigate(['/auth/login']);
	}

}
