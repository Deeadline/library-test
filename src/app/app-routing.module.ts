import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './features/auth/auth.module';
import { BookModule } from './features/book/book.module';
import { AuthGuard } from './guard/auth.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/auth/login',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		loadChildren: () => import('./features/auth/auth.module').then((f: { AuthModule: AuthModule }) => f.AuthModule)
	},
	{
		path: 'app',
		component: AppLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'book',
				loadChildren: () => import('./features/book/book.module').then((f: { BookModule: BookModule; }) => f.BookModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
