import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipemodule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XgameRoutingModule } from './xgame-routing.module';
import { GamesComponent } from './games/games.component';
import { GamenavbarComponent } from './gamenavbar/gamenavbar.component';
import { XgameService } from '../services/xgame.service';
import { HomeComponent } from './home/home.component';
import { FilterPipe, FilterPropertiesPipe, OrdinalPipe } from './pipes/filter';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MytimerService } from '../services/mytimer.service';
import { NgwebsocketService } from '../services/ngwebsocket.service';
import { SportsModule } from '../sports/sports.module';
import { SharedModule } from '../shared/shared.module';
import { XgameCardsComponent } from './xgame-cards/xgame-cards.component';
import { XGameDetailComponent } from './x-game-detail/xgame-detail.component';
import { XgameOtherCardsComponent } from './xgames-other-cards/xgame-other-cards.component';
import { AddSpaceBtwnNumPipe, FilterCardsPipe, FilterCardsStatusPipe, FilterOtherCardsPipe, FilterPositionPipe } from './filter-cards.pipe';


@NgModule({
  declarations: [
    GamesComponent,
    HomeComponent,
    FilterPipe,
    FilterPropertiesPipe,
    OrdinalPipe,
    XgameCardsComponent,
    XGameDetailComponent,
    XgameOtherCardsComponent,
    FilterOtherCardsPipe,
    FilterCardsPipe,
    FilterCardsStatusPipe,
    FilterPositionPipe,
    AddSpaceBtwnNumPipe,
    GamenavbarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    FormsModule,
    PipesModule,
    XgameRoutingModule,
    SportsModule,
    SharedModule
  ],
  exports: [],
  providers: [XgameService, MytimerService, NgwebsocketService]
})
export class XgameModule {
}
