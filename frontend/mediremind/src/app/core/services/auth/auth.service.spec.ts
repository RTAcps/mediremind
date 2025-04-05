import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set _isLoggedIn to true when login is called', () => {
    service.login();
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should set _isLoggedIn to false when logout is called', () => {
    service.login(); 
    service.logout();
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should return false for isAuthenticated by default', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
