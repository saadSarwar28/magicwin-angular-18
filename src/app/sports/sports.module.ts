
import { RaceScheduleComponent } from './raceSchedule/raceSchedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsRoutingModule } from './sports-routing.module';
import { LivestreamComponent } from './livestream/livestream.component';
import { EventmarketsComponent } from './eventmarkets/eventmarkets.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookmakerComponent } from './bookmaker/bookmaker.component';
import { CricketComponent } from './cricket/cricket.component';
import { SportsbyidComponent } from './sportsbyid/sportsbyid.component';
import { MarketDetailsComponent } from './marketDetails/marketDetails.component';
import { RacemarketComponent } from './racemarket/racemarket.component';
import { BasketballscorecardComponent } from './basketballscorecard/basketballscorecard.component';
import { SoccerscorecardComponent } from './soccerscorecard/soccerscorecard.component';
import { MymarketsComponent } from './mymarkets/mymarkets.component';
import { TranslateModule } from '@ngx-translate/core';
import { NextRacesComponent } from './next-races/next-races.component';
import { Safe1Pipe } from '../pipes/safe.pipe';
import { DaysFormatPipePipe } from '../pipes/days-format-pipe.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { LotterymarketComponent } from './lotterymarket/lotterymarket.component';
import { DirectiveModule } from '../directives/directive.module';
import { PremiumRacePipe } from '../pipes/premium-race.pipe';
import { SortByDatePipe } from '../pipes/sortByDate.pipe';
import { OtherracesComponent } from './otherraces/otherraces.component';
import { FancyBookmakerComponent } from './fancy-bookmaker/fancy-bookmaker.component';
import { TennisscorecardComponent } from './tennisscorecard/tennisscorecard.component';
import { MybetsComponent } from './my-bets/my-bets.component';
import { LineMarketsComponent } from './line-markets/line-markets.component';
import { GroupAndSortLineMarketsPipe } from '../pipes/lineMarketPipe';
import { CompetitionMarketsComponent } from './competitionMarkets/competitionMarkets.component';
import { SportsBookComponent } from './sports-book/sports-book.component';
import { MomentModule } from 'ngx-moment';
import { FancyDataComponent } from './fancy-data/fancy-data.component';
import { BookmakerDataComponent } from './bookmaker-data/bookmaker-data.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    Safe1Pipe,

    DaysFormatPipePipe,
    RaceScheduleComponent,
    NotfoundComponent,
    LivestreamComponent,
    SportsbyidComponent,
    EventmarketsComponent,
    MarketDetailsComponent,
    SoccerscorecardComponent,
    TennisscorecardComponent,
    RacemarketComponent,
    BasketballscorecardComponent,
    CricketComponent,
    BookmakerComponent,
    CompetitionMarketsComponent,
    MymarketsComponent,
    SortByPipe,
    NextRacesComponent,
    LotterymarketComponent,
    PremiumRacePipe,
    SortByDatePipe,
    OtherracesComponent,
    FancyBookmakerComponent,
    MybetsComponent,
    LineMarketsComponent,
    GroupAndSortLineMarketsPipe,
    SportsBookComponent,
    FancyDataComponent,
    BookmakerDataComponent,


  ],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    SportsRoutingModule,
    SharedModule,
    MomentModule,
    CarouselModule,
    DirectiveModule
  ],

  exports: [Safe1Pipe, SoccerscorecardComponent, BasketballscorecardComponent, TennisscorecardComponent, DaysFormatPipePipe, MybetsComponent,],

})
export class SportsModule {
}
