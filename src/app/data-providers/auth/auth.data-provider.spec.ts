import {TestBed} from '@angular/core/testing';

import {AuthDataProvider} from './auth.data-provider';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../http/auth/auth.service';
import {AuthRequestInterface} from '../../models/auth-request.interface';
import {UserInterface} from '../../models/user.interface';
import {RouterTestingModule} from '@angular/router/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from '../../http/request.interceptor';

describe('AuthService', () => {
  let dataProvider: AuthDataProvider;
  let authService: AuthService;
  let user: UserInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        AuthService,
        AuthDataProvider,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        }
      ]
    });
    dataProvider = TestBed.inject(AuthDataProvider);
    authService = TestBed.inject(AuthService);
    user = {username: 'admin@admin.com', password: 'admin2020', role: 'ROLE_ADMINISTRATOR'} as UserInterface;
  });

  test('should be created', () => {
    expect(dataProvider).toBeTruthy();
  });

  test('After login, authentication service property should contain user', () => {
    spyOn(dataProvider, 'login').and.returnValue({user} as AuthRequestInterface);
    dataProvider.login(user);
    dataProvider.user$.subscribe(_user => expect(_user).toBe(user));
  });

  test('isAuthenticated() should return true', () => {
    spyOn(dataProvider, 'isAuthenticated').and.returnValue(true);
    expect(dataProvider.isAuthenticated()).toBeTruthy();
  });

  test('isAuthenticated() should return false', () => {
    spyOn(dataProvider, 'isAuthenticated').and.returnValue(false);
    expect(dataProvider.isAuthenticated()).toBeFalsy();
  });

  test('After signup, authentication service property should contain user', () => {
    spyOn(dataProvider, 'signup').and.returnValue({user} as AuthRequestInterface);
    dataProvider.signup(user);
    dataProvider.user$.subscribe(_user => expect(_user).toBe(user));
  });

  test('After logout, authentication service property should not contain user', () => {
    dataProvider.logout();
    dataProvider.user$.subscribe(_user => expect(_user).toBeNull());
  });

  test('getRole() should return value on logged user', () => {
    spyOn(dataProvider, 'user$').and.returnValue(user);
    dataProvider.getRole().subscribe(role => expect(role).toEqual(user.role));
  });

  test('getRole() should be empty on unauthenticated user', () => {
    spyOn(dataProvider, 'user$').and.returnValue(null);
    dataProvider.getRole().subscribe(role => expect(role).toBeNull());
  });

  test('getUsername() should return value on logged user', () => {
    spyOn(dataProvider, 'user$').and.returnValue(user);
    dataProvider.currentUser().subscribe(username => expect(username).toEqual(user.username));
  });

  test('getUsername() should be empty on unauthenticated user', () => {
    spyOn(dataProvider, 'user$').and.returnValue(null);
    dataProvider.currentUser().subscribe(username => expect(username).toBeNull());
  });
});
