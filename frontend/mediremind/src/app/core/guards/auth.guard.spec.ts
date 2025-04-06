import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let mockAuthService: { isLoggedIn: jest.Mock, hasRole: jest.Mock };
  let mockRouter: { navigate: jest.Mock };

  beforeEach(() => {
    mockAuthService = { 
      isLoggedIn: jest.fn(),
      hasRole: jest.fn()
    };
    mockRouter = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: 'AuthService', useValue: mockAuthService },
        { provide: 'Router', useValue: mockRouter },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access if authenticated', () => {
    mockAuthService.isLoggedIn.mockReturnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTruthy();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate if not authenticated', () => {
    mockAuthService.isLoggedIn.mockReturnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should deny access and navigate to unauthorized if role is not sufficient', () => {
    const mockRoute = { data: { role: 'admin' } } as any;
    const mockState = {} as any;

    mockAuthService.hasRole.mockReturnValue(false);

    const result = executeGuard(mockRoute, mockState);

    expect(result).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });

  it('should allow access if role is sufficient', () => {
    const mockRoute = { data: { role: 'admin' } } as any;
    const mockState = {} as any;

    mockAuthService.hasRole.mockReturnValue(true);

    const result = executeGuard(mockRoute, mockState);

    expect(result).toBeTruthy();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
