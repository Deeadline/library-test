import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from '../request.interceptor';
import {AuthRequestInterface} from '../../models/auth-request.interface';
import {UserInterface} from '../../models/user.interface';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        }
      ]
    });
    routerMock = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  test('The auth service is created', () => {
    expect(service).toBeTruthy();
  });

  test('isAuthenticated() should return false', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  test('isAuthenticated() should return true', () => {
    localStorage.setItem('isAuthenticated', 'true');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  test('Login() should return provided user', () => {
    let result: AuthRequestInterface = null;
    const loginRequest = {username: 'admin@test.com', password: 'admin2020'} as UserInterface;
    service.login(loginRequest).subscribe(response => {
      result = response;
    });
    const request = httpTestingController.expectOne(`${service.BASE_URL}login`);
    request.flush({
      user: loginRequest
    });
    httpTestingController.verify();
    expect(result.user).toEqual(loginRequest);
  });

  test('Login() should contain message', () => {
    let result: AuthRequestInterface = null;
    const expectedMessage = 'login failed';
    const loginRequest = {username: 'admin@test.com', password: 'admin2020'} as UserInterface;
    service.login(loginRequest).subscribe(response => {
      result = response;
    });
    const request = httpTestingController.expectOne(`${service.BASE_URL}login`);
    request.flush({
      message: expectedMessage
    });
    httpTestingController.verify();
    expect(result.message).toEqual(expectedMessage);
  });

  test('Signup() should return new user', () => {
    let result: AuthRequestInterface = null;
    const signupRequest = {username: 'admin', password: 'test2020'} as UserInterface;
    service.signup(signupRequest).subscribe(response => {
      result = response;
    });
    const request = httpTestingController.expectOne(`${service.BASE_URL}signup`);
    request.flush({
      user: {
        ...signupRequest,
        id: 1
      }
    });
    httpTestingController.verify();
    expect(result.user.id).toBeDefined();
  });

  test('Signup() should return error message', () => {
    let result: AuthRequestInterface = null;
    const expectedMessage = 'signup failed';
    const signupRequest = {username: 'admin', password: 'test2020'} as UserInterface;
    service.signup(signupRequest).subscribe(response => {
      result = response;
    });
    const request = httpTestingController.expectOne(`${service.BASE_URL}signup`);
    request.flush({
      message: expectedMessage
    });
    httpTestingController.verify();
    expect(result.message).toEqual(expectedMessage);
  });

  test('Logout() should remove isAuthenticated from localStorage when user is logged', () => {
    localStorage.setItem('isAuthenticated', 'true');
    spyOn(routerMock, 'navigate');
    service.logout();
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });

  test('Logout() should navigate to login after user logout', () => {
    const navigateSpy = spyOn(routerMock, 'navigate');
    service.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });
});
