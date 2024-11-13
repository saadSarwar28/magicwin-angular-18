import { Routes } from '@angular/router';
import { LandingPageComponent } from './standalone/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '', component: LandingPageComponent
  },
  {
    path: 'sports',
    loadChildren: () =>
      import('./sports/sports.module').then((m) => m.SportsModule),
  },
];
