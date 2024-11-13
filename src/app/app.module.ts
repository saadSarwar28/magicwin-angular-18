import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AxiosinstanceService } from './services/axiosinstance.service';
import { ToastsContainer } from './shared/toasts.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OneTimeDirective } from './services/OneTimeDirective';
import { ChangePasswordFirstTimeComponent } from './user/change-password-first-time/change-password-first-time.component';
import { RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { MybetsModalComponent } from './mybets-modal/mybets-modal.component';
import { clickOutsideMyBetsDirective } from './directives/closeMybets.directive';
import { CookieService } from "ngx-cookie-service";
import { VideoModalComponent } from './shared/video-modal/video-modal.component';
import { SitefooterComponent } from './shared/sitefooter/sitefooter.component';
import { NavbartopComponent } from './shared/navbartop/navbartop.component';
import { OneClickBetComponent } from './shared/one-click-bet/one-click-bet.component';
import { NavSettingComponent } from './shared/nav-setting/nav-setting.component';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangepinmodalComponent } from './shared/changepinmodal/changepinmodal.component';
import { CreatepinComponent } from './shared/createpin/createpin.component';
import { CommonModule } from '@angular/common';
import { GameSliderComponent } from './gameslider/gameslider/gameslider.component';

import { APP_BASE_HREF } from '@angular/common';
import { LoginTermsConditionComponent } from './shared/reuse/login-terms-condition';
import { SignupTermsConditionComponent } from './shared/reuse/signup-terms-condition';
import { MatMenuModule } from '@angular/material/menu';
import { SummaryContentComponent } from './shared/reuse/summary-conent.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { SportsNavComponent } from './sports/sports-nav/sports-nav.component';
import { InplayUpcomingComponent } from './sports/inplay-upcoming/inplay-upcoming.component';
import { MomentModule } from 'ngx-moment';
import { PopularBannersComponent } from './sports/popular-banners/popular-banners.component';
import { InplayUpcomingMatchesComponent } from './sports/inplay-upcoming/inplay-upcoming-matches/inplay-upcoming-matches.component';
import { SeoService } from "./services/seo.service";
import { SharedModule } from './shared/shared.module';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

// Factory function to initialize the MetaService
export function initializeSeoService(metaService: SeoService) {
  return (): void => metaService.init();
}

@NgModule({
  declarations: [
    ExchangeComponent,
    ErrorpageComponent,
    OneTimeDirective,
    ChangePasswordFirstTimeComponent,
    ModalComponentComponent,
    MybetsModalComponent,
    clickOutsideMyBetsDirective,
    VideoModalComponent,
    SitefooterComponent,
    NavbartopComponent,
    OneClickBetComponent,
    NavSettingComponent,
    LoginModalComponent,
    ChangepinmodalComponent,
    CreatepinComponent,
    SettingsComponent,
    GameSliderComponent,
    SportsNavComponent,
    SignupTermsConditionComponent,
    LoginTermsConditionComponent,
    ToastsContainer,
    SummaryContentComponent,
    CelebritiesComponent,
    PopularBannersComponent,
    InplayUpcomingComponent,
    InplayUpcomingMatchesComponent,

  ],
  imports: [
    LandingPageComponent,
    NgxMatIntlTelInputComponent,
    TranslateModule,
    BrowserModule,
    RecaptchaModule,
    RecaptchaV3Module,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    LazyLoadImageModule,
    MatBottomSheetModule,
    CommonModule,
    BrowserAnimationsModule,
    MomentModule,
    SharedModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:5000'
    // }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: localStorage.getItem("locale") ?? "en"
    }),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireMessagingModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LfaGQQeAAAAAHGQ_EEv9PWEu8pQE_suL2WUSL7h' },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    { provide: APP_BASE_HREF, useValue: '/' },
    CookieService,
    AxiosinstanceService,
    SeoService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSeoService,
      deps: [SeoService],
      multi: true
    }
  ],
  exports: [

  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
