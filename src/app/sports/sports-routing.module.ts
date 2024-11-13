import { MymarketsComponent } from './mymarkets/mymarkets.component';
// import { CurrentBetsComponent } from './current-bets/current-bets.component';
import { RaceScheduleComponent } from './raceSchedule/raceSchedule.component';

import { MarketDetailsComponent } from './marketDetails/marketDetails.component';
import { ExchangeComponent } from './../exchange/exchange.component';
import { SportsbyidComponent } from './sportsbyid/sportsbyid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventmarketsComponent } from './eventmarkets/eventmarkets.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { AuthguardService } from '../services/authguard.service';
import { RacemarketComponent } from './racemarket/racemarket.component';
import { BookmakerComponent } from './bookmaker/bookmaker.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CricketComponent } from './cricket/cricket.component';
import { OtherracesComponent } from './otherraces/otherraces.component';
import { CompetitionMarketsComponent } from './competitionMarkets/competitionMarkets.component';
const routes: Routes = [
  {
    path: '', component: ExchangeComponent, children: [
      { path: '', component: SportsbyidComponent, canActivate: [AuthguardService] },
      // { path: 'inplay', component: InplayComponent, canActivate: [AuthguardService] },
      { path: 'mymarket', component: MymarketsComponent, canActivate: [AuthguardService] },
      {
        path: 'premium-races',
        component: OtherracesComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'my-sports',
        loadChildren: () =>
          import('./mysports/mysports.module').then((m) => m.MysportsModule),
        canActivate: [AuthguardService],
      },
      { path: ':id', component: SportsbyidComponent, canActivate: [AuthguardService] },
      { path: 'cricket/:id', component: CricketComponent, canActivate: [AuthguardService] },
      { path: 'soccer/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'tennis/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'golf/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'rugby-union/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'motor-sport/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'baseball/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'basketball/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'boxing/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'darts/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'gaelic-games/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'mixed-martial-arts/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'olympics/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'rugby-league/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'snooker/:id', component: EventmarketsComponent, canActivate: [AuthguardService] },
      { path: 'american-football/:name', component: MarketDetailsComponent, canActivate: [AuthguardService] },
      //old route
      { path: 'raceschedule/:id1/:id2', component: RacemarketComponent, canActivate: [AuthguardService] },
      // new route
      { path: 'horse-racing/:id1', component: RaceScheduleComponent, canActivate: [AuthguardService] },
      { path: 'grey-hound-racing/:id1', component: RaceScheduleComponent, canActivate: [AuthguardService] },

      // old route
      // { path: 'racemarket/:id', component: RacemarketComponent, canActivate: [AuthguardService] },
      // new route
      { path: 'horse-racing/:day/:id', component: RacemarketComponent, canActivate: [AuthguardService] },
      { path: 'grey-hound-racing/:day/:id', component: RacemarketComponent, canActivate: [AuthguardService] },
      // { path: 'eventsbydatemarkets/:id', component: EventsByDateMarketsComponent, canActivate: [AuthguardService] },
      { path: 'bookmaker/:id/:eventid', component: BookmakerComponent, canActivate: [AuthguardService] },
      { path: ':sport/:id/:name', component: MarketDetailsComponent, canActivate: [AuthguardService] },
      { path: 'marketdetail/:id/:name', component: MarketDetailsComponent, canActivate: [AuthguardService] },
      { path: 'tournament/:id', component: CompetitionMarketsComponent, canActivate: [AuthguardService] },
      { path: 'livestream', component: LivestreamComponent, canActivate: [AuthguardService] },

      { path: '**', component: NotfoundComponent, canActivate: [AuthguardService] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsRoutingModule { }
