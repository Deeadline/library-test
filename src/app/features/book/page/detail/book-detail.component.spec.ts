import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthDataProvider } from '../../../../data-providers/auth/auth.data-provider';
import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';

import { BookDetailComponent } from './book-detail.component';

describe('DetailComponent', () => {
	let component: BookDetailComponent;
	let fixture: ComponentFixture<BookDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
			declarations: [BookDetailComponent],
			providers: [
				FormBuilder,
				ReactiveFormsModule,
				FormsModule,
				AuthDataProvider, BookDataProvider],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});
});
