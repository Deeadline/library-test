import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AuthDataProvider } from '../../../../data-providers/auth/auth.data-provider';
import { MyErrorStateMatcher } from '../../../../shared/error-state-matcher';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
	let component: SignupComponent;
	let fixture: ComponentFixture<SignupComponent>;
	let routerMock: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSnackBarModule,
				BrowserAnimationsModule,
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([])
			],
			declarations: [SignupComponent],
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
		fixture = TestBed.createComponent(SignupComponent);
		routerMock = TestBed.inject(Router);
		component = fixture.componentInstance;
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
		expect(component.signupForm).toBeDefined();
	});

	test('should contain 3 required fields', () => {
		const requiredControls = Object.entries(component.signupForm.controls)
			.filter(([_, value]: [string, AbstractControl]) => {
				if (value.validator) {
					const validator = value.validator({} as AbstractControl);
					if (validator && validator.required) {
						return true;
					}
				}
				return false;
			});
		expect(requiredControls).toHaveLength(3);
	});

	test('should display 5 inputs, including 3 required', () => {
		expect(fixture.debugElement.queryAll(By.css('mat-form-field'))).toHaveLength(5);
		expect(fixture.debugElement.queryAll(By.css('input[required="required"]'))).toHaveLength(3);
	});

	test('Form should be invalid', () => {
		expect(component.signupForm.valid).toBeFalsy();
	});

	test('Form should be valid', () => {
		const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r', repeatPassword: 'Adm!nistrat0r'};
		component.signupForm.patchValue(user);
		fixture.detectChanges();
		expect(component.signupForm.valid).toBeTruthy();
	});

	test('Service method should be called', () => {
		spyOn(component.authService, 'signup').and.callThrough();
		const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r', repeatPassword: 'Adm!nistrat0r'};
		component.signupForm.patchValue(user);
		fixture.detectChanges();
		component.submit();
		expect(component.authService.signup).toHaveBeenCalled();
	});

	test('After submit loading should be displayed', () => {
		const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r', repeatPassword: 'Adm!nistrat0r'};
		component.signupForm.patchValue(user);
		fixture.detectChanges();
		component.submit();
		expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeDefined();
	});

	test('Submit method should navigate to other route', () => {
		spyOn(component.authService, 'signup').and.callFake(() => of({}));
		spyOn(routerMock, 'navigate');
		const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r', repeatPassword: 'Adm!nistrat0r'};
		component.signupForm.patchValue(user);
		fixture.detectChanges();
		component.submit();
		expect(routerMock.navigate).toHaveBeenCalledWith(['/app/book']);
	});

	test('Submit method should display snackBar', () => {
		spyOn(component.authService, 'signup').and.returnValue(throwError({status: 500, message: 'Signup failed'}));
		spyOn(component.snackBar, 'open');
		const user = {username: 'admin@admin.com', password: 'Adm!nistrat0r', repeatPassword: 'Adm!nistrat0r'};
		component.signupForm.patchValue(user);
		fixture.detectChanges();
		component.submit();
		expect(component.snackBar.open).toHaveBeenCalledWith(
			'Signup failed', undefined, {
				verticalPosition: 'top', duration: 5000
			});
	});

});
