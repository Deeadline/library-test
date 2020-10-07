import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';

@NgModule({
	declarations: [LoginComponent, SignupComponent],
	imports: [
		SharedModule,
		AuthRoutingModule,
		ReactiveFormsModule
	],
	exports: [
		RouterModule
	]
})
export class AuthModule {
}
