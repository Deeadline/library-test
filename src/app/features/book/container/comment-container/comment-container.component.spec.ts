import { DatePipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserCommentInterface } from '../../../../models/user-comment.interface';

import { BookCommentContainerComponent } from './comment-container.component';

describe('CommentContainerComponent', () => {
	let component: BookCommentContainerComponent;
	let fixture: ComponentFixture<BookCommentContainerComponent>;
	const mockedData = {
		createdBy: {username: 'admin@admin.com'},
		comment: 'Good book. I really recommend it!',
		createdAt: new Date()
	} as UserCommentInterface;
	const datePipe = new DatePipe('en-US');

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookCommentContainerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookCommentContainerComponent);
		component = fixture.componentInstance;
		component.comment = mockedData;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});

	test('should display date', () => {
		expect(fixture.debugElement.query(By.css('#createdAt')).nativeElement.textContent).toContain(datePipe.transform(mockedData.createdAt, 'medium'));
	});

	test('should display username', () => {
		expect(fixture.debugElement.query(By.css('#username')).nativeElement.textContent).toContain(mockedData.createdBy.username);
	});

	test('should display comment', () => {
		expect(fixture.debugElement.query(By.css('#comment')).nativeElement.textContent).toContain(mockedData.comment);
	});
});
