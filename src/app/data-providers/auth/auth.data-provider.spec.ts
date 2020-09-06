import {TestBed} from '@angular/core/testing';

import {AuthDataProvider} from './auth.data-provider';

describe('AuthService', () => {
  let service: AuthDataProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDataProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
