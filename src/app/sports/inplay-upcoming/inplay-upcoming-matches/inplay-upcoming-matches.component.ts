import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { _window, BackendService } from '../../../services/backend.service';
import {
  SetAmount,
  shortenLargeNumber,
} from '../../../services/shortenLargeNumber';
import { CheckAuthService } from '../../../services/check-auth.service';
import { ToastService } from '../../../services/toast.service';
import { UtillsService } from '../../../services/utills.service';
import { GenericService } from '../../../services/generic.service';
import { WalletService } from '../../../services/wallet.service';
import { StorageService } from '../../../services/storage.service';
import { ScoreTimerService, TimerService } from '../../../services/timer.service';
import { SportsIdMapperService } from '../../../services/sportsIdMapper.service';
import { MarketCatalogueSS, MarketRunners } from '../../../models/models';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { TeamsScoreComponent } from '../../../shared/reuse/teams-score.component';
import { MatchStartTimeComponent } from '../../../shared/reuse/matchStartTime.component';
import { MarketNamePipe } from '../../../pipes/marketnameVs.pipe';
import { OddsbuttonComponent } from '../../../shared/reuse/oddsbutton.component';
import { OrderbyPipe } from '../../../pipes/orderby.pipe';
import { PartialBetslipComponent } from '../../../shared/partial-betslip/partial-betslip.component';
import { SkeltonLoaderComponent } from '../../../shared/skelton-loader/skelton-loader.component';

@Component({
  selector: 'app-inplay-upcoming-matches',
  templateUrl: './inplay-upcoming-matches.component.html',
  styleUrls: ['./inplay-upcoming-matches.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MomentModule,
    TeamsScoreComponent,
    MatchStartTimeComponent,
    OddsbuttonComponent,
    PartialBetslipComponent,
    SkeltonLoaderComponent,
    MarketNamePipe,
    RouterModule,
    OrderbyPipe

  ]
})
export class InplayUpcomingMatchesComponent implements OnInit {
  today: Date = new Date();
  sportsId: string = '';
  data: any;
  source: any;
  marketIds: any[] = [];
  eventIds: any[] = [];
  currencyCode = '';
  cBuyRate = 1;
  cTotalShare = 0;
  interval: any;
  sInterval: any;
  sportsImgs = [
    {
      id: "1",
      img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/1.png"
    },
    {
      id: "2",
      img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/2.png"
    },
    {
      id: "2",
      img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/2.png"
    },
    {
      id: "4",
      img: "https://iriscdn.b-cdn.net/magicwin.games/icon/cricket.png"
    },
  ]
  @Input() items: any[] = []
  sports = [
    {
      name: 'Cricket',
      id: '4',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/cricket.svg',
    },
    {
      name: 'Soccer',
      id: '1',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/football.svg',
    },
    {
      name: 'Tennis',
      id: '2',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/Tennis New.svg',
    },
    {
      name: 'Baseball',
      id: '7522',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/baseball-svgrepo-com 1.svg',
    },
    {
      name: 'Basketball',
      id: '7511',
      img: 'https://iriscdn.b-cdn.net/kheloyar/Ballofbasketball.svg',
    },
  ];

  activeSport: string | null = 'Cricket';
  @Input() selectedId: any;
  @Input() setPageNumber = 0;
  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();
  sitename: string = ''
  isOneClickBetGlobal: boolean = false
  isLoggedIn: boolean = false
  isMagicwin: boolean = false
  siteLoader: string = ""
  constructor(
    private checkauthservice: CheckAuthService,
    private router: Router,
    private backendService: BackendService,
    private storageService: StorageService,
    private elementRef: ElementRef,
    private timerService: TimerService,
    private scoreTimerService: ScoreTimerService,
    private sportsMapperService: SportsIdMapperService,
    private toasterService: ToastService,
    public utillsService: UtillsService,
    private genericService: GenericService,
    private walletService: WalletService

  ) {

    if (_window().sitename) {
      this.sitename = _window().sitename;
    }

    this.isMagicwin = _window().isMagicwin;
    if (_window().sportsbyidtimer) {
      this.interval = _window().sportsbyidtimer;
    }

    if (_window().scoretimer) {
      this.sInterval = _window().scoretimer;
    }
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
    }

    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }

    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (this.checkauthservice.HaveStakes()) {
      this.cBuyRate = this.checkauthservice.cBuyRate;
      this.cTotalShare = this.checkauthservice.cTotalShare;
      this.currencyCode = this.checkauthservice.currencyCode;
    }
  }
  setLink(id: any, isVirtual: Boolean = false) {
    if (isVirtual) {
      this.router.navigate([`/sports/tournament/virtual-cricket-70707070`]);
    } else {
      this.router.navigate(['/sports/' + this.sportsMapperService.getSportById(Number(id))]);
    }
  }



  setPage(page: any) {
    this.setPageNumber = page;
    this.selectPopularById(this.selectedId ? this.selectedId : '4');
  }



  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }

  cdnSportsLanding: string = '';

  topPopularData: any[] = []
  providerBannerData: any[] = []
  defaultImage: string = ''

  ngOnInit(): void {
    sessionStorage.clear();
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.selectPopularById(this.selectedId);
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.providerBannerData = this.utillsService.returnFormatedData(d, 'banner1')
      }
    });
  }

  routeToMarket(link: any) {
    this.router.navigate([link]);
  }

  routeToLink(item: any) {
    this.utillsService.routeToLink(item)
  }

  not_virtual: any = [];
  virtual: any = [];
  loadingData: boolean = true;
  inPlayMarketIds: string[] = []
  selectPopularById(id: string) {
    this.loadingData = true;
    this.selectedId = id;
    this.not_virtual = [];
    this.eventIds = [];
    this.marketIds = [];
    this.dataEmitter.emit(this.selectedId)

    this.inPlayMarketIds = []
    if (navigator.onLine == true && document.hidden == false) {
      this.backendService
        .popularbyid(id, this.setPageNumber, 'UpcomingComponent')
        .subscribe(
          {
            next: (resp) => {
              if (resp && resp.length > 0) {
                this.loadingData = false;
                this.not_virtual = resp.filter((x: any) =>
                  x.marketId.startsWith('1.')
                );
                this.marketIds = this.not_virtual.map((x: any) => x.marketId)
                this.eventIds = this.eventIds.concat(
                  resp.filter((x: any) => x.inplay).map((x: any) => x.version)
                );
                this.inPlayMarketIds = this.inPlayMarketIds.concat(
                  this.not_virtual.filter((x: any) => x.inplay).map((x: any) => x.marketId)
                )

                this.GetScore();
                this.GetMarketRates();
                setTimeout(() => {
                  this.GetSportMarketLiability(this.inPlayMarketIds.join(','));
                }, 500)
                this.scoreTimerService.SetTimer(
                  setInterval(() => {
                    this.GetScore();
                    this.GetMarketRates();
                  }, this.sInterval)
                );

              } else {
                this.not_virtual = [];
                this.loadingData = false;
              }
            },
            error: (error) => {
              this.catchError(error)
              this.loadingData = false;
            },
          }
        )

    }
  }


  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.placeBet = true
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response, betslip.marketId)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.placeBet = false

  }
  placingBetMarketId: any = ""
  placeBet: boolean = false
  placebet(
    m: MarketCatalogueSS,
    r: MarketRunners,
    type: string,
  ) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    let price: any = (type == 'back') ? (r.back[0].price) : r.lay[0].price;
    this.not_virtual.forEach((x: any) => {
      x.betslip = null;
    });
    if (r == undefined || price == 0 || price == "") return;
    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      eventId: m.version,
      marketId: m.marketId,
      marketType: "ODDS",
      selectionid: r.selectionId,
      name: r.runnerName,
      handicap: r.handicap,
      price,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'ODDS',
      bettingType: 'ODDS',
      minBet: 50,
      maxBet: 25000,
    };
    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip)
    } else {
      m.betslip = {
        ...betSlip
      };
    }

  }
  get isOneClickOn() {
    return this.storageService.getItem('OCB') && this.isOneClickBetGlobal
  }

  catchError(err: any) {
    if (err.status && err.status == 401) {
      this.timerService.clearTimer();
      this.scoreTimerService.clearTimer();
      this.storageService.removeItem('token');
      this.genericService.openLoginModal()

    } else {
      console.error(err);
    }
  }

  betStatus(resp: any, marketId: any) {
    let betstatus = resp.status;
    const message = resp.message || resp.response.message;
    if (betstatus) {
      this.toasterService.show(message, {
        classname: 'bg-success text-white',
        delay: 4000,
        sound: true,
      });
      this.BetPlacedStatus({
        success: true,
        marketId: marketId
      })
    } else {
      this.toasterService.show(message, {
        classname: 'bg-danger text-white',
        delay: 4000,
        sound: true,
      });
    }

  }
  GetSportMarketLiability(marketIds: any) {
    if (this.checkauthservice.IsLogin()) {
      this.backendService
        .SportsMarketliability(marketIds)
        .subscribe(
          {
            next: (resp: any) => {
              if (resp && resp.length > 0) {
                resp.forEach((x: any) => {
                  if (this.not_virtual && this.not_virtual.length > 0) {
                    let l = this.not_virtual.filter(
                      (lm: any) => lm.marketId == x.marketId
                    );
                    if (l && l.length > 0) {
                      l[0].marketLiability = x.libility;
                    }
                  }
                })
              }
            },
            error: (error) => this.catchError(error),
          }
        )

    }
  }


  BetPlacedStatus(status: any) {
    if (status.success) {
      this.not_virtual.forEach((r: any) => (r.betslip = null));
      this.GetWalllet();
      this.GetSportMarketLiability(status.marketId);
    }
  }





  GetWalllet() {
    this.walletService.loadBalance()
  }




  GetMarketRates() {
    if (navigator.onLine == true && document.hidden == false) {

      this.marketIds = Array.from(new Set(this.marketIds));
      this.backendService
        .marketsbook(this.marketIds.join(','), 'UpcomingComponent')
        .subscribe((resp) => {
          if (resp && resp.length > 0) {
            resp.forEach((rate) => {
              this.not_virtual.forEach((sports: any) => {
                let m = this.not_virtual.filter(
                  (x: any) => x.marketId == rate.marketId
                );
                if (m && m.length > 0) {
                  if (rate.status == 'CLOSED') {
                    this.marketIds = this.marketIds.filter(
                      (x) => x == m[0].marketId
                    );
                  }
                  m[0].totalMatched = SetAmount(
                    rate.totalMatched,
                    this.cTotalShare,
                    this.cBuyRate
                  );
                  m[0].totalAvailable = SetAmount(
                    rate.totalAvailable,
                    this.cTotalShare,
                    this.cBuyRate
                  );
                  rate.runners?.forEach((runner: any) => {
                    let r = m[0].runners.filter(
                      (run: any) => run.selectionId == runner.selectionId
                    );
                    if (r && r.length > 0) {
                      if (
                        runner.ex.availableToBack &&
                        runner.ex.availableToBack.length > 0
                      ) {
                        r[0].back[0].price = runner.ex.availableToBack[0].price;
                        r[0].back[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToBack[0].size,
                            this.cTotalShare,
                            this.cBuyRate
                          )
                        );
                      } else {
                        r[0].back[0].price = '';
                        r[0].back[0].size = '';
                      }
                      if (
                        runner.ex.availableToLay &&
                        runner.ex.availableToLay.length > 0
                      ) {
                        r[0].lay[0].price = runner.ex.availableToLay[0].price;
                        r[0].lay[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[0].size,
                            this.cTotalShare,
                            this.cBuyRate
                          )
                        );
                      } else {
                        r[0].lay[0].price = '';
                        r[0].lay[0].size = '';
                      }
                    }
                  });
                }
              });
            });
          }
        })

    }
  }

  scoreData: any
  async GetScore() {
    if (navigator.onLine == true && document.hidden == false) {
      if (
        (this.eventIds && this.eventIds.length > 0)) {
        let scoreData = await this.utillsService.getScore(this.eventIds)
        if (scoreData && scoreData.length > 0) {
          this.scoreData = scoreData
          scoreData.forEach((s: any) => {
            let m = this.not_virtual.filter(
              (x: any) => x.version == s.eventId
            );
            if (m && m.length > 0) {
              m[0].score = s.score;
            }
          });
        }
      }
    }
  }


}
