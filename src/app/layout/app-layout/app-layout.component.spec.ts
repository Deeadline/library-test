import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppLayoutComponent} from './app-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthService} from '../../http/auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [AppLayoutComponent],
      providers: [
        MatSidenavModule,
        MatListModule,
        FlexLayoutModule,
        MatDividerModule,
        MatIconModule,
        MatToolbarModule,
        AuthService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
