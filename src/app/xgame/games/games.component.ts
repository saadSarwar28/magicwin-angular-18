import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FancytimerService, MarketTimerService, MytimerService, NextRaceTimerService, RemainingTimerService, ScoreCardTimerService, ScoreTimerService } from '../../services/mytimer.service';
import { _window } from '../../services/backend.service';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
// import { SidebarService } from '../../services/sidebar.service';
import { StorageService } from '../../services/storage.service';
import { XgameNow, XgameService } from '../../services/xgame.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  showhidesidesidebar: string = '0';
  eventsSubject: Subject<void>;
  navItems = [
    {
      route: '/sports',
      // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/check-svgrepo-com.svg',
      name: 'Exchange',
      signin: false,
    },
    {
      route: 'xgame/detail/1444077',
      // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/cricket.svg',
      name: 'Blackjack',
      signin: false,
    },
    {
      route: 'xgame/detail/1444082',
      // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/soccer-ball.svg',
      name: 'Blackjack',
      turbo: true,
      signin: false,
    },
    {
      route: 'xgame/detail/1444074',
      // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/tennis-svgrepo-com.svg',
      name: 'Holdem',
      signin: false,
    },
    {
      route: 'xgame/detail/1444080',
      // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/chips-bet-svgrepo-com.svg',
      name: 'Holdem',
      turbo: true,
      signin: false,
    },

    {
      route: 'xgame/detail/1444100',
      // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/horseracing-new.svg',
      name: 'Omaha',
      signin: false,
    },

    // {
    //   route: '/casinos',
    //   // img: 'https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/game-sidebar/casino-chip-svgrepo-com.svg',
    //   name: 'casino',
    //   signin: false,
    // },
  ]
  exchangeGames: XgameNow[] = [];

  constructor(private router: Router,
    private myTimer: MytimerService,
    private fancyTimer: FancytimerService,
    private scoreTimerService: ScoreTimerService,
    private scoreCardTimerService: ScoreCardTimerService,
    private nextRaceTimer: NextRaceTimerService,
    private markettimer: MarketTimerService,
    private remainingtimer: RemainingTimerService,
    @Inject(DOCUMENT) private document: Document,
    private httpService: XgameService,
    private rendere: Renderer2,
    private storageService: StorageService,
    // private sideBarService: SidebarService
  ) {
    this.eventsSubject = new Subject<void>();
  }
  ngOnDestroy(): void {
    this.rendere.removeClass(this.document.body, 'dark-theme');
    this.rendere.addClass(this.document.body, 'light-theme');
  }

  ngOnInit(): void {
    this.getExchangeGames();
    this.scoreCardTimerService.clearTimer();
    this.myTimer.clearTimer();
    this.scoreTimerService.clearTimer();
    this.fancyTimer.clearTimer();
    this.nextRaceTimer.clearTimer();
    this.markettimer.clearTimer();
    this.remainingtimer.clearTimer();
    let lsItem: any = 'dark-theme';
    this.rendere.removeClass(this.document.body, 'light-theme');
    this.rendere.addClass(this.document.body, lsItem);
    // this.storageService.secureStorage.setItem('theme', 'dark-theme');
  }
  showhidesidebar(value: any) {

    this.showhidesidesidebar = value
    // this.sideBarService.setSideBar(this.showhidesidesidebar);
    this.eventsSubject.next();
  }
  getCurrentRoute() {
    let route = this.router.url;
    return route
  }
  receivedMessageHandler(p: any) {
    this.showhidesidesidebar = p;
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
