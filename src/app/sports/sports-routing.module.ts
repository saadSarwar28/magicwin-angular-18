import { MymarketsComponent } from './mymarkets/mymarkets.component';
// import { CurrentBetsComponent } from './current-bets/current-bets.component';
import { RaceScheduleComponent } from './raceSchedule/raceSchedule.component';

import { MarketDetailsComponent } from './marketDetails/marketDetails.component';
import { SportsbyidComponent } from './sportsbyid/sportsbyid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventmarketsComponent } from './eventmarkets/eventmarkets.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { RacemarketComponent } from './racemarket/racemarket.component';
import { BookmakerComponent } from './bookmaker/bookmaker.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CricketComponent } from './cricket/cricket.component';
import { OtherracesComponent } from './otherraces/otherraces.component';
import { CompetitionMarketsComponent } from './competitionMarkets/competitionMarkets.component';
import { ExchangeComponent } from '../exchange/exchange.component';
const routes: Routes = [
  {
    path: '',
    component: ExchangeComponent,
    children: [
      { path: '', component: SportsbyidComponent },
      // { path: 'inplay', component: InplayComponent },
      { path: 'mymarket', component: MymarketsComponent },
      {
        path: 'premium-races',
        component: OtherracesComponent,

      },
      // {
      //   path: 'my-sports',
      //   loadChildren: () =>
      //     import('./mysports/mysports.module').then((m) => m.MysportsModule),

      // },
      { path: ':id', component: SportsbyidComponent },
      { path: 'cricket/:id', component: CricketComponent },
      { path: 'soccer/:id', component: EventmarketsComponent },
      { path: 'tennis/:id', component: EventmarketsComponent },
      { path: 'golf/:id', component: EventmarketsComponent },
      { path: 'rugby-union/:id', component: EventmarketsComponent },
      { path: 'motor-sport/:id', component: EventmarketsComponent },
      { path: 'baseball/:id', component: EventmarketsComponent },
      { path: 'basketball/:id', component: EventmarketsComponent },
      { path: 'boxing/:id', component: EventmarketsComponent },
      { path: 'darts/:id', component: EventmarketsComponent },
      { path: 'gaelic-games/:id', component: EventmarketsComponent },
      { path: 'mixed-martial-arts/:id', component: EventmarketsComponent },
      { path: 'olympics/:id', component: EventmarketsComponent },
      { path: 'rugby-league/:id', component: EventmarketsComponent },
      { path: 'snooker/:id', component: EventmarketsComponent },
      { path: 'american-football/:name', component: MarketDetailsComponent },
      //old route
      { path: 'raceschedule/:id1/:id2', component: RacemarketComponent },
      // new route
      { path: 'horse-racing/:id1', component: RaceScheduleComponent },
      { path: 'grey-hound-racing/:id1', component: RaceScheduleComponent },

      // // old route
      // // { path: 'racemarket/:id', component: RacemarketComponent },
      // // new route
      { path: 'horse-racing/:day/:id', component: RacemarketComponent },
      { path: 'grey-hound-racing/:day/:id', component: RacemarketComponent },
      // { path: 'eventsbydatemarkets/:id', component: EventsByDateMarketsComponent },
      { path: 'bookmaker/:id/:eventid', component: BookmakerComponent },
      { path: ':sport/:id/:name', component: MarketDetailsComponent },
      { path: 'marketdetail/:id/:name', component: MarketDetailsComponent },
      { path: 'tournament/:id', component: CompetitionMarketsComponent },
      { path: 'livestream', component: LivestreamComponent },

      { path: '**', component: NotfoundComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsRoutingModule {}
