import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './page/signup/signup.component';
import {LoginComponent} from './page/login/login.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},
  {
    path: 'signup',
    component: SignupComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
