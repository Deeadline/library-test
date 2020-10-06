import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../../http/auth/auth.service';

@Component({
	selector: 'app-app-layout',
	templateUrl: './app-layout.component.html',
	styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
	public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map((result: BreakpointState) => result.matches),
			shareReplay()
		);

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly authService: AuthService
	) {
	}

	public ngOnInit(): void {
	}

	public logout(): void {
		this.authService.logout();
	}

}
