import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { loggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor', () => {
  let httpClient: HttpClient;
  let httpHandler: HttpHandler;
  let mockHandler: jest.Mocked<HttpHandler>;

  const interceptor = (req: HttpRequest<any>, next: HttpHandler) =>
    TestBed.runInInjectionContext(() => loggingInterceptor(req, next.handle.bind(next)));

  beforeEach(() => {
    mockHandler = {
      handle: jest.fn((req) => of(new HttpResponse({ body: {} }))),
    } as unknown as jest.Mocked<HttpHandler>;
  
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });

    httpClient = TestBed.inject(HttpClient);
    httpHandler = TestBed.inject(HttpHandler);
  });

  it('should handle HTTP POST requests correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockRequest = new HttpRequest('POST', '/test-url', { data: 'test' });
    const mockResponse = { success: true };
    const mockNext = {
      handle: () => of(new HttpResponse({ body: mockResponse })),
    };

    interceptor(mockRequest, mockNext as any).subscribe((response) => {
      expect((response as HttpResponse<any>).body).toEqual(mockResponse);
    });

    expect(consoleSpy).toHaveBeenCalledWith('🛠️ [POST] /test-url');
    expect(consoleSpy).toHaveBeenCalledWith('✅ Resposta: ', expect.objectContaining({ body: mockResponse }));
  });

  it('should handle HTTP PUT requests correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockRequest = new HttpRequest('PUT', '/test-url', { data: 'update' });
    const mockResponse = { updated: true };
    const mockNext = {
      handle: () => of(new HttpResponse({ body: mockResponse })),
    };

    interceptor(mockRequest, mockNext as any).subscribe((response) => {
      if (response instanceof HttpResponse) {
        expect(response.body).toEqual(mockResponse);
      }
    });

    expect(consoleSpy).toHaveBeenCalledWith('🛠️ [PUT] /test-url');
    expect(consoleSpy).toHaveBeenCalledWith('✅ Resposta: ', expect.objectContaining({ body: mockResponse }));
  });

  it('should handle HTTP DELETE requests correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockRequest = new HttpRequest('DELETE', '/test-url');
    const mockResponse = { deleted: true };
    const mockNext = {
      handle: () => of(new HttpResponse({ body: mockResponse })),
    };

    interceptor(mockRequest, mockNext as any).subscribe((response) => {
      if (response instanceof HttpResponse) {
        if (response instanceof HttpResponse) {
          expect(response.body).toEqual(mockResponse);
        }
      }
    });

    expect(consoleSpy).toHaveBeenCalledWith('🛠️ [DELETE] /test-url');
    expect(consoleSpy).toHaveBeenCalledWith('✅ Resposta: ', expect.objectContaining({ body: mockResponse }));
  });

  it('should log an empty response body if no body is present', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockRequest = new HttpRequest('GET', '/test-url');
    const mockNext = {
      handle: () => of(new HttpResponse({})),
    };

    interceptor(mockRequest, mockNext as any).subscribe();

    expect(consoleSpy).toHaveBeenCalledWith('🛠️ [GET] /test-url');
    expect(consoleSpy).toHaveBeenCalledWith('✅ Resposta: ', expect.objectContaining({}));
  });
});
