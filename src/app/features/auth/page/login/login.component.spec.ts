import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatCardModule} from '@angular/material/card';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher';
import {AuthDataProvider} from '../../../../data-providers/auth/auth.data-provider';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {UserInterface} from '../../../../models/user.interface';
import {of, throwError} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerMock: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [LoginComponent],
      providers: [
        FormsModule,
        ReactiveFormsModule,
        FormBuilder,
        FlexLayoutModule,
        MatCardModule,
        MyErrorStateMatcher,
        MatInputModule,
        AuthDataProvider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should create form', () => {
    expect(component.loginForm).toBeDefined();
  });

  test('should display 2 required inputs', () => {
    expect(fixture.debugElement.queryAll(By.css('input[required="required"]'))).toHaveLength(2);
  });

  test('Form should be invalid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  test('Form should be valid', () => {
    const login = {username: 'admin@admin.com', password: 'Administrat0r'} as UserInterface;
    component.loginForm.patchValue(login);
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
  });

  test('Service method should be called', () => {
    spyOn(component.authService, 'login').and.callThrough();
    const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r'} as UserInterface;
    component.loginForm.patchValue(user);
    fixture.detectChanges();
    component.submit();
    expect(component.authService.login).toHaveBeenCalled();
  });

  test('After submit loading should be displayed', () => {
    const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r'} as UserInterface;
    component.loginForm.patchValue(user);
    fixture.detectChanges();
    component.submit();
    expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeDefined();
  });

  test('Submit method should navigate to other route', () => {
    spyOn(component.authService, 'login').and.callFake(() => of({}));
    spyOn(routerMock, 'navigate');
    const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r'} as UserInterface;
    component.loginForm.patchValue(user);
    fixture.detectChanges();
    component.submit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/app/book']);
  });

  test('Signup button should navigate to other route', () => {
    spyOn(routerMock, 'navigate');
    spyOn(component, 'signup').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="button"]');
    button.click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/signup']);
  });

  test('Submit method should display snackBar', () => {
    spyOn(component.authService, 'login').and.returnValue(throwError({status: 500, error: 'Login failed'}));
    spyOn(component.snackBar, 'open');
    const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r'} as UserInterface;
    component.loginForm.patchValue(user);
    fixture.detectChanges();
    component.submit();
    expect(component.snackBar.open).toHaveBeenCalledWith(
      'Login failed', null, {
        verticalPosition: 'top', duration: 5000
      });
  });
});
