import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@services/loading/loading.service';
import { loadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let loadingService: jest.Mocked<LoadingService>;

    beforeEach(() => {
        const loadingServiceMock = {
            show: jest.fn(),
            hide: jest.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: LoadingService, useValue: loadingServiceMock },
                { provide: HTTP_INTERCEPTORS, useValue: loadingInterceptor, multi: true },
                provideHttpClientTesting(),
            ],
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        loadingService = TestBed.inject(LoadingService) as jest.Mocked<LoadingService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should not call LoadingService.hide() if the request is not completed', () => {
        httpClient.get('/test').subscribe();

        expect(loadingService.show).toHaveBeenCalled();

        const req = httpMock.expectOne('/test');
        // Intentionally not flushing the request to simulate an incomplete request

        expect(loadingService.hide).not.toHaveBeenCalled();
    });

    it('should handle multiple requests and finalize properly', () => {
        httpClient.get('/test1').subscribe();
        httpClient.get('/test2').subscribe();

        expect(loadingService.show).toHaveBeenCalledTimes(1);

        const req1 = httpMock.expectOne('/test1');
        const req2 = httpMock.expectOne('/test2');
        req1.flush({});
        req2.flush({});

        expect(loadingService.hide).toHaveBeenCalledTimes(2);
    });

    it('should handle errors gracefully and call LoadingService.hide()', () => {
        httpClient.get('/test').subscribe({
            error: () => {
                expect(loadingService.hide).toHaveBeenCalled();
            },
        });

        const req = httpMock.expectOne('/test');
        req.flush('Error', { status: 400, statusText: 'Bad Request' });
    });
});