import {PermissionDirective} from './permission.directive';
import {BookListComponent} from '../../features/book/page/list/list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('PermissionDirective', () => {

  let fixture: ComponentFixture<BookListComponent>;
  let directive: PermissionDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [PermissionDirective, BookListComponent]
    }).createComponent(BookListComponent);
    fixture.detectChanges();
    directive = TestBed.inject(PermissionDirective);
  });

  test('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
