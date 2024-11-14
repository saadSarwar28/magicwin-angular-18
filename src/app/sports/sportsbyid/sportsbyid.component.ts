import { BrowserService } from './../../services/browser.service';
import { PlatformService } from './../../services/platform.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import {
  DirectCopetitionMarket,
  MarketCatalogueSS,
  MarketRunners,
} from '../../models/models';
import { BackendService } from '../../services/backend.service';
import {
  SetAmount,
  shortenLargeNumber,
} from '../../services/shortenLargeNumber';
import { TimerService, ScoreTimerService } from '../../services/timer.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { ToastService } from '../../services/toast.service';
import { GenericService } from '../../services/generic.service';
import { DeviceDetectorService } from "ngx-device-detector";
import { SportsIdMapperService } from "../../services/sportsIdMapper.service";
import { WalletService } from '../../services/wallet.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SkeltonLoaderComponent } from '../../shared/skelton-loader/skelton-loader.component';
import { NavMenusComponent } from '../../standalone/nav-menus/nav-menus.component';
import { RacetodayscardComponent } from '../../standalone/racetodayscard/racetodayscard.component';
import { MatchStartTimeComponent } from '../../shared/reuse/matchStartTime.component';
import { TeamsScoreComponent } from '../../shared/reuse/teams-score.component';
import { MomentModule } from 'ngx-moment';
import { MarketNamePipe } from '../../pipes/marketnameVs.pipe';
import { RoundoffPipe } from '../../pipes/roundoff.pipe';
import { OddsbuttonComponent } from '../../shared/reuse/oddsbutton.component';
import { OrderbyPipe } from '../../pipes/orderby.pipe';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { VirtualCricketComponent } from '../virtual-cricket/virtual-cricket.component';

@Component({
  selector: 'app-sportsbyid',
  templateUrl: './sportsbyid.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    SkeltonLoaderComponent,
    NavMenusComponent,
    RacetodayscardComponent,
    MatchStartTimeComponent,
    TeamsScoreComponent,
    OddsbuttonComponent,
    MomentModule,
    MarketNamePipe,
    RoundoffPipe,
    OrderbyPipe,
    PartialBetslipComponent,
    VirtualCricketComponent

  ]
})
export class SportsbyidComponent implements OnInit, OnDestroy, AfterViewInit {
  today: Date = new Date();
  sportsId: string = '';
  data: any = []
  source: any;
  marketIds: any[] = [];
  eventIds: any[] = [];
  currencyCode = '';
  outerNav: any
  cBuyRate = 1;
  cTotalShare = 0;
  interval: any;
  sInterval: any;
  isPrev: boolean = false;
  isNext: boolean = true;
  isLoggedIn: boolean = true;
  isOneClickBetGlobal: boolean = false;
  nextPage: number = 0;
  siteLoader: string = ""
  isIframe: boolean = false
  constructor(
    private checkauthservice: CheckAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private storageService: StorageService,
    private elementRef: ElementRef,
    private timerService: TimerService,
    private deviceService: DeviceDetectorService,
    private sportsMapperService: SportsIdMapperService,
    private scoreTimerService: ScoreTimerService,
    private utillsService: UtillsService,
    private toasterService: ToastService,
    private genericService: GenericService,
    private walletService: WalletService,
    private PlatformService: PlatformService,
    private BrowserService: BrowserService
  ) {
    if (this.PlatformService.isBrowser()) {
      if (this.BrowserService.getWindow().sportsbyidtimer) {
        this.interval = this.BrowserService.getWindow().sportsbyidtimer;
      }
      if (this.BrowserService.getWindow().scoretimer) {
        this.sInterval = this.BrowserService.getWindow().scoretimer;
      }
      if (this.BrowserService.getWindow().siteLoader) {
        this.siteLoader = this.BrowserService.getWindow().siteLoader;
      }
      if (this.BrowserService.getWindow().hideOCBonComp) {
        this.isOneClickBetGlobal = true;
      }
      if (this.BrowserService.getWindow().isIframe) {
        this.isIframe = this.BrowserService.getWindow().isIframe;
      }
      if (this.checkauthservice.IsLogin()) {
        this.isLoggedIn = true;
      }
      if (this.checkauthservice.HaveStakes()) {
        this.cBuyRate = this.checkauthservice.cBuyRate;
        this.cTotalShare = this.checkauthservice.cTotalShare;
        this.currencyCode = this.checkauthservice.currencyCode;
      }
    }
  }

  ngAfterViewInit() {
    if (this.PlatformService.isBrowser()) {
      if (this.deviceService.isMobile(navigator.userAgent)) {
        setTimeout(() => {
          window.scroll(0, 0)
        }, 500)
      }
    }
  }

  routeToMarket(link: any) {
    link ? this.router.navigate([link]) : {};
  }

  routeToBookMaker(market: any) {
    this.router.navigate(['/sports/bookmaker/' + market.marketId + '/' + market.url])
  }


  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    if (this.PlatformService.isBrowser()) {
      this.route.params.subscribe((p: any) => {
        this.sportsId = p.id;
        this.timerService.clearTimer();
        this.scoreTimerService.clearTimer();
        this.isLoading = true
        this.LoadData(0);
      });
      if (this.isIframe) {
        this.utillsService.bannerData.subscribe((d: any) => {
          if (d) {
            this.outerNav = this.utillsService.returnFormatedData(d, 'TopLiveCasino')
          }
        })
      }
    }
  }

  calculateWhatIf($event: any, eventName: string) {
    return
    let market = this.data.filter((event: any) => event.name === eventName)

    if (market && market.length > 0) {
      console.log("data", market[0].markets)
      this.utillsService.calWhatIf(market[0].markets, $event)
      console.log("data", market[0].markets)

    }
  }

  routeToCompetition(sp: any) {
    if (sp.name == 'Virtual Cricket') {
      this.router.navigate(
        ['/sports/tournament/' + this.backendService.slugifyName(sp.name) + '-' + sp.eventID]
      )
    } else if (sp.name === 'ICC Champions Trophy') {
      this.router.navigate([sp.markets[0].url])
    } else {
      this.router.navigate(
        ['/sports/tournament', sp.name.trim().toLowerCase().split(' ').join('-') + '-' + sp.eventID]
      )
    }
  }



  isLoading: boolean = true

  LoadData(_page: number) {
    this.isLoading = true
    this.data = []
    this.marketIds = []
    this.eventIds = []
    this.inPlayMarketIds = []
    if (this.sportsId == 'inplay') {
      this.backendService
        .inplayevents(_page, 'SportsbyidComponent')
        .subscribe((resp: any) => {
          resp.competitions = resp
          this.isLoading = false
          this.sortMarketData(resp)
        })

    } else if (this.sportsId == 'all') {
      this.backendService.getdefaultpage(_page, 'SportsbyidComponent').subscribe((resp: any) => {
        resp.competitions = resp
        this.isLoading = false
        this.sortMarketData(resp)
      })
    }

    else {
      let ids = [
        'soccer',
        'tennis',
        'golf',
        'cricket',
        'rugby-union',
        'motor-sport',
        'baseball',
        'basketball',
        'boxing',
        'darts',
        'gaelic-games',
        'mixed-martial-arts',
        'olympics',
        'rugby-league',
        'snooker',
        'grey-hound-racing',
        'horse-racing',
        'american-football',
      ]
      if (!ids.includes(this.sportsId)) {
        this.router.navigate(['/sports/all'])
        return
      }
      this.backendService
        .sportsbyid(this.sportsId, _page, 'SportsbyidComponent')
        .subscribe((resp: any) => {
          this.isLoading = false
          this.sortMarketData(resp)
        })

    }

  }


  noDataFound = false

  inPlayMarketIds: string[] = []
  sortMarketData(resp: any) {
    if (resp.competitions && resp.competitions.length > 0) {
      resp.competitions.forEach((x: any) => {
        this.data.push({
          id: resp.id ? resp.id : x.id,
          name: x.name,
          markets: x.markets,
          eventID: x.id
        }
        )
        this.eventIds = this.eventIds.concat(
          x.markets.filter((x: any) => x.inplay).map((x: any) => x.version)
        );
        this.marketIds = this.marketIds.concat(
          x.markets.map((x: any) => x.marketId)
        );
        this.inPlayMarketIds = this.inPlayMarketIds.concat(
          x.markets.filter((x: any) => x.inplay).map((x: any) => x.marketId)
        )
      });

      this.GetSportMarketLiability(this.inPlayMarketIds.join(','))
      this.GetScore();
      this.GetMarketRates();
      this.timerService.SetTimer(
        setInterval(() => {
          this.GetMarketRates();
        }, this.interval)
      );
      this.scoreTimerService.SetTimer(
        setInterval(() => {
          this.GetScore();
        }, this.sInterval)
      );
    } else {
      if (resp.competitions.length == 0) {
        this.noDataFound = true
      }
    }

  }





  GetSportMarketLiability(marketIds: string) {
    if (this.checkauthservice.IsLogin()) {
      if (marketIds != "") {
        this.backendService
          .SportsMarketliability(marketIds, 'UpcomingComponent')
          .subscribe(
            {
              next: (resp) => {
                if (resp && resp.length > 0) {
                  resp.forEach((x: any) => {
                    this.data.forEach((event: any) => {
                      let l = event.markets.filter(
                        (lm: any) => lm.marketId == x.marketId
                      );
                      if (l && l.length > 0) {
                        l[0].marketLiability = x.libility;
                      }
                    })
                  })
                }
              },
              error: (error) => this.catchError(error),
            }
          )

      }
    }
  }


  GetWalllet() {
    this.walletService.loadBalance()
  }

  BetPlacedStatus(status: any) {
    if (status.success) {
      this.market = null
      this.GetWalllet();
      this.GetSportMarketLiability(status.marketId);
    }
  }
  get isOneClickOn() {
    return this.storageService.getItem('OCB') && this.isOneClickBetGlobal
  }
  market: any = {}
  placebet(
    name: string,
    m: MarketCatalogueSS,
    r: MarketRunners,
    type: string,
  ) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    let price = type == 'back' ? r.back[0].price : r.lay[0].price
    if (price == '' ||
      price == '0'
      || price == undefined || price == null) {
      return
    }
    this.market = null
    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      eventId: m.version,
      marketId: m.marketId,
      marketTypye: m.description?.marketType,
      selectionid: r.selectionId,
      name: r.runnerName,
      handicap: r.handicap,
      price: price,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: "ODDS",
      bettingType: "ODDS",
      oneClickType: name,
      minSettings: m.minSettings,
      maxSettings: m.maxSettings,
      maxMarketSettings: m.maxMarketSettings,
    };

    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip)
    } else {
      m.betslip = {
        ...betSlip
      };
    }
    this.market = m
  }


  populateRate(rate: any, markets: any, indexx: any) {

    let m = markets.filter(
      (x: any) => x.marketId == rate.marketId
    );
    if (m && m.length > 0) {
      if (rate.inplay != undefined) {
        m[0].inplay = rate.inplay;
      }
      m[0].status = rate.status;
      if (rate.status == 'CLOSED') {
        this.interval = this.BrowserService.getWindow().closedmarketinterval;
      }
      if (rate.status == 'CLOSED') {
        let indexToRemove = markets.findIndex((obj: any) => obj.marketId == rate.marketId);
        if (indexToRemove !== -1) {
          let indexToRemoveID = this.marketIds.findIndex((id: any) => id == rate.marketId);
          markets.splice(indexToRemove, 1);
          this.marketIds.splice(indexToRemoveID, 1);
          if (markets.length == 0) {
            this.data.competitions.splice(indexx, 1)
          }
          markets = [...markets]
        }
      }
      m[0].totalMatched = rate.totalMatched;
      rate.runners?.forEach((runner: any) => {
        let r = m[0].runners.filter(
          (run: any) => run.selectionId == runner.selectionId
        );
        if (r && r.length > 0) {
          r[0].status = runner.status;
          r[0].totalMatched = shortenLargeNumber(
            SetAmount(
              runner.totalMatched,
              this.cTotalShare,
              this.cBuyRate
            )
          );
          r[0].lastPriceTraded = runner.lastPriceTraded;
          if (runner.removalDate) {
            r[0].removalDate = new Date(runner.removalDate);
          }
          if (
            runner.ex.availableToBack &&
            runner.ex.availableToBack.length > 2
          ) {
            r[0].back[0].price = runner.ex.availableToBack[0].price;
            r[0].back[0].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToBack[0].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].back[1].price = runner.ex.availableToBack[1].price;
            r[0].back[1].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToBack[1].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].back[2].price = runner.ex.availableToBack[2].price;
            r[0].back[2].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToBack[2].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
          } else if (
            runner.ex.availableToBack &&
            runner.ex.availableToBack.length > 1
          ) {
            r[0].back[0].price = runner.ex.availableToBack[0].price;
            r[0].back[0].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToBack[0].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].back[1].price = runner.ex.availableToBack[1].price;
            r[0].back[1].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToBack[1].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].back[2].price = '';
            r[0].back[2].size = '';
          } else if (
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
            r[0].back[1].price = '';
            r[0].back[1].size = '';
            r[0].back[2].price = '';
            r[0].back[2].size = '';
          } else {
            r[0].back[0].price = '';
            r[0].back[0].size = '';
            r[0].back[1].price = '';
            r[0].back[1].size = '';
            r[0].back[2].price = '';
            r[0].back[2].size = '';
          }
          if (
            runner.ex.availableToLay &&
            runner.ex.availableToLay.length > 2
          ) {
            r[0].lay[0].price = runner.ex.availableToLay[0].price;
            r[0].lay[0].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToLay[0].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].lay[1].price = runner.ex.availableToLay[1].price;
            r[0].lay[1].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToLay[1].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].lay[2].price = runner.ex.availableToLay[2].price;
            r[0].lay[2].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToLay[2].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
          } else if (
            runner.ex.availableToLay &&
            runner.ex.availableToLay.length > 1
          ) {
            r[0].lay[0].price = runner.ex.availableToLay[0].price;
            r[0].lay[0].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToLay[0].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].lay[1].price = runner.ex.availableToLay[1].price;
            r[0].lay[1].size = shortenLargeNumber(
              SetAmount(
                runner.ex.availableToLay[1].size,
                this.cTotalShare,
                this.cBuyRate
              )
            );
            r[0].lay[2].price = '';
            r[0].lay[2].size = '';
          } else if (
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
            r[0].lay[1].price = '';
            r[0].lay[1].size = '';
            r[0].lay[2].price = '';
            r[0].lay[2].size = '';
          } else {
            r[0].lay[0].price = '';
            r[0].lay[0].size = '';
            r[0].lay[1].price = '';
            r[0].lay[1].size = '';
            r[0].lay[2].price = '';
            r[0].lay[2].size = '';
          }
        }
      });
    }

  }
  GetMarketRates() {
    if (navigator.onLine == true && document.hidden == false) {

      this.backendService
        .marketsbook(this.marketIds.join(','), 'SportsbyidComponent')
        .subscribe(
          {
            next: (resp) => {
              if (resp && resp.length > 0) {
                resp?.forEach((rate) => {
                  this.data?.forEach((sports: any, indexx: number) => {
                    this.populateRate(rate, sports.markets, indexx)
                  });
                });
              }
            },
            error: (error) => this.catchError(error),
          }
        )

    }
  }

  routeToTournament(data: any) {
    if (this.sportsMapperService.getSportByName(data.name.toLowerCase()) !== '') {
      this.router.navigate(['/sports', this.backendService.slugifyName(data.name)]);
    } else {
      this.routeToCompetition(data)
    }
  }
  scoreData: any
  async GetScore() {
    if (this.eventIds && this.eventIds.length > 0) {
      let eventIds = [...new Set(this.eventIds)];
      let scoreData = await this.utillsService.getScore(eventIds)
      if (scoreData && scoreData.length > 0) {
        this.scoreData = scoreData
        scoreData.forEach((s: any) => {
          this.data?.forEach((sp: DirectCopetitionMarket) => {
            let m = sp.markets?.filter((a: any) => a.version == s.eventId);
            if (m && m.length > 0) {
              m[0].score = s.score;
            }
          });
        });
      }
    }
  }






  oneClickBetObj: any = {}
  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.oneClickBetObj[betslip.oneClickType] = true
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response, betslip.marketId)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.oneClickBetObj[betslip.oneClickType] = false

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

  nextCall() {
    if (this.marketIds.length < 20) {
      this.isNext = false;
    } else {
      window.scrollTo(0, 0);
      this.nextPage++;
      this.isPrev = true;
      this.marketIds = [];
      this.LoadData(this.nextPage);
    }
  }

  prevCall() {
    if (this.nextPage > 0) {
      window.scrollTo(0, 0);
      this.nextPage--;
      this.isNext = true;
      this.marketIds = [];
      this.LoadData(this.nextPage);
    } else {
      this.isPrev = false;
    }
  }



}
