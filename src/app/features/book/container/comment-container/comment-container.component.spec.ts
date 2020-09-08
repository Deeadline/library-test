import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookCommentContainerComponent} from './comment-container.component';
import {UserCommentInterface} from '../../../../models/user-comment.interface';
import {By} from '@angular/platform-browser';

describe('CommentContainerComponent', () => {
  let component: BookCommentContainerComponent;
  let fixture: ComponentFixture<BookCommentContainerComponent>;
  const mockedData = {
    createdBy: {username: 'admin@admin.com'},
    comment: 'Good book. I really recommend it!',
    createdAt: new Date()
  } as UserCommentInterface;

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
    expect(fixture.debugElement.query(By.css('#createdAt'))).toBeTruthy();
  });

  test('should display username', () => {
    expect(fixture.debugElement.query(By.css('#username'))).toBeTruthy();
  });

  test('should display comment', () => {
    expect(fixture.debugElement.query(By.css('#comment'))).toBeTruthy();
  });
});
