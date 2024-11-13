import { Routes } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { IframeGuard } from './services/Iframe.guard';
import { ChangePasswordFirstTimeComponent } from './user/change-password-first-time/change-password-first-time.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthguardService } from './services/authguard.service';

export const routes: Routes = [

  { path: '', component: LandingPageComponent, canActivate: [IframeGuard] },
  {
    path: 'setting',
    component: SettingsComponent,
    canActivate: [AuthguardService],
  },
  // {
  //   path: 'deposit',
  //   loadChildren: () =>
  //     import('./new-deposit/deposit.module').then((m) => m.DepositModule),
  //   canActivate: [IsB2CGuard, AuthguardService],
  // },
  {
    path: 'sports',
    loadChildren: () =>
      import('./sports/sports.module').then((m) => m.SportsModule),
  },

  // {
  //   path: 'games',
  //   loadChildren: () =>
  //     import('./xgame/xgame.module').then((m) => m.XgameModule), canActivate: [IframeGuard]
  // },

  // {
  //   path: 'reports',
  //   loadChildren: () =>
  //     import('./reports/reports.module').then((m) => m.ReportsModule),
  // },
  // {
  //   path: 'general',
  //   loadChildren: () =>
  //     import('./general-content/general-content.module').then(
  //       (m) => m.GeneralContentModule
  //     ),
  // },
  // {
  //   path: 'casino',
  //   loadChildren: () =>
  //     import('./casino/casinos.module').then((m) => m.CasinosModule), canActivate: [IframeGuard]
  // },
  // {
  //   path: 'mobile-casino',
  //   loadChildren: () =>
  //     import('./shared/blog-detail/blog-detail.module').then(
  //       (m) => m.BlogDetailModule
  //     ),
  //   canActivate: [IframeGuard]
  // },
  // {
  //   path: 'tips',
  //   loadChildren: () =>
  //     import('./shared/blog-detail/blog-detail.module').then(
  //       (m) => m.BlogDetailModule
  //     ),
  // },
  // {
  //   path: 'blog',
  //   loadChildren: () =>
  //     import('./shared/blog-detail/blog-detail.module').then(
  //       (m) => m.BlogDetailModule
  //     ),
  // },
  // {
  //   path: 'blogs',
  //   loadChildren: () =>
  //     import('./shared/blogs/blogs.module').then((m) => m.BlogsModule),
  // },
  { path: '404', component: ErrorpageComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [IframeGuard]
  },
  { path: 'change-password', component: ChangePasswordFirstTimeComponent, canActivate: [IframeGuard] },
  {
    path: '**',
    redirectTo: '',
  },
];
