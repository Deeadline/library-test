import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserInterface} from '../../../../models/user.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthDataProvider} from '../../../../data-providers/auth/auth.data-provider';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
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
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, this.validatePassword]],
      repeatPassword: [null, [Validators.required, this.validatePasswordMatch]],
      favouriteAuthor: [null],
      favouriteBook: [null]
    });
  }

  public validatePassword(control: FormControl): ValidationErrors | null {
    if (control.parent && control.value !== null && control.value.length > 0) {
      const numbers = (control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g) || []).length;
      return (numbers === 0 || numbers === control.value.length) ?
        {regex: true} : null;
    }
    return null;
  }

  public validatePasswordMatch(control: FormControl): ValidationErrors | null {
    if (control.parent) {
      return (control.value !== control.parent.get('password').value) ? {notMatch: true} : null;
    }
    return null;
  }

  public submit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.signupForm.value as UserInterface)
        .subscribe(() => {
        }, (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.snackBar.open(error.message, null, {verticalPosition: 'top', duration: 5000});
        }, () => {
          this.router.navigate(['/app/book']);
        });
    }
  }
}
