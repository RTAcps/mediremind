import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

describe('authInterceptor', () => {
  let mockHandler: jest.Mocked<HttpHandler>;

  const interceptor = (req: HttpRequest<any>, next: HttpHandler) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next.handle.bind(next)));

  beforeEach(() => {
    mockHandler = {
      handle: jest.fn((req) => of(new HttpResponse({ body: {} }))),
    } as unknown as jest.Mocked<HttpHandler>;
    TestBed.configureTestingModule({});
  });

  it('should add Authorization header if token exists in localStorage', (done) => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
        done();
        return of({} as HttpEvent<any>);
      },
    };

    interceptor(mockRequest, mockHandler);
  });

  it('should not add Authorization header if token does not exist in localStorage', (done) => {
    localStorage.removeItem('token');

    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.has('Authorization')).toBeFalsy();
        done();
        return of({} as HttpEvent<any>);
      },
    };

    interceptor(mockRequest, mockHandler);
  });
});
