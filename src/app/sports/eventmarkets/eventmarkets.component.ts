import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import {
  MatchedUnmatched,
  CurrentBets,
  ClientParameters,
  CurrentBetsInput,
  MarketRunners,
  MatchUnModel,
  ClientWallet,
  ClientPosition,
} from '../../models/models';
import { BackendService, SportsBookMarkets } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { iFrameResizer } from '../../../assets/lmtScore/sports-radar';
import { FancytimerService, TimerService } from '../../services/timer.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import {
  shortenLargeNumber,
  SetAmount,
} from '../../services/shortenLargeNumber';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UtillsService } from '../../services/utills.service';
import { RecentMarketsService } from '../../services/recent-markets.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetStatusService } from '../../services/get-status.service';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../services/generic.service';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { TimeremainingComponent } from '../../shared/reuse/time-remaining.component';
import { SoccerscorecardComponent } from '../soccerscorecard/soccerscorecard.component';
import { BasketballscorecardComponent } from '../basketballscorecard/basketballscorecard.component';
import { OddsbuttonComponent } from '../../shared/reuse/oddsbutton.component';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { SkeltonLoaderComponent } from '../../shared/skelton-loader/skelton-loader.component';
import { BookmakerDataComponent } from '../bookmaker-data/bookmaker-data.component';
import { FancyDataComponent } from '../fancy-data/fancy-data.component';
import { MybetsComponent } from '../my-bets/my-bets.component';
import { SportsBookComponent } from '../sports-book/sports-book.component';
import { StreamComponent } from '../../shared/stream.component';
import { CashoutBetslipComponent } from '../../shared/cashout-betslip/cashout-betslip.component';
import { RoundoffPipe } from '../../pipes/roundoff.pipe';
import { OrderbyrunnerPipe } from '../../pipes/orderbyrunner.pipe';
import { TennisscorecardComponent } from '../tennisscorecard/tennisscorecard.component';
import { SafePipe } from '../../pipes/safe.pipe';

declare function iFrameResize(): any;

@Component({
  selector: 'app-eventmarkets',
  templateUrl: './eventmarkets.component.html',
  styleUrls: ['./eventmarkets.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    OddsbuttonComponent,
    PartialBetslipComponent,
    CashoutBetslipComponent,
    SkeltonLoaderComponent,
    TimeremainingComponent,
    SoccerscorecardComponent,
    BasketballscorecardComponent,
    TennisscorecardComponent,
    BookmakerDataComponent,
    FancyDataComponent,
    MybetsComponent,
    SportsBookComponent,
    StreamComponent,
    RouterModule,
    ShortennumPipe,
    RoundoffPipe,
    OrderbyrunnerPipe,
    SafePipe


  ]
})
export class EventmarketsComponent implements OnInit, OnDestroy, AfterViewInit {
  matchedUnmatched: MatchedUnmatched | undefined;
  sendingrequest: any = false;
  clientMatchSize: any;
  clientUnmatchSize: any;
  dataInBetFairScoreCard: any = false;
  marketId: any = '';
  sportsId: string = '';
  username: string = '';
  data: any;
  showSlip: boolean = false;
  sportsBooks: SportsBookMarkets[] = [];
  sportsBookMarketsMap: Map<string, SportsBookMarkets> = new Map(); // Memoization map
  sportsBookInterval!: any
  sportsBookVisible: boolean = false
  sportsBookIntervalTime = 3000 // three seconds default
  marketName: any = [];
  source: any;
  showBetBtn: boolean = true;
  marketIds = Array<string>();
  // interval: { eventPage: number } = timeInterval;
  currentBets: CurrentBets[] = [];
  haveUnmatched = false;
  haveMatched = false;
  tvData: any;
  tvIp: string = '';
  safeUrl: any = '';
  lmtUrl: any = '';
  eventId: any = '';
  timer: any | undefined;
  startTime: String | undefined;
  startDate: String | undefined;
  timeRemaining: String | undefined;
  currencyCode = '';
  cBuyRate = 1;
  otherMarkets: any;
  cTotalShare = 0;
  interval: any;
  matchId: any = 0;
  rdata: any;
  details: any;
  runerlayback: any = [];
  prices: any;
  byPassStreamScript: boolean = false;
  srcData: any;
  src: any;
  displayLMT: boolean = false;
  toasterMessage: any;
  isLogin: boolean = false;
  hideOCBonComp: boolean = false;
  showCashout: boolean = false;
  winnerFancyEventMarkets: boolean = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  localmarketids = Array();
  checkedVal: any;
  stakesValues: any = [];
  siteLoader: any;
  isOneClickBetGlobal: boolean = false;
  isOneClickBetClient: boolean = false;
  showStreamAgent: boolean = false;
  isLoggedIn: boolean = false;
  isShowBalanceStream: boolean = false;
  isShowStreamMobile: boolean = false;
  minBalance: any = 0;
  showStreamOnBalance: any = true;
  deviceInfo: any;
  getChannelId: any = '';
  apiUrl: any = '';
  channelNew: any = '';
  showSportsBook = false
  fancyVersion: string = 'v4';
  fInterval: any

  constructor(
    private renderer: Renderer2,
    private checkauthservice: CheckAuthService,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private sportsService: BackendService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private timerService: TimerService,
    private translate: TranslateService,
    private utillsService: UtillsService,
    private getStatusService: GetStatusService,
    private recentMarketsService: RecentMarketsService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private genericService: GenericService,
    private fancyTimerService: FancytimerService,
    private walletService: WalletService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (_window().fancyVersion) {
      this.fancyVersion = _window().fancyVersion;
    }
    if (_window().byPassStreamScript) {
      this.byPassStreamScript = _window().byPassStreamScript;
    }
    if (_window().apiUrl) {
      this.apiUrl = _window().apiUrl;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().showSportsBook) {
      this.showSportsBook = _window().showSportsBook;
    }
    if (_window().winnerFancyEventMarkets) {
      this.winnerFancyEventMarkets = _window().winnerFancyEventMarkets;
    }
    if (_window().minBalance) {
      this.minBalance = _window().minBalance;
    }
    if (_window().sportsBookIntervalTime) {
      this.sportsBookIntervalTime = _window().sportsBookIntervalTime;
    }
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (_window().fancytimer) {
      this.fInterval = _window().fancytimer;
    }
    if (this.checkauthservice.IsLogin()) {
      if (_window().isShowBalanceStream) {
        this.isShowBalanceStream = _window().isShowBalanceStream;
      }
      this.isLoggedIn = true;
      if (this.isShowBalanceStream) {
        this.getStatusService.balanceClient$.subscribe((balance) => {
          this.showStreamOnBalance =
            balance.balance < this.minBalance ? false : true;
        });
      }
    }
    this.isLogin = this.checkauthservice.IsLogin();
    if (this.isLogin) {
      this.getStackButtons();
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().showCashout) {
      this.showCashout = _window().showCashout;
    }
    if (_window().isShowStreamMobile) {
      this.isShowStreamMobile = _window().isShowStreamMobile;
    }
    this.route.params.subscribe((p: any) => {
      this.sportsId = p.id;
      this.sportsId =
        this.sportsId.split('-')[this.sportsId.split('-').length - 1];
      this.clientMatchSize = null;
      this.clientUnmatchSize = null;
      this.checkPathandLoaddata();
    });

    if (_window().eventmarkettimer) {
      this.interval = _window().eventmarkettimer;
    }
    if (_window().displaylmt) {
      this.displayLMT = _window().displaylmt;
    }
    if (this.checkauthservice.HaveStakes()) {
      this.cBuyRate = this.checkauthservice.cBuyRate;
      this.cTotalShare = this.checkauthservice.cTotalShare;
      this.currencyCode = this.checkauthservice.currencyCode;
    }
  }


  fancyResponse: any;

  loadFancyData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportsService
        .FancyMarketsAny(
          this.fancyVersion,
          this.eventId,
        )
        .subscribe({
          next: (resp) => {
            if (resp) {
              this.fancyResponse = resp
            }
          },
          error: (err) => {
            this.catchError(err)
          }
        }

        )

    }
    this.fancyTimerService.SetTimer(
      setInterval(() => {
        this.loadFancyData();
      }, this.fInterval)
    );
  }

  getStackButtons() {
    this.utillsService.stakesValues.subscribe((resp: any) => {
      if (resp) {
        this.stakesValues = resp;
      }
    });
  }

  routeToTournament(data: any) {
    this.router.navigate([
      '/sports/tournament/' +
      data.competition.name
        .trim()
        .toLowerCase()
        .split(' ')
        .join('-')
        .replace(/[^a-z0-9-]/g, '') +
      '-' +
      data.competition.id,
    ]);
  }

  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      this.showStreamAgent = true;
    }
  }

  onVisibilityChange(visible: any) {
    this.sportsBookVisible = visible;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      iFrameResize();
    }, 5000);
  }


  placingBet = false;
  mktType: string = '';

  LoadCurrentBets() {
    this.sendingrequest = true;
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.sportsService
          .SportsCurrentbets(
            new CurrentBetsInput('0', this.eventId, false),
            'EventmarketsComponent'
          )
          .subscribe(
            {
              next: (resp) => this.HandleCurrentBets(resp),
              error: (error) => this.catchError(error),
            }

          )

      }
    }
  }

  HandleCurrentBets(resp: CurrentBets[]) {
    this.utillsService.currentBets.next({ bets: resp, eventId: this.eventId });
    if (resp && resp.length > 0) {
      this.currentBets = resp;
    } else {
      this.currentBets = [];
    }
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.fancyTimerService.clearTimer()
    this.elementRef.nativeElement.remove();
    this.utillsService.currentBets.next([]);
    this.sportsBookInterval ? clearInterval(this.sportsBookInterval) : {}
  }

  winnerMarketId: any = '';
  getIPAddress: any = '';

  ngOnInit(): void {
    if (this.byPassStreamScript) {
      this.showStreamAgent = true;
    } else {
      this.checkUserAgent();
    }
    this.route.queryParamMap.subscribe((params) => {
      this.winnerMarketId = params.get('marketId');
    });
    sessionStorage.clear();
  }

  openCashout(m: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (
      (m.liability == null || m.liability === 0) && m.runners &&
      m.runners[0].position != 0
    ) {
      this.toasterService.show('Exposure not found', {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return;
    }
    this.data.competition.event.markets.forEach((element: any) => {
      element.runners?.forEach((x: any) => (x.betslip = null));
    });
    m.cashout = !m.cashout;
    if (m.cashout) {
      let btn = this.checkauthservice.getstaks();
      m.betslip = {
        eventId: this.eventId,
        marketId: m.marketId,
        selectionid: null,
        name: null,
        handicap: 0,
        price: null,
        size: btn.stakeVal2,
        bType: null,
        stakeButtons: btn,
        bettingOn: 'ODDS',
        bettingType: m.description?.bettingType,
        marketType: m.description?.marketType,
        linerange: m.description?.lineRangeInfo,
        minBet: m.minSettings,
        maxBet: m.maxSettings * this.localMarketRate,
      };
    } else {
      m.betslip = null;
    }


  }


  cancelBets(marketIds: any) {
    this.getSportsbookLiability(marketIds.join(','))
    this.RunnerPosition(marketIds.join(','))

    this.GetWalllet();
  }


  BetPlaceCashout(status: any) {
    if (status.success) {
      this.data.betslip = null;
      this.data.competition.event.markets.forEach((el: any) => {
        el.betslip = null;
        el.cashout = false;
      });
      this.LoadCurrentBets();
      this.GetSportMarketLiability();
      this.GetWalllet();
      this.getSportsbookLiability(status.marketId)
      this.RunnerPosition(status.marketId)
    }
  }

  BetPlacedStatus(status: any) {
    if (status.success) {
      let f = this.data.competition.event.markets.filter(
        (x: any) => x.marketId == status.marketId
      );
      if (f && f.length > 0) {
        f[0].runners?.forEach((x: any) => (x.betslip = null));
      }
      this.getSportsbookLiability(status.marketId)
      this.LoadCurrentBets();
      this.GetWalllet();
      this.RunnerPosition(status.marketId)
    }
  }

  changeToMarket(m: string) {
    this.router.navigate(['/sports/marketdetail/', m]);
  }

  calculateWhatIf($event: any) {
    let market = this.data.competition.event.markets.filter((market: any) => market.marketId === $event.marketId);
    let marketRunners;
    if (market && market.length > 0) {
      marketRunners = market[0].runners
      this.utillsService.calWhatIf(marketRunners, $event)
    }
  }


  placeBetMarketId: string = ""

  placebet(
    m: any,
    r: MarketRunners,
    type: string,
    price: any,
  ) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (price == '' ||
      price == '0'
      || price == undefined || price == null) {
      return
    }
    this.placeBetMarketId = m.marketId
    this.data.competition.event.markets.forEach((element: any) => {
      element.betslip = null;
      element.cashout = false;
    });
    m.runners?.forEach((x: any) => (x.betslip = null));
    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      eventId: this.eventId,
      marketId: m.marketId,
      selectionid: r.selectionId,
      name: r.runnerName,
      handicap: r.handicap,
      price: price,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'ODDS',
      bettingType: m.description?.bettingType,
      marketType: m.description?.marketType,
      linerange: m.description?.lineRangeInfo,
      oneClickType: m.marketName,
      minBet: m.minSettings,
      maxBet: m.maxSettings * this.localMarketRate,
    };
    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip)
    } else {
      r.betslip = {
        ...betSlip
      };
    }

  }

  oneClickBetObj: any = {}

  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.oneClickBetObj[betslip.oneClickType] = true
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response, betslip)
    } catch (err: any) {
      this.catchError(err)
    }
    this.oneClickBetObj[betslip.oneClickType] = false
  }

  catchError(err: any) {
    if (err && err.status && err.status == 401) {
      this.storageService.removeItem('token');
      this.timerService.clearTimer();
      this.genericService.openLoginModal()

    } else {
      console.log(err);
    }
  }

  betStatus(resp: any, betslip: any) {
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
        marketId: betslip.marketId
      })
    } else {
      this.toasterService.show(message, {
        classname: 'bg-danger text-white',
        delay: 4000,
        sound: true,
      });
    }

  }

  get isOneClickOn() {
    return this.storageService.getItem('OCB') && this.isOneClickBetGlobal
  }


  checkPathandLoaddata() {
    if (parseInt(this.sportsId) > 0) {
      this.LoadData();
    } else {
      this.router.navigate(['/sports/notfound']);
    }
  }


  // calculateWhatIf($event: any) {
  //   let market = this.data.competition.event.markets.filter((market: any) => market.marketId === $event.marketId);
  //   let marketRunners;
  //   if (market && market.length > 0) {
  //     marketRunners = market[0].runners
  //   }
  //   const updateRunner = (r: any, isBack: boolean, isSelected: boolean, pl: number, stake: number) => {
  //     if (r.position !== null && r.position !== undefined) {
  //       r.whatIf = isSelected
  //         ? (r.position + (isBack ? pl : -pl))
  //         : (r.position + (isBack ? -stake : stake));
  //     } else {
  //       r.whatIf = isSelected
  //         ? (isBack ? pl : -pl)
  //         : (isBack ? -stake : stake);
  //     }
  //   };

  //   if ($event.selectionID !== null) {
  //     const isBack = $event.bType === 'back';
  //     const pl = $event.pl;
  //     const stake = $event.stake;

  //     const updateRunners = (runners: any[], marketId?: string) => {
  //       runners.forEach((r: any) => {
  //         if (!marketId || r.marketId === marketId) {
  //           const isSelected = r.selectionId === $event.selectionID;
  //           updateRunner(r, isBack, isSelected, pl, stake);
  //         }
  //       });
  //     };

  //     if ($event.bettingType === "ODDS") {
  //       updateRunners(marketRunners);
  //     }
  //   } else {
  //     const clearWhatIf = (runners: any[], marketId?: string) => {
  //       runners.forEach((r: any) => {
  //         if (!marketId || r.marketId === marketId) {
  //           r.whatIf = null;
  //         }
  //       });
  //     };
  //     clearWhatIf(marketRunners);
  //   }
  // }


  LoadData() {
    this.sportsService
      .geteventmarkets(parseInt(this.sportsId), 'EventmarketsComponent')
      .subscribe((resp) => {
        if (resp && resp.name) {
          this.data = resp;
          this.recentMarketsService.pushRecentMarkets({
            route: this.router.url,
            name: resp.competition?.event?.name,
          });
          this.GetClientParameters()
          this.marketId = resp.competition?.id;
          if (this.data.competition?.event?.markets?.length > 0) {
            this.data.competition?.event?.markets.forEach((el: any) => {
              if (el.isLocalMarket && el.isLocalMarket === true) {
                this.localmarketids.push(el.marketId.replace('1.', '10.'));
              }
            });
            if (
              this.data.competition?.event?.markets[0].marketName?.toLowerCase() ==
              'bookmaker'
            ) {
              this.router.navigate([
                'sports/bookmaker/' +
                this.data.competition.event.markets[0].marketId,
                this.data.competition.event.id,
              ]);
            } else if (resp.id === '4' || resp.id == '4') {
              this.router.navigate([
                'sports/cricket/' +
                this.data.competition.event.markets[0].marketId,
              ]);
              return;
            }
            // else {
            //   this.router.navigate([
            //     'sports/marketdetail/' +
            //     resp.competition.event.markets[0].marketId,
            //   ]);
            // }
          }
          this.marketId = resp.competition?.id;
          this.eventId = resp.competition?.event?.id;
          this.matchId = resp.competition?.event?.matchId;
          let m = resp.competition?.event?.markets?.map((x) => x.marketId);
          if (m && m.length > 0) {
            m.forEach((x) => this.marketIds?.push(x || ''));
          }
          this.getSportsbookLiability(this.marketIds.join(','))
          this.RunnerPosition(this.marketIds.join(','))

          this.GetTV();
          this.MarketBookData();
          this.GetLMT(this.matchId);
          this.LoadCurrentBets();
          if (this.winnerFancyEventMarkets) {
            this.loadFancyData()
          }
          this.sportsService
            .GetOthersMarkets(this.marketIds[0])
            .subscribe((resp) => {
              this.otherMarkets = resp;
              this.marketIds.forEach((element) => {
                this.otherMarkets = this.otherMarkets.filter(
                  (x: any) => x.marketId != element
                );
              });
              this.MarketBookData();
            })

          this.timerService.SetTimer(
            setInterval(() => {
              this.MarketBookData();
              this.GetMatchedUnmatched();
            }, this.interval)
          );
        } else {
          if (this.winnerMarketId) {
            this.router.navigate([
              '/sports/marketdetail/' + this.winnerMarketId,
            ]);
          } else {
            this.router.navigate(['sports/notfound']);
          }
        }
      })

  }

  GetWalllet() {
    this.sportsService
      .Sportswallet(this.marketId, 'EventmarketsComponent')
      .subscribe(
        {
          next: (resp: ClientWallet) => this.HandleWallet(resp),
          error: (error) => this.catchError(error),
        }

      )

  }

  HandleWallet(resp: ClientWallet): any {
    this.walletService.loadBalance()
  }

  MarketBookData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportsService
        .directMarketsbook(this.marketIds.join(','), 'EventmarketsComponent')
        .subscribe(
          {
            next: (resp) => {
              if (resp && resp.length > 0) {
                resp.forEach((rate) => {
                  this.populateRate(rate, this.data.competition.event.markets)
                })
              }
            },
            error: (error) => this.catchError(error),
          }

        )

    }
  }

  populateRate(rate: any, markets: any) {
    let m = markets.filter(
      (x: any) => x.marketId == rate.marketId
    );
    if (m && m.length > 0) {
      if (rate.inplay != undefined) {
        m[0].inplay = rate.inplay;
      }
      m[0].status = rate.status;
      if (rate.status == 'CLOSED') {
        //this.timerservice.clearTimer();
        this.interval = _window().closedmarketinterval;
      }
      m[0].totalMatched = rate.totalMatched;
      m[0].marketLiability = sessionStorage.getItem(m[0].marketId);
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

  GetMatchedUnmatched() {
    if (navigator.onLine == true && document.hidden == false) {
      let marketIdes = new MatchUnModel(this.marketId, this.eventId, 'sports');
      if (this.checkauthservice.IsLogin() && this.currentBets && this.currentBets.length > 0) {
        if (this.localmarketids && this.localmarketids.length > 0) {
          marketIdes.type = 'All';
        }

        let m = new MatchUnModel('0', this.sportsId, 'SPORTS');
        this.sportsService
          .matchUnmatchAllSports(marketIdes, 'EventmarketsComponent')
          .subscribe(
            {
              next: (resp) => {
                this.matchedUnmatched = resp;
                if (
                  this.clientMatchSize !== this.matchedUnmatched.matchedSize ||
                  this.clientUnmatchSize !== this.matchedUnmatched.unMatchedSize
                ) {
                  this.LoadCurrentBets();
                  this.GetSportMarketLiability();
                  this.GetWalllet();
                  this.RunnerPosition(this.marketIds.join(','))
                  this.clientMatchSize = this.matchedUnmatched.matchedSize;
                  this.clientUnmatchSize = this.matchedUnmatched.unMatchedSize;
                }
              },
              error: (error) => this.catchError(error),
            }
          )

      }
    }
  }


  private GetSportMarketLiability() {
    if (this.checkauthservice.IsLogin()) {
      let sportsBookMarketIds = this.currentBets.filter((bet: any) => bet.marketId)
      if (sportsBookMarketIds && sportsBookMarketIds.length > 0) {
        this.getSportsbookLiability(sportsBookMarketIds.map(item => item.marketId).join(','))
      }
    }
  }

  RunnerPosition(marketIds: any) {
    if (this.checkauthservice.IsLogin()) {
      this.sportsService
        .clientpositionsports(marketIds)
        .subscribe(
          {
            next: (resp) => {
              if (resp && resp.length > 0) {
                resp.forEach(market => {
                  let mar = this.data.competition.event.markets.filter(
                    (x: any) => x.marketId == market.marketId
                  );
                  if (mar && mar.length > 0) {
                    mar[0].runners.forEach((run: any) => {
                      let clinetPosition = resp.filter(
                        (es) => es.marketId == market.marketId && es.runnerId == run.selectionId
                      )
                      if (clinetPosition && clinetPosition.length > 0) {
                        run.position = clinetPosition[0].position
                        run.rPosition = clinetPosition[0].rPosition
                        run.liability = clinetPosition[0].liability
                      }

                    });
                  }
                })
              }
            },
            error: (error) => this.catchError(error),
          }
        )

    }
  }

  toggleLiveShow: any = false;

  toggleLiveTV() {
    this.toggleLiveShow = false;
  }

  otherMarketData: any;

  showOtherMarkerData(om: any) {
    if (this.marketIds.length == 4) {
      const translatedResponse = this.toasterTranslationMethod(
        'You can view Max 4 markets at once. For more, kindly go through side tree or remove already selected markets.'
      );
      this.toasterService.show(translatedResponse, {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return;
    }
    this.otherMarkets = this.otherMarkets.filter(
      (market: { marketId: any }) => market.marketId != om?.marketId
    );
    this.LoadDataOtherMarkets(om?.marketId);

    this.marketIds.push(om?.marketId);

  }

  removeFromMarkets(market: any) {
    this.marketIds = this.marketIds.filter((id) => id != market.marketId);
    this.data.competition.event.markets =
      this.data.competition.event.markets.filter(
        (market1: { marketId: any }) => market1.marketId != market?.marketId
      );
    this.otherMarkets.push({
      marketId: market?.marketId,
      marketName: market?.marketName,
      inplay: market?.inplay,
    });
    if (this.localmarketids && this.localmarketids.length > 0) {
      this.localmarketids = this.localmarketids.filter(
        (x: any) => x !== market.marketId.replace('1.', '10.')
      );
    }
  }

  LoadDataOtherMarkets(marketId: any) {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportsService
        .marketdetail(marketId, 'MarketdetailComponent')
        .subscribe(
          {
            next: (value) => (resp) => {
              this.LoadCurrentBets();
              if (resp) {
                let otherMarketsData: any;
                otherMarketsData = resp;
                if (
                  otherMarketsData.isLocalMarket &&
                  otherMarketsData.isLocalMarket === true
                ) {
                  this.localmarketids.push(
                    otherMarketsData.marketId.replace('1.', '10.')
                  );
                }
                this.data.competition.event.markets.push(otherMarketsData);
                this.matchId = otherMarketsData.event.matchId;
                this.getSportsbookLiability(this.marketIds.join(','))
                this.RunnerPosition(this.marketIds.join(','))

                if (
                  otherMarketsData.eventType.id === '4' &&
                  otherMarketsData.description.marketType === 'MATCH_ODDS'
                ) {
                  this.router.navigate([
                    '/sports/cricket/' + otherMarketsData.marketId,
                  ]);
                } else {
                  // this.GetMarketRates();
                  // this.GetMatchedUnmatched();
                  // this.timerservice.SetTimer(setInterval(() => {
                  // this.GetMarketRates();
                  //   this.GetMatchedUnmatched();
                  // }, this.interval));
                }
              }
              setTimeout(() => {
                //

                if (this.matchId && this.matchId > 0) {
                  let themeMode = _window().themeMode ? _window().themeMode : 'dark';
                  this.lmtUrl =
                    _window().lmtscorecard + `Id=${this.matchId}&t=${themeMode == 'dark' ? 'd' : 'l'}`;

                  iFrameResizer('stats');
                }
              }, 2500);
            },
            error: (error) => this.catchError(error),
          }
        )

    }
  }

  noContentFound: any = false;

  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    if (resp.substring('</br>')) {
      resp = resp.replace(' </br>', '');
    }
    resp = resp.split(/(\d+)/);
    if (resp.length) {
      for (let i = 0; i < resp.length; i++) {
        if (isNaN(resp[i])) {
          this.translate.get(resp[i]).subscribe((res: string) => {
            this.toasterMessage = this.toasterMessage + res;
          });
        } else {
          this.toasterMessage = this.toasterMessage + resp[i];
        }
      }
    } else {
      this.translate.get(resp).subscribe((res: string) => {
        this.toasterMessage = res;
      });
    }
    return this.toasterMessage;
  }

  getChannelData(eventId: any, ip: any): void {

    this.http.get<any>(`${this.apiUrl}/${eventId}`).subscribe(
      (data) => {
        if (data.sportsRadarId > 0) {
          let themeMode = _window().themeMode ? _window().themeMode : 'dark';
          this.lmtUrl = _window().lmtscorecard + `Id=${data.sportsRadarId}&t=${themeMode == 'dark' ? 'd' : 'l'}`;
          this.matchId = data.sportsRadarId;
          // console.log(data.sportsRadarId, ' <<<<<<<<<<<<<< sports radar id')
          if (this.showSportsBook && this.matchId) {
            this.getSportsBook(this.matchId);
          }
        } else {
          this.dataInBetFairScoreCard = true;
        }
        if (data.channelId > 0) {
          this.channelNew = data.channelId;
          this.getStream(this.channelNew, ip);
        }
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  GetTV() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.srcData == undefined) {
        if (this.eventId != '') {
          this.sportsService
            .TvOnBookmaker(parseInt(this.eventId))
            .subscribe(
              {
                next: (resp) => {
                  this.srcData = resp;
                  this.getChannelData(parseInt(this.eventId || 0), resp.ipAddress);
                },
                error: (error) => {
                  this.toasterService.show(error, {
                    classname: 'bg-danger text-light',
                    delay: 1500,
                  });
                  console.error(error);
                },
              }
            )

        }
      }
    }
  }

  getStream(id: any, ip: any) {
    this.src = _window().streamurl + `chid=${id}&ip=${ip}`;
  }

  GetLMT(id: any) {
    if (id && id > 0) {
      let themeMode = _window().themeMode ? _window().themeMode : 'dark';
      this.lmtUrl = _window().lmtscorecard + `Id=${id}&t=${themeMode == 'dark' ? 'd' : 'l'}`;
    }

    iFrameResizer('stats');
  }

  // Sports Book
  runner!: any

  openBetSlipSportsBook(market: any, runner: any) {
    if (this.checkauthservice.IsLogin()) {
      let _runner = {
        marketId: market.marketId,
        selectionid: runner.selectionId,
        name: runner.runnerName,
        handicap: 0,
        price: runner.rate,
        size: 100,
        bType: 'back',
        stakeButtons: {
          cBuyRate: 1,
          cSellRate: 1,
          pShare: 0,
          cShare: 0,
          currencyCode: 'INR',
          stakeVal1: 100,
          stakeVal2: 200,
          stakeVal3: 500,
          stakeVal4: 1000,
          stakeVal5: 5000,
          stakeVal6: 10000,
          stakeVal7: 25000,
          stakeVal8: 50000,
          fancyRate: 100,
          bookMakerRate: 100,
          localMarketRate: 50,
          lineRate: 1,
          sportsBookRate: 1,
        },
        bettingOn: 'sb',
        bettingType: 'ODDS',
        marketType: 'MATCH_ODDS',
        linerange: null,
        eventId: this.matchId,
        isSingle: 'single',
        minBet: 50,
        maxBet: 20000,
        isSportsBook: true
      };
      this.runner = _runner

    } else {

    }
  }

  //Getting Markets Here
  getSportsBook(id: any) {
    // console.log(id,' <<<<<<<<<<<<<<<<<<<<<<<<<<<< id here')
    if (id !== '') {
      this.sportsService.sportsBookCall(id, 'EventmarketsComponent').subscribe((data: SportsBookMarkets[]) => {
        if (data && data.length > 0) {
          // this.sportsBooks = data;
          data.forEach((market: SportsBookMarkets) => {
            if (market.marketId) {
              this.sportsBookMarketsMap.set(market.marketId, market)
              this.sportsBooks.push(market)
            }
          })
          if (this.checkauthservice.IsLogin()) {
            let sportsBookMarketIds = this.currentBets.filter((bet: any) => bet.marketId.length > 12)
            if (sportsBookMarketIds && sportsBookMarketIds.length > 0) {
              this.GetSportbookPosition(sportsBookMarketIds.map(item => item.marketId).join(','));
              this.getSportsbookLiability(sportsBookMarketIds.map(item => item.marketId).join(','))
            }
          }
          this.sportsBookInterval = setInterval(() => {
            this.updateSportsBook(id)
          }, this.sportsBookIntervalTime)
        }
      });
    }
  }

  GetFancyMarketLiability() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.sportsService
          .FancyMarketsLiability(this.data.event.id)
          .subscribe(
            {
              next: (x: any) => {
                if (x && x.length > 0) {
                  x.forEach((e: any) => {
                    let sportMarket = this.sportsBookMarketsMap.get(e.marketId)
                    if (sportMarket) {
                      e.position < e.position2 ? sportMarket.liability = Number(Number(e.position).toFixed(2)) : sportMarket.liability = Number(Number(e.position2).toFixed(2))
                    }
                  });
                }
              },
              error: (error) => this.catchError(error),
            }
          )

      }
    }
  }

  updateSportsBook(id: any) {
    if (this.sportsBooks.length > 0 && navigator.onLine == true && document.hidden == false && this.sportsBookVisible) {
      this.sportsService.sportsBookCall(id, 'Cricket Component')
        .subscribe((data: SportsBookMarkets[]) => {
          if (data && data.length > 0) {
            data.forEach((market: SportsBookMarkets) => {
              if (market.marketId) {
                const previousMarket = this.sportsBookMarketsMap.get(market.marketId)
                if (previousMarket) {
                  previousMarket.update(market)
                } else {
                  this.sportsBookMarketsMap.set(market.marketId, market)
                  this.sportsBooks.push(market)
                }
              }
            })
            // marking those markets as inactive which do not appear in new data
            this.sportsBooks.forEach((market: SportsBookMarkets) => {
              data.filter((_market: any) => _market.marketId == market.marketId).length == 0 ? market.status = 'INACTIVE' : {}
            })
          }
        })
    }
  }


  // Getting reply from Partial Betslip for Sportsbook
  SportsBookBetStatus(status: any) {
    setTimeout(() => {
      this.LoadCurrentBets();
      this.GetSportbookPosition(status.marketId)
      this.getSportsbookLiability(status.marketId)
      this.GetWalllet();
    }, 1000)
  }

  // Market Liability for SportsBook
  getSportsbookLiability(marketIds: string) {
    if (this.checkauthservice.IsLogin() && marketIds !== '') {
      this.sportsService.SportsMarketliability(marketIds)
        .subscribe(
          {
            next: (value) => (resp: any) => {
              if (resp && resp.length > 0) {

                resp.forEach((x: any) => {
                  // @ts-ignore
                  // for sports book
                  this.sportsBookMarketsMap.get(x.marketId)?.liability = x.libility;
                  // let market = this.sportsBookMarketsMap.get(x.marketId)
                  // market ? market.liability = x.libility : {}

                  // for other markets
                  this.data.competition.event.markets.forEach((market: any) => {
                    if (market.marketId == x.marketId) {
                      market.liability = x.libility
                    }
                  })

                });

                resp.forEach((x: any) => {

                })
              }
            },
            error: (error) => this.catchError(error),
          }
        )

    }
  }

  // SportsBook Position
  GetSportbookPosition(marketID: string) {
    // console.log(marketID, marketID.split(',').length, ' <<<<<<<<<<<<<<<<<<<<<  +++++++++++++++++++++++++++++++ ')
    if (marketID !== '') {
      this.sportsService
        .clientpositionsports(marketID)
        .subscribe(
          {
            next: (resp: ClientPosition[]) => this.HandleSportsBookPosition(resp),
            error: (error) => this.catchError(error),
          }
        )

    }
  }

  HandleSportsBookPosition(resp: ClientPosition[]): any {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {
        let market = this.sportsBookMarketsMap.get(x.marketId)
        market ? market.updateRunnerPosition({ runnerId: x.runnerId, position: x.position, position2: x.position2 }) : {}
      });
    }
  }

  // Getting rates from socket for Sportsbook Markets

  getusername() {
    let random = Math.floor(Math.random() * 10000000 + 1);
    this.username =
      this.storageService.getItem('client') || random;
    return this.username;
  }


  sportsbook: boolean = true;
  collapsedArray: any = {
    // lineMarket: true,
    // fancyLeft: true,
    // fancyRight: true,
    // bookMaker: false,
    sportsBook: false,
  };


  showSportsBookTool(sportsMarket: any, sportsBooks: any, event: any) {
    this.renderer.listen('document', 'click', (e: Event) => {
      if (e != event) {
        sportsBooks.forEach((r: any) => (r.toolTip = false));
      } else {
        sportsBooks.forEach((r: any) => (r.toolTip = false));
        sportsMarket.toolTip = !sportsMarket.toolTip;
      }
    });
  }

  GetClientParameters() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.isLoggedIn) {
        this.checkauthservice.clientParameters.subscribe((clientParams: any) => {
          if (clientParams) {
            this.bookMakerRate = clientParams.bookMakerRate;
            this.fancyRate = clientParams.fancyRate;
            this.sportsBookRate = clientParams.sportsBookRate;
            this.localMarketRate = clientParams.localMarketRate;
            this.cBuyRate = clientParams.cBuyRate;
          }
        })
      } else {
        let bookmakerRate = _window()?.bookmakerMarketRate;
        let fancymarketRate = _window()?.fanceMarketRate;
        this.bookMakerRate = bookmakerRate;
        this.fancyRate = fancymarketRate;
      }
    }
  }

  sportsBookIndex: any = 0;
  sportsBookRate: number = 1;
  localMarketRate: number = 1;
  bookMakerRate: number = 1;
  fancyRate: number = 1;


}

