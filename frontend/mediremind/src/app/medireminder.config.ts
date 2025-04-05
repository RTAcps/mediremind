import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './medireminder.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@interceptors/auth/auth.interceptor';
import { errorInterceptor } from '@interceptors/error/error.interceptor';
import { loadingInterceptor } from '@interceptors/loading/loading.interceptor';
import { loggingInterceptor } from '@interceptors/logging/logging.interceptor';

const interceptors = [authInterceptor, errorInterceptor, loadingInterceptor, loggingInterceptor];

export const medireminderConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors(interceptors)
    )
  ]
};
