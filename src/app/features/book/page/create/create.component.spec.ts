import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookCreateComponent} from './create.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BookDataProvider} from '../../../../data-providers/book/book.data-provider';
import {BookFormContainerComponent} from '../../container/form-container/form-container.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
