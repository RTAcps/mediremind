import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('errorInterceptor', () => {
  let mockRouter: jest.Mocked<Router>;
  let mockHandler: jest.Mocked<HttpHandler>;

  const interceptor = (req: HttpRequest<any>, next: HttpHandler) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next.handle.bind(next)));

  beforeEach(() => {
    mockRouter = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;
    mockHandler = {
      handle: jest.fn((req) => of(new HttpResponse({ body: {} }))),
    } as unknown as jest.Mocked<HttpHandler>;
  
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    });
  });

  it('should handle 400 error and show system error message', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 400 });
    mockHandler.handle.mockReturnValue(throwError(() => errorResponse));

    jest.spyOn(Swal, 'fire');

    interceptor(req, mockHandler).subscribe({
      error: () => {
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro no sistema, contate o administrador.',
        });
        done();
      },
    });
  });

  it('should handle 401 error and navigate to login', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 401 });
    mockHandler.handle.mockReturnValue(throwError(() => errorResponse));

    jest.spyOn(Swal, 'fire');

    interceptor(req, mockHandler).subscribe({
      error: () => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Oops...',
          text: 'Sessão expirada. Faça login novamente.',
        });
        done();
      },
    });
  });

  it('should handle 403 error and show permission error message', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 403 });
    mockHandler.handle.mockReturnValue(throwError(() => errorResponse));

    jest.spyOn(Swal, 'fire');

    interceptor(req, mockHandler).subscribe({
      error: () => {
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Oops...',
          text: 'Você não tem permissão para acessar este recurso.',
        });
        done();
      },
    });
  });

  it('should handle 500 error and show server error message', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 504 });
    mockHandler.handle.mockReturnValue(throwError(() => errorResponse));

    jest.spyOn(Swal, 'fire');

    interceptor(req, mockHandler).subscribe({
      error: () => {
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro no servidor. Por favor, tente mais tarde.',
        });
        done();
      },
    });
  });

  it('should handle unknown error and show default error message', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 1 });
    mockHandler.handle.mockReturnValue(throwError(() => errorResponse));

    jest.spyOn(Swal, 'fire');

    interceptor(req, mockHandler).subscribe({
      error: () => {
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro desconhecido. Tente novamente mais tarde.',
        });
        done();
      },
    });
  });
});
