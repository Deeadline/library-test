import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from '../http/auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerMock: Router;
  const routeSnapshotMock: any = {url: '/app/book', snapshot: {}};
  const routeMock: any = {snapshot: {}};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService, AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    routerMock = TestBed.inject(Router);
  });

  test('should be created', () => {
    expect(guard).toBeTruthy();
  });

  test('should redirect to login page when enter unauthorized user', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(routerMock, 'navigate');
    guard.canActivate(routeMock, routeSnapshotMock);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  test('should allow go to page when enter authorized user', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeSnapshotMock)).toBeTruthy();
  });
});
