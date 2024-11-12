import { XgameNow } from './../../services/xgame.service';
import { Component, OnInit } from '@angular/core';
import { XgameService } from '../../services/xgame.service';
import { MytimerService, FancytimerService, ScoreTimerService, ScoreCardTimerService, NextRaceTimerService, MarketTimerService, RemainingTimerService } from '../../services/mytimer.service';
import { _window } from '../../services/backend.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  exchangeGames: XgameNow[] = [];
  //Games to remove
  // toRemove = ["baccarat", "cardracer", "hilo", "omaha"];

  constructor(private httpService: XgameService,

    private myTimer: MytimerService,
    private fancyTimer: FancytimerService,
    private scoreTimerService: ScoreTimerService,
    private scoreCardTimerService: ScoreCardTimerService,
    private nextRaceTimer: NextRaceTimerService,
    private markettimer: MarketTimerService,
    private remainingtimer: RemainingTimerService,
  ) {
    this.scoreCardTimerService.clearTimer();
    this.myTimer.clearTimer();
    this.scoreTimerService.clearTimer();
    this.fancyTimer.clearTimer();
    this.nextRaceTimer.clearTimer();
    this.markettimer.clearTimer();
    this.remainingtimer.clearTimer();
  }

  ngOnInit(): void {
    this.getExchangeGames();
  }

  getExchangeGames() {
    this.httpService.games().then((response: XgameNow[]) => {
      if (response) {
        this.exchangeGames = response;
        //Function for removing new games and double market game
        // this.exchangeGames = this.exchangeGames.filter((game) => !this.toRemove.includes(game.gameName))

      }
    }).catch((err) => {
      console.log(err)
    });
  }

}
