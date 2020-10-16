import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { BookInterface } from '../../../../models/book.interface';
import { BookFormContainerComponent } from '../../container/form-container/form-container.component';

import { BookEditComponent } from './edit.component';

describe('BookEditComponent', () => {
	let component: BookEditComponent;
	let fixture: ComponentFixture<BookEditComponent>;
	let routerMock: Router;
	const mockActivatedRoute = {
		snapshot: {
			paramMap: convertToParamMap({book_id: 1})
		}
	};

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
				RouterTestingModule.withRoutes([])
			],
			providers: [
				MatProgressSpinnerModule,
				FormBuilder,
				FormsModule,
				ReactiveFormsModule,
				MatInputModule,
				MatCardModule,
				FlexLayoutModule,
				BookDataProvider,
				{
					provide: ActivatedRoute,
					useValue: mockActivatedRoute
				}
			],
			declarations: [BookEditComponent, BookFormContainerComponent],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookEditComponent);
		component = fixture.componentInstance;
		routerMock = TestBed.inject(Router);
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('should not display loader', () => {
		component.isLoading = false;
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeNull();
	});

	test('should display loader', () => {
		expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeTruthy();
	});

	test('should display section if loading end', () => {
		component.isLoading = false;
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css('.grid-container'))).toBeTruthy();
	});

	test('should display form container', () => {
		component.isLoading = false;
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css('app-book-form-container'))).toBeTruthy();
	});

	test('should call getById method', () => {
		spyOn(component.dataProvider, 'getById').and.callFake(() => of({}));
		component.ngOnInit();
		expect(component.dataProvider.getById).toHaveBeenCalled();
	});

	test('should call update method on submit', () => {
		spyOn(component.dataProvider, 'update').and.callFake(() => of({}));
		component.onSubmit(mockedBook);
		expect(component.dataProvider.update).toHaveBeenCalled();
	});

	test('should display snackBar on complete update', () => {
		spyOn(component.dataProvider, 'update').and.callFake(() => of({}));
		spyOn(component.snackBar, 'open');
		component.onSubmit(mockedBook);
		expect(component.snackBar.open).toHaveBeenCalledWith(
			'Book has been successfully modified', undefined, {
				verticalPosition: 'top', duration: 5000
			});
	});

	test('should redirect to /app/book on complete update', () => {
		spyOn(routerMock, 'navigate');
		spyOn(component.dataProvider, 'update').and.callFake(() => of({}));
		spyOn(component.snackBar, 'open');
		component.onSubmit(mockedBook);
		expect(routerMock.navigate).toHaveBeenCalledWith(['/app/book']);
	});

	test('should display snackBar on error update', () => {
		spyOn(component.dataProvider, 'update').and.returnValue(throwError({status: 500, error: 'Book has not been modified'}));
		spyOn(component.snackBar, 'open');
		component.onSubmit(mockedBook);
		expect(component.snackBar.open).toHaveBeenCalledWith(
			'Book has not been modified', undefined, {
				verticalPosition: 'top', duration: 5000
			});
	});
});
