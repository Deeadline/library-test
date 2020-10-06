import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthDataProvider } from '../../../../data-providers/auth/auth.data-provider';
import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { PermissionDirective } from '../../../../shared/directive/permission.directive';

import { BookListComponent } from './list.component';

describe('BookListComponent', () => {
	let component: BookListComponent;
	let fixture: ComponentFixture<BookListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatDialogModule,
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([])
			],
			providers: [
				MatIconModule,
				FormsModule,
				AuthDataProvider,
				BookDataProvider,
				FlexLayoutModule
			],
			declarations: [
				PermissionDirective,
				BookListComponent
			],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});
});
