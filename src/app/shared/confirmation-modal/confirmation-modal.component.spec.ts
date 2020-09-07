import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationModalComponent} from './confirmation-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BookInterface} from '../../models/book.interface';
import createSpy = jasmine.createSpy;

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let element: HTMLElement;
  const model = {} as BookInterface;
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

  test('should display title with proper content', () => {
    expect(element.querySelector('h1').textContent).toEqual('Do you want to do this action?');
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
