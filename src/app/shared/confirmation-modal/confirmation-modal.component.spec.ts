import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BookInterface } from '../../models/book.interface';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import createSpy = jasmine.createSpy;

describe('ConfirmationModalComponent', () => {
	let component: ConfirmationModalComponent;
	let fixture: ComponentFixture<ConfirmationModalComponent>;
	let element: HTMLElement;
	const model = {
		isLoaned: false
	} as BookInterface;
	const mockDialogRef = {
		close: createSpy('close')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatButtonModule,
				MatDialogModule
			],
			providers: [
				{
					provide: MAT_DIALOG_DATA,
					useValue: model
				},
				{
					provide: MatDialogRef,
					useValue: mockDialogRef
				}
			],
			declarations: [ConfirmationModalComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmationModalComponent);
		component = fixture.componentInstance;
		element = fixture.debugElement.nativeElement;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('should display title for returning book', () => {
		component.book.isLoaned = true;
		fixture.detectChanges();
		expect(element.querySelector('h1')?.textContent).toContain('Do you want to return this book?');
	});

	test('should display title for loaning book', () => {
		expect(element.querySelector('h1')?.textContent).toContain('Do you want to loan this book?');
	});

	test('should contain one div', () => {
		expect(element.querySelectorAll('div')).toHaveLength(1);
	});

	test('should contain two buttons', () => {
		expect(element.querySelectorAll('button')).toHaveLength(2);
	});

	test('should close dialog if button is clicked', () => {
		element.querySelectorAll('button')[0].click();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});

	test('should close dialog with true value', () => {
		(element.querySelector('#true-close') as HTMLButtonElement).click();
		expect(component.dialogRef.close).toHaveBeenCalledWith(true);
	});
});
