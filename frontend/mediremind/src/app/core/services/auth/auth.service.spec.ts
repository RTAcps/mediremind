import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginResponse, User } from '@models/entity-interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token and user in localStorage on login', () => {
    const mockResponse: LoginResponse = {
      token: 'mockToken',
      user: { id: '1', name: 'John Doe', role: 'user' } as User,
    };

    service.login('test@example.com', 'password123').subscribe();

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('token')).toBe(mockResponse.token);
    expect(localStorage.getItem('user')).toBe(
      JSON.stringify(mockResponse.user)
    );
  });

  it('should clear localStorage on logout', () => {
    localStorage.setItem('token', 'mockToken');
    localStorage.setItem(
      'user',
      JSON.stringify({ id: 1, name: 'John Doe', role: 'user' })
    );

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should return the token from localStorage', () => {
    localStorage.setItem('token', 'mockToken');
    expect(service.token).toBe('mockToken');
  });

  it('should return the current user from localStorage', () => {
    const mockUser = { id: 1, name: 'John Doe', role: 'user' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    expect(service.currentUser).toEqual(mockUser);
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem('token', 'mockToken');
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should return true if user has the specified role', () => {
    const mockUser = { id: 1, name: 'John Doe', role: 'admin' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    expect(service.hasRole('admin')).toBeTruthy();
  });

  it('should return false if user does not have the specified role', () => {
    const mockUser = { id: 1, name: 'John Doe', role: 'user' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    expect(service.hasRole('admin')).toBeFalsy();
  });
});
