import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { BookInterface } from '../../../../models/book.interface';
import { BookFormContainerComponent } from '../../container/form-container/form-container.component';

import { BookCreateComponent } from './create.component';

describe('BookCreateComponent', () => {
	let component: BookCreateComponent;
	let fixture: ComponentFixture<BookCreateComponent>;
	let routerMock: Router;
	let debugElement: DebugElement;
	const mockedBook = {
		author: 'J.K. Rowling',
		title: 'Harry Potter and the Philosopher Stone',
		publishingHouse: 'Media Rodzina',
		releasedYear: 2000
	} as BookInterface;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				MatSnackBarModule,
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([])],
			providers: [
				MatProgressSpinnerModule,
				FormBuilder,
				FormsModule,
				ReactiveFormsModule,
				MatInputModule,
				MatCardModule,
				FlexLayoutModule,
				BookDataProvider,
			],
			declarations: [BookCreateComponent, BookFormContainerComponent],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookCreateComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		routerMock = TestBed.inject(Router);
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('should display loader', () => {
		component.isLoading = true;
		fixture.detectChanges();
		expect(debugElement.query(By.css('mat-spinner'))).toBeTruthy();
	});

	test('should display section', () => {
		expect(debugElement.query(By.css('.grid-container'))).toBeTruthy();
	});

	test('should display form-container', () => {
		expect(debugElement.query(By.css('app-book-form-container'))).toBeTruthy();
	});

	test('should call create method on submit', () => {
		spyOn(component.bookDataProvider, 'create').and.callFake(() => of({}));
		component.onSubmit(mockedBook);
		expect(component.bookDataProvider.create).toHaveBeenCalled();
	});

	test('should display snackBar on complete create', () => {
		spyOn(component.bookDataProvider, 'create').and.callFake(() => of({}));
		spyOn(component.snackBar, 'open');
		component.onSubmit(mockedBook);
		expect(component.snackBar.open).toHaveBeenCalledWith(
			'Book has been successfully added', null, {
				verticalPosition: 'top', duration: 5000
			});
	});

	test('should redirect to /app/book on complete create', () => {
		spyOn(routerMock, 'navigate');
		spyOn(component.bookDataProvider, 'create').and.callFake(() => of({}));
		spyOn(component.snackBar, 'open');
		component.onSubmit(mockedBook);
		expect(routerMock.navigate).toHaveBeenCalledWith(['/app/book']);
	});

	test('should display snackBar on error create', () => {
		spyOn(component.bookDataProvider, 'create').and.returnValue(
			throwError({status: 500, error: 'Book has not been added'})
		);
		spyOn(component.snackBar, 'open');
		component.onSubmit(mockedBook);
		expect(component.snackBar.open).toHaveBeenCalledWith(
			'Book has not been added', null, {
				verticalPosition: 'top', duration: 5000
			});
	});
});
