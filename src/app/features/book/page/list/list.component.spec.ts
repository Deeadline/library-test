import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookListComponent} from './list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthDataProvider} from '../../../../data-providers/auth/auth.data-provider';
import {BookDataProvider} from '../../../../data-providers/book/book.data-provider';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PermissionDirective} from '../../../../shared/directive/permission.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
