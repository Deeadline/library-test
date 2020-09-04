import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../http/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserInterface} from '../../../models/user.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
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
      const numbers = (control.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,100}$/g) || []).length;
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
        }, ({error}: HttpErrorResponse) => {
          this.isLoading = false;
          this.snackBar.open(error, null, {verticalPosition: 'top', duration: 5000});
        }, () => {
          this.router.navigate(['/app/book']);
        });
    }
  }
}
