import { Routes } from '@angular/router';
import { LandingPageComponent } from './standalone/landing-page/landing-page.component';
import { MymarketsComponent } from './sports/mymarkets/mymarkets.component';

export const routes: Routes = [
  {
    path: '', component: LandingPageComponent
  },

  // {
  //   path: 'sports',
  //   loadChildren: () =>
  //     import('./sports/sports.module').then((m) => m.SportsModule),
  // },
  {
    path: 'sports/mymarket',
    component: MymarketsComponent
    // loadChildren: () =>
    //   import('./sports/mymarkets/mymarkets.component').then((m) => m.MymarketsComponent),
  },
];
