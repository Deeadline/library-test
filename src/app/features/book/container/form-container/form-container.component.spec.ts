import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookFormContainerComponent} from './form-container.component';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BookInterface} from '../../../../models/book.interface';

describe('FormContainerComponent', () => {
  let component: BookFormContainerComponent;
  let fixture: ComponentFixture<BookFormContainerComponent>;
  const mockedData = {
    id: null,
    description: null,
    imageUrl: null,
    author: 'J.K. Rowling',
    title: 'Harry Potter and the Philosopher Stone',
    publishingHouse: 'Media Rodzina',
    releasedYear: 2000
  } as BookInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormContainerComponent],
      providers: [
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        FormBuilder,
        MyErrorStateMatcher,
        MatInputModule,
        MatCardModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should create form', () => {
    spyOn(component, 'createForm');
    component.ngOnInit();
    expect(component.formGroup).toBeDefined();
  });

  test('should contain 4 required fields', () => {
    spyOn(component, 'createForm');
    component.ngOnInit();
    fixture.detectChanges();
    const requiredControls = Object.entries(component.formGroup.controls).map(([key, value]) => {
      if (value.validator) {
        const validator = value.validator({} as AbstractControl);
        if (validator && validator.required) {
          return value;
        }
      }
    }).filter(c => c);
    expect(requiredControls).toHaveLength(4);
  });

  test('should update form', () => {
    spyOn(component, 'createForm');
    component.model = mockedData;
    component.ngOnInit();
    fixture.detectChanges();
    component.patchForm();
    fixture.detectChanges();
    expect(component.formGroup.value).toEqual(mockedData);
  });

  test('should emit value', () => {
    spyOn(component.submitEvent, 'emit');
    spyOn(component, 'createForm');
    component.model = mockedData;
    component.ngOnInit();
    fixture.detectChanges();
    component.patchForm();
    fixture.detectChanges();
    component.submit();
    expect(component.submitEvent.emit).toHaveBeenCalled();
  });
});
