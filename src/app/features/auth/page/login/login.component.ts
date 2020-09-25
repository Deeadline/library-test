import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserInterface} from '../../../../models/user.interface';
import {AuthDataProvider} from '../../../../data-providers/auth/auth.data-provider';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoading = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthDataProvider,
    public router: Router,
    public snackBar: MatSnackBar,
    public errorStateMatcher: MyErrorStateMatcher
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public submit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value as UserInterface)
        .subscribe(() => {
        }, () => {
          this.isLoading = false;
          this.snackBar.open('Authentication failed', null, {
            verticalPosition: 'top', duration: 5000
          });
        }, () => {
          this.isLoading = false;
          this.router.navigate(['/app/book']);
        });
    }
  }

  public signup(): void {
    this.router.navigate(['/auth/signup']);
  }

}
