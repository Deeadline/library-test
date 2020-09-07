import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCommentContainerComponent } from './comment-container.component';

describe('CommentContainerComponent', () => {
  let component: BookCommentContainerComponent;
  let fixture: ComponentFixture<BookCommentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCommentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
