import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaLoaderService, RecaptchaSettings } from 'ng-recaptcha';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([AppInterceptor])),
    { provide: APP_BASE_HREF, useValue: '/' },
    RecaptchaLoaderService, // Ensure the service is provided
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: {
        siteKey: '6LfaGQQeAAAAAHGQ_EEv9PWEu8pQE_suL2WUSL7h', // Replace with your reCAPTCHA site key
      } as RecaptchaSettings,
    },
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    TranslateService,
    importProvidersFrom(TranslateModule.forRoot()),
    provideAnimations()
  ]
};
