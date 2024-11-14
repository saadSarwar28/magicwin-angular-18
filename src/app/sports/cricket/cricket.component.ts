import {
  BackendService,
  SportsBookMarkets,
} from '../../services/backend.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  TimerService,
  FancytimerService,
  SportsBooktimerService,
  LotterytimerService,
} from '../../services/timer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  shortenLargeNumber,
  SetAmount,
} from '../../services/shortenLargeNumber';
import { BookpositionComponent } from '../../shared/bookposition/bookposition.component';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import {
  MatchedUnmatched,
  ClientPosition,
  ClientParameters,
  ClientWallet,
  CurrentBets,
  CurrentBetsInput,
  MarketCatalogueSS,
  MarketRunners,
  MatchUnModel,
} from '../../models/models';
import { iFrameResizer } from '../../../assets/lmtScore/sports-radar';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { RecentMarketsService } from '../../services/recent-markets.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetStatusService } from '../../services/get-status.service';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../services/generic.service';
import { WalletService } from '../../services/wallet.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { OddsbuttonComponent } from '../../shared/reuse/oddsbutton.component';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { TeamsScoreComponent } from '../../shared/reuse/teams-score.component';
import { SkeltonLoaderComponent } from '../../shared/skelton-loader/skelton-loader.component';
import { CricketscorecardComponent } from '../cricketscorecard/cricketscorecard.component';
import { OrderbyPipe } from '../../pipes/orderby.pipe';
import { MarketNamePipe } from '../../pipes/marketnameVs.pipe';
import { RoundoffPipe } from '../../pipes/roundoff.pipe';
import { RemoveUnderscorePipe } from '../../pipes/removeUnderscore.pipe';
import { OrderbyrunnerPipe } from '../../pipes/orderbyrunner.pipe';
import { StreamComponent } from '../../shared/stream.component';
import { TimeremainingComponent } from '../../shared/reuse/time-remaining.component';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { SafePipe } from '../../pipes/safe.pipe';
import { CashoutBetslipComponent } from '../../shared/cashout-betslip/cashout-betslip.component';
import { BookmakerDataComponent } from '../bookmaker-data/bookmaker-data.component';
import { FancyDataComponent } from '../fancy-data/fancy-data.component';
import { LineMarketsComponent } from '../line-markets/line-markets.component';
import { LotterymarketComponent } from '../lotterymarket/lotterymarket.component';
import { MybetsComponent } from '../my-bets/my-bets.component';
import { SportsBookComponent } from '../sports-book/sports-book.component';
declare function iFrameResize(): any;
@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MomentModule,
    OddsbuttonComponent,
    PartialBetslipComponent,
    TeamsScoreComponent,
    SkeltonLoaderComponent,
    CricketscorecardComponent,
    TimeremainingComponent,
    CashoutBetslipComponent,
    BookmakerDataComponent,
    FancyDataComponent,
    StreamComponent,
    LineMarketsComponent,
    LotterymarketComponent,
    SportsBookComponent,
    MybetsComponent,
    OrderbyPipe,
    ShortennumPipe,
    MarketNamePipe,
    RoundoffPipe,
    RouterModule,
    SafePipe,
    RemoveUnderscorePipe,
    OrderbyrunnerPipe

  ]
})
export class CricketComponent implements OnInit, AfterViewInit, OnDestroy {
  dataInBetFairScoreCard: any = false;
  sendingrequest = false;
  check: boolean = false;
  showStreamAgent: boolean = false;
  marketId: string = '';
  cancellingBet: any = false;
  showLineOtherMarkets: any = false;
  bookMarketId: string = '';
  matchedUnmatched: MatchedUnmatched | undefined;
  clientMatchSize: any;
  clientUnmatchSize: any;
  sportsId: string = '';
  data: any;
  bpData: any[] = [];
  sportsBookIntervalTime = 3000; // three seconds default
  lineData: any = {};
  fancyData: any = {};
  sportsBookVisible: boolean = false;
  firstFancyApiCall: any = true;
  source: any;
  lmtUrl: any = 0;
  LinemarketTimer: any;
  interval: any;
  fInterval: any;
  currentBets: CurrentBets[] = [];
  haveUnmatched = false;
  haveMatched = false;
  eventId: any;
  startTime: String | undefined;
  startDate: String | undefined;
  timeRemaining: String | undefined;
  clientPosition: ClientPosition | undefined;
  marketIds = Array<string>();
  marketIdss = Array<string>();
  thisMarketLiability: any | undefined;
  currencyCode = '';
  bookName = '';
  cBuyRate = 1;
  cTotalShare = 0;
  localMarketRate = 1;


  matchId: any = 0;
  otherMarkets: any;
  srcData: any;
  src: any;
  isShowBalanceStream: boolean = false;
  minBalance: any = 0;
  showStreamOnBalance: any = true;
  isLoggedIn: any = false;
  showSportsBook = false;
  username: string = '';
  displayLMT: boolean = false;
  showCashout: boolean = false;
  byPassStreamScript: boolean = false;
  sportsBooks: SportsBookMarkets[] = [];
  sportsBookMarketsMap: Map<string, SportsBookMarkets> = new Map(); // Memoization map
  marketName: any = [];
  sportsBookInterval!: any;
  sportsBookIndex: any = 0;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  isOneClickBetGlobal: boolean = false;
  isOneClickBetClient: boolean = false;
  isShowStreamMobile: boolean = false;
  siteLoader: any;
  //#region for placingbet different type
  fancyVersion: string = 'v4';
  showLotteryMarkets: any;
  minBKFncy: number = 50;
  deviceInfo: any;
  iframeLoaded: boolean = false;
  //#endregion
  constructor(
    private checkauthservice: CheckAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sportService: BackendService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private elementRef: ElementRef,
    private timerService: TimerService,
    private fancyTimerService: FancytimerService,
    private SBTimer: SportsBooktimerService,
    private recentMarkets: RecentMarketsService,
    private getStatusService: GetStatusService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private genericService: GenericService,
    private utillsService: UtillsService,
    private lotterytimerService: LotterytimerService,
    private walletService: WalletService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();

    this.isOneClickBetClient = this.storageService.getItem('OCB');
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (_window().showLotteryMarkets) {
      this.showLotteryMarkets = _window().showLotteryMarkets;
    }
    if (_window().isShowStreamMobile) {
      this.isShowStreamMobile = _window().isShowStreamMobile;
    }
    if (_window().showLineOtherMarkets) {
      this.showLineOtherMarkets = _window().showLineOtherMarkets;
    }
    if (_window().sportsBookIntervalTime) {
      this.sportsBookIntervalTime = _window().sportsBookIntervalTime;
    }

    if (_window().byPassStreamScript) {
      this.byPassStreamScript = _window().byPassStreamScript;
    }
    if (_window().showSportsBook) {
      this.showSportsBook = _window().showSportsBook;
    }
    if (_window().minBalance) {
      this.minBalance = _window().minBalance;
    }

    if (_window().minBKFncy) {
      this.minBKFncy = _window().minBKFncy;
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

    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }

    if (_window().showCashout) {
      this.showCashout = _window().showCashout;
    }
    if (!this.isLoggedIn) {
      this.localMarketRate = _window().locMarketRates;
      console.log('dsd', this.localMarketRate);
    }
    this.route.params.subscribe((p: any) => {
      this.marketId = p.id.split('-')[p.id.split('-').length - 1];
      this.clientMatchSize = null;
      this.clientUnmatchSize = null;
      this.checkPathandLoaddata();
    });

    if (_window().crickettimer) {
      this.interval = _window().crickettimer;
    }
    if (_window().displaylmt) {
      this.displayLMT = _window().displaylmt;
    }
    if (_window().fancytimer) {
      this.fInterval = _window().fancytimer;
    }
    if (_window().fancyVersion) {
      this.fancyVersion = _window().fancyVersion;
    }
  }

  fancyResponse: any;
  loadFancyData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportService
        .FancyMarketsAny(this.fancyVersion, this.eventId)
        .subscribe((resp) => {
          if (resp) {
            this.fancyResponse = resp;
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

  onIframeLoad() {
    this.iframeLoaded = true;
    const iframe = document.getElementById('frameStats');
    if (iframe) {
      iframe.style.visibility = 'visible';
    }
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
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

  getusername() {
    let random = Math.floor(Math.random() * 10000000 + 1);
    this.username =
      this.storageService.getItem('client') || random;
    return this.username;
  }

  apiUrl: any = '';
  channelNew: any = '';
  lmtLoader: boolean = true;

  getChannelData(eventId: any, ip: any): void {
    this.http.get<any>(`${this.apiUrl}/${eventId}`).subscribe(
      (data) => {
        if (data.sportsRadarId) {
          let themeMode = _window().themeMode ? _window().themeMode : 'dark';
          this.lmtUrl =
            _window().lmtscorecard +
            `Id=${data.sportsRadarId}&t=${themeMode == 'dark' ? 'd' : 'l'}`;
          this.lmtLoader = false;
          this.matchId = data.sportsRadarId;
          if (this.showSportsBook && this.matchId) {
            this.getSportsBook(this.matchId);
          }
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

  getStreamData() {
    if (this.srcData == undefined) {
      if (isNaN(this.eventId)) {
        this.eventId = this.data.event?.id;
      }
      this.sportService
        .TvOnBookmaker(parseInt(this.eventId || 0))
        .subscribe((resp) => {
          if (resp && resp.ipAddress) {
            this.srcData = resp;
            this.getChannelData(parseInt(this.eventId || 0), resp.ipAddress);
          }
        })

    }
  }

  GetClientParameters() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.isLoggedIn) {
        this.checkauthservice.clientParameters.subscribe((clientParams: any) => {
          if (clientParams) {
            this.bookMakerRate = clientParams.bookMakerRate;
            this.fancyRate = clientParams.fancyRate;
            this.lineRate = clientParams.localMarketRate;
            this.sportsBookRate = clientParams.sportsBookRate;
            this.localMarketRate = clientParams.localMarketRate;
            this.cBuyRate = clientParams.cBuyRate;
            this.cTotalShare = clientParams.pShare + clientParams.cShare;
          }
        });
      } else {
        let bookmakerRate = _window()?.bookmakerMarketRate;
        let fancymarketRate = _window()?.fanceMarketRate;
        this.lineRate = _window()?.locMarketRates;
        this.bookMakerRate = bookmakerRate;
        this.fancyRate = fancymarketRate;
        this.cTotalShare = 1;
      }
    }
  }

  bookMakerRate: number = 1;
  fancyRate: number = 1;
  lineRate: number = 1;
  sportsBookRate: number = 1;

  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      this.showStreamAgent = true;
    }
  }

  // GetClientParams() {
  //   let clientParams = this.storageService.getItem('clientParams');
  //   if (clientParams != null) {
  //     return (this.cTotalShare = clientParams.pShare + clientParams.cShare);
  //   } else {
  //     return 1;
  //   }
  // }

  getStream(id: any, ip: any) {
    this.src = _window().streamurl + `chid=${id}&ip=${ip}`;
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.SBTimer.clearTimer();
    this.sportsBookInterval ? clearInterval(this.sportsBookInterval) : {};
    this.elementRef.nativeElement.remove();
    this.lotterytimerService.clearTimer();
    this.utillsService.currentBets.next([]);
  }

  getIPAddress: any = '';

  ngOnInit(): void {
    if (_window().apiUrl) {
      this.apiUrl = _window().apiUrl;
    }
    if (this.byPassStreamScript) {
      this.showStreamAgent = true;
    } else {
      this.checkUserAgent();
    }
    this.utillsService.ipaddress.subscribe((data: any) => {
      if (data) {
        this.getIPAddress = data;
      }
    });
    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
    }
    this.marketId = this.route.snapshot.paramMap.get('id') || '';
    sessionStorage.clear();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      iFrameResize();
    }, 5000);
  }

  getMarketid(s: string) {
    return s.replace('.', '');
  }

  checkPathandLoaddata() {
    if (this.marketId && this.marketId !== '') {
      if (!this.marketId.includes('.')) {
        this.sportService
          .geteventmarkets(this.marketId, 'CRICKET COMPONENT')
          .subscribe((res: any) => {
            if (res.id == '4') {
              res.competition.event.markets.forEach(
                (market: any, index: number) => {
                  if (index == 0) {
                    this.marketId = market.marketId;
                    this.LoadData();
                  }
                }
              );
            }
          });
      } else {
        this.LoadData();
      }
    } else {
      this.router.navigate(['/sports/notfound']);
    }
  }
  lineMarkets: any[] = [];
  otherLineMarkets: any[] = [];
  LoadLineMarketData() {
    this.sportService
      .linemarketsundermo(this.eventId || 0, 'CricketComponent')
      .subscribe((resp) => {
        if (resp && resp.length > 0) {
          this.lineData = resp;
          this.lineMarkets = resp.filter((el) =>
            el.marketName?.includes('Line')
          );
          this.otherLineMarkets = resp.filter(
            (el) => !el.marketName?.includes('Line')
          );
          this.marketIds = resp.map((id: any) => id.marketId);
          this.getSportsbookLiability(
            this.lineData.map((item: any) => item.marketId).join(',')
          );
        }
        this.marketIds.push(this.data.marketId);
      })

  }

  getChannelId: any = '';
  isLoad: boolean = false;
  LoadData() {
    this.sportService
      .marketdetail(this.marketId, 'CricketComponent')
      .subscribe((resp) => {
        if (resp) {
          this.isLoad = true;
          this.data = resp;
          this.getChannelId = this.data?.channelId;
          this.recentMarkets.pushRecentMarkets({
            route: this.router.url,
            name: resp.event?.name,
          });
          this.eventId = this.data.event.id;
          this.matchId = this.data.event.matchId;
          this.marketIds.push(this.data.marketId);
          this.GetClientParameters();
          this.getStreamData();
          // this.GetTV();
          this.GetMarketRates();
          this.GetMatchedUnmatched();
          this.LoadCurrentBets();
          this.timerService.SetTimer(
            setInterval(() => {
              this.GetMarketRates();
              this.GetMatchedUnmatched();
            }, this.interval)
          );
        }
        this.GetLMT(this.matchId);
        this.LoadLineMarketData();
        this.loadFancyData();
      })

  }

  changeToMarket(m: string) {
    this.router.navigate(['/sports/marketdetail/', m]);
  }

  onCancelBet() {
    this.LoadCurrentBets();
  }

  LoadCurrentBets() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.sendingrequest = true;
        this.sportService
          .SportsCurrentbets(
            new CurrentBetsInput(
              this.marketId.replace('1.', '10.'),
              this.data.event.id,
              false
            ),
            'CricketComponent'
          )
          .subscribe((resp: any) => {
            this.utillsService.currentBets.next({
              bets: resp,
              eventId: this.eventId,
            });

            if (resp && resp.length > 0) {
              this.currentBets = resp;
            } else {
              this.currentBets = [];
            }
          })

      }
    }
  }
  openLinePosition(m: any, n: any) {
    let data = { marketId: m, marketName: n };
    console;
    this.genericService.openPopup(BookpositionComponent, data);
  }
  GetMarketRates() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.marketId == undefined || this.marketId.length <= 0) return;
      let uniq: any = [...new Set(this.marketIds)];
      this.sportService
        .directMarketsbook(uniq.join(','), 'CricketComponent')
        .subscribe((resp) => {
          if (resp && resp.length > 0) {
            resp.forEach((md: any) => {
              let totalshare = this.cTotalShare;
              try {
                if (md.marketId == this.marketId) {
                  this.data.inplay = md.inplay;
                  this.data.status = md.status;
                  this.data.totalMatched = md.totalMatched;
                  if (md.status == 'CLOSED') {
                    clearInterval(this.source);
                  }
                  md.runners?.forEach((runner: any) => {
                    let r = this.data.runners.filter(
                      (run: any) => run.selectionId == runner.selectionId
                    );
                    if (r && r.length > 0) {
                      r = r[0];

                      r.status = runner.status;
                      r.lastPriceTraded = runner.lastPriceTraded;
                      if (runner.removalDate) {
                        r[0].removalDate = new Date(runner.removalDate);
                      }
                      r.totalMatched = shortenLargeNumber(
                        SetAmount(
                          runner.totalMatched,
                          totalshare,
                          this.cBuyRate
                        )
                      );
                      if (
                        runner.ex.availableToBack &&
                        runner.ex.availableToBack.length > 2
                      ) {
                        r.back[0].price = runner.ex.availableToBack[0].price;
                        r.back[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToBack[0].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.back[1].price = runner.ex.availableToBack[1].price;
                        r.back[1].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToBack[1].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.back[2].price = runner.ex.availableToBack[2].price;
                        r.back[2].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToBack[2].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                      } else if (
                        runner.ex.availableToBack &&
                        runner.ex.availableToBack.length > 1
                      ) {
                        r.back[0].price = runner.ex.availableToBack[0].price;
                        r.back[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToBack[0].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.back[1].price = runner.ex.availableToBack[1].price;
                        r.back[1].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToBack[1].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.back[2].price = '';
                        r.back[2].size = '';
                      } else {
                        r.back[0].price = '';
                        r.back[0].size = '';
                        r.back[1].price = '';
                        r.back[1].size = '';
                        r.back[2].price = '';
                        r.back[2].size = '';
                      }

                      if (
                        runner.ex.availableToLay &&
                        runner.ex.availableToLay.length > 2
                      ) {
                        r.lay[0].price = runner.ex.availableToLay[0].price;
                        r.lay[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[0].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.lay[1].price = runner.ex.availableToLay[1].price;
                        r.lay[1].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[1].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.lay[2].price = runner.ex.availableToLay[2].price;
                        r.lay[2].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[2].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                      } else if (
                        runner.ex.availableToLay &&
                        runner.ex.availableToLay.length > 1
                      ) {
                        r.lay[0].price = runner.ex.availableToLay[0].price;
                        r.lay[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[0].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.lay[1].price = runner.ex.availableToLay[1].price;
                        r.lay[1].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[1].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.lay[2].price = '';
                        r.lay[2].size = '';
                      } else if (
                        runner.ex.availableToLay &&
                        runner.ex.availableToLay.length > 0
                      ) {
                        r.lay[0].price = runner.ex.availableToLay[0].price;
                        r.lay[0].size = shortenLargeNumber(
                          SetAmount(
                            runner.ex.availableToLay[0].size,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        r.lay[1].price = '';
                        r.lay[1].size = '';
                        r.lay[2].price = '';
                        r.lay[2].size = '';
                      } else {
                        r.lay[0].price = '';
                        r.lay[0].size = '';
                        r.lay[1].price = '';
                        r.lay[1].size = '';
                        r.lay[2].price = '';
                        r.lay[2].size = '';
                      }
                    }
                  });
                }
                if (this.lineMarkets && this.lineMarkets.length > 0) {
                  let m = this.lineMarkets.filter(
                    (x: any) => x.marketId == md.marketId
                  );
                  if (m && m.length > 0) {
                    m[0].inplay = md.inplay;
                    m[0].status = md.status;
                    let runer = md.runners?.filter(
                      (x: any) => x.selectionId == m[0].selectionId
                    );
                    if (runer && runer.length > 0) {
                      let bfrun = runer[0];
                      m[0].totalMatched = shortenLargeNumber(
                        SetAmount(
                          bfrun.totalMatched || 0,
                          totalshare,
                          this.cBuyRate
                        )
                      );
                      m[0].lastPriceTraded = bfrun.lastPriceTraded;
                      if (m[0].back.length == 0) {
                        m[0].back.push([]);
                        m[0].back.push([]);
                        m[0].back.push([]);
                      }
                      if (m[0].lay.length == 0) {
                        m[0].lay.push([]);
                        m[0].lay.push([]);
                        m[0].lay.push([]);
                      }
                      if (
                        bfrun?.ex?.availableToBack &&
                        bfrun?.ex?.availableToBack.length > 2
                      ) {
                        m[0].lay[0].price = bfrun.ex.availableToBack[0].price
                          ? bfrun.ex.availableToBack[0].price + 0.5
                          : '';
                        m[0].lay[0].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToBack[0].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].lay[1].price = bfrun.ex.availableToBack[1].price
                          ? bfrun.ex.availableToBack[1].price + 0.5
                          : '';
                        m[0].lay[1].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToBack[1].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].lay[2].price = bfrun.ex.availableToBack[2].price
                          ? bfrun.ex.availableToBack[2].price + 0.5
                          : '';
                        m[0].lay[2].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToBack[2].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                      } else if (
                        bfrun?.ex?.availableToBack &&
                        bfrun.ex.availableToBack.length > 1
                      ) {
                        m[0].lay[0].price = bfrun.ex.availableToBack[0].price
                          ? bfrun.ex.availableToBack[0].price + 0.5
                          : '';
                        m[0].lay[0].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToBack[0].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].lay[1].price = bfrun.ex.availableToBack[1].price
                          ? bfrun.ex.availableToBack[1].price + 0.5
                          : '';
                        m[0].lay[1].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToBack[1].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].lay[2].price = '';
                        m[0].lay[2].size = '';
                      } else if (
                        bfrun?.ex?.availableToBack &&
                        bfrun.ex.availableToBack.length > 0
                      ) {
                        m[0].lay[0].price = bfrun.ex.availableToBack[0].price
                          ? bfrun.ex.availableToBack[0].price + 0.5
                          : '';
                        m[0].lay[0].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToBack[0].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].lay[1].price = '';
                        m[0].lay[1].size = '';
                        m[0].lay[2].price = '';
                        m[0].lay[2].size = '';
                      } else {
                        m[0].lay[0].price = '';
                        m[0].lay[0].size = '';
                        m[0].lay[1].price = '';
                        m[0].lay[1].size = '';
                        m[0].lay[2].price = '';
                        m[0].lay[2].size = '';
                      }

                      if (
                        bfrun?.ex?.availableToLay &&
                        bfrun.ex.availableToLay.length > 2
                      ) {
                        m[0].back[0].price = bfrun.ex.availableToLay[0].price
                          ? bfrun.ex.availableToLay[0].price + 0.5
                          : '';
                        m[0].back[0].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToLay[0].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].back[1].price = bfrun.ex.availableToLay[1].price
                          ? bfrun.ex.availableToLay[1].price + 0.5
                          : '';
                        m[0].back[1].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToLay[1].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].back[2].price = bfrun.ex.availableToLay[2].price
                          ? bfrun.ex.availableToLay[2].price + 0.5
                          : '';
                        m[0].back[2].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToLay[2].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                      } else if (
                        bfrun?.ex?.availableToLay &&
                        bfrun.ex.availableToLay.length > 1
                      ) {
                        m[0].back[0].price = bfrun.ex.availableToLay[0].price
                          ? bfrun.ex.availableToLay[0].price + 0.5
                          : '';
                        m[0].back[0].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToLay[0].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].back[1].price = bfrun.ex.availableToLay[1].price
                          ? bfrun.ex.availableToLay[1].price + 0.5
                          : '';
                        m[0].back[1].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToLay[1].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].back[2].price = '';
                        m[0].back[2].size = '';
                      } else if (
                        bfrun?.ex?.availableToLay &&
                        bfrun.ex.availableToLay.length > 0
                      ) {
                        m[0].back[0].price = bfrun.ex.availableToLay[0].price
                          ? bfrun.ex.availableToLay[0].price + 0.5
                          : '';
                        m[0].back[0].size = shortenLargeNumber(
                          SetAmount(
                            bfrun?.ex?.availableToLay[0].size || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        m[0].back[1].price = '';
                        m[0].back[1].size = '';
                        m[0].back[2].price = '';
                        m[0].back[2].size = '';
                      } else {
                        m[0].back[0].price = '';
                        m[0].back[0].size = '';
                        m[0].back[1].price = '';
                        m[0].back[1].size = '';
                        m[0].back[2].price = '';
                        m[0].back[2].size = '';
                      }
                    }
                  }
                }
                if (this.otherLineMarkets && this.otherLineMarkets.length > 0) {
                  let m = this.otherLineMarkets.filter(
                    (x: any) => x.marketId == md.marketId
                  );
                  if (m && m.length > 0) {
                    m.forEach((market) => {
                      let runer = md.runners?.filter(
                        (x: any) => x.selectionId == market.selectionId
                      );
                      market.inplay = md.inplay;
                      market.status = md.status;
                      if (runer && runer.length > 0) {
                        let bfrun = runer[0];
                        market.totalMatched = shortenLargeNumber(
                          SetAmount(
                            bfrun.totalMatched || 0,
                            totalshare,
                            this.cBuyRate
                          )
                        );
                        market.lastPriceTraded = bfrun.lastPriceTraded;
                        if (market.back.length == 0) {
                          market.back.push([]);
                          market.back.push([]);
                          market.back.push([]);
                        }
                        if (market.lay.length == 0) {
                          market.lay.push([]);
                          market.lay.push([]);
                          market.lay.push([]);
                        }
                        if (
                          bfrun?.ex?.availableToBack &&
                          bfrun?.ex?.availableToBack.length > 2
                        ) {
                          market.back[0].price = bfrun.ex.availableToBack[0]
                            .price
                            ? bfrun.ex.availableToBack[0].price
                            : '';
                          market.back[0].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToBack[0].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.back[1].price = bfrun.ex.availableToBack[1]
                            .price
                            ? bfrun.ex.availableToBack[1].price
                            : '';
                          market.back[1].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToBack[1].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.back[2].price = bfrun.ex.availableToBack[2]
                            .price
                            ? bfrun.ex.availableToBack[2].price
                            : '';
                          market.back[2].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToBack[2].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                        } else if (
                          bfrun?.ex?.availableToBack &&
                          bfrun.ex.availableToBack.length > 1
                        ) {
                          market.back[0].price = bfrun.ex.availableToBack[0]
                            .price
                            ? bfrun.ex.availableToBack[0].price
                            : '';
                          market.back[0].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToBack[0].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.back[1].price = bfrun.ex.availableToBack[1]
                            .price
                            ? bfrun.ex.availableToBack[1].price
                            : '';
                          market.back[1].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToBack[1].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.back[2].price = '';
                          market.back[2].size = '';
                        } else if (
                          bfrun?.ex?.availableToBack &&
                          bfrun.ex.availableToBack.length > 0
                        ) {
                          market.back[0].price = bfrun.ex.availableToBack[0]
                            .price
                            ? bfrun.ex.availableToBack[0].price
                            : '';
                          market.back[0].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToBack[0].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );

                          market.back[2].price = '';
                          market.back[2].size = '';
                        } else {
                          market.back[0].price = '';
                          market.back[0].size = '';
                          market.back[1].price = '';
                          market.back[1].size = '';
                          market.back[2].price = '';
                          market.back[2].size = '';
                        }

                        if (
                          bfrun?.ex?.availableToLay &&
                          bfrun.ex.availableToLay.length > 2
                        ) {
                          market.lay[0].price = bfrun.ex.availableToLay[0].price
                            ? bfrun.ex.availableToLay[0].price
                            : '';
                          market.lay[0].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToLay[0].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.lay[1].price = bfrun.ex.availableToLay[1].price
                            ? bfrun.ex.availableToLay[1].price
                            : '';
                          market.lay[1].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToLay[1].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.lay[2].price = bfrun.ex.availableToLay[2].price
                            ? bfrun.ex.availableToLay[2].price
                            : '';
                          market.lay[2].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToLay[2].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                        } else if (
                          bfrun?.ex?.availableToLay &&
                          bfrun.ex.availableToLay.length > 1
                        ) {
                          market.lay[0].price = bfrun.ex.availableToLay[0].price
                            ? bfrun.ex.availableToLay[0].price
                            : '';
                          market.lay[0].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToLay[0].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );
                          market.lay[1].price = bfrun.ex.availableToLay[1].price
                            ? bfrun.ex.availableToLay[1].price
                            : '';
                          market.lay[1].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToLay[1].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );

                          market.lay[2].price = '';
                          market.lay[2].size = '';
                        } else if (
                          bfrun?.ex?.availableToLay &&
                          bfrun.ex.availableToLay.length > 0
                        ) {
                          market.lay[0].price = bfrun.ex.availableToLay[0].price
                            ? bfrun.ex.availableToLay[0].price
                            : '';
                          market.lay[0].size = shortenLargeNumber(
                            SetAmount(
                              bfrun?.ex?.availableToLay[0].size || 0,
                              totalshare,
                              this.cBuyRate
                            )
                          );

                          market.lay[1].price = '';
                          market.lay[1].size = '';
                          market.lay[2].price = '';
                          market.lay[2].size = '';
                        } else {
                          market.lay[0].price = '';
                          market.lay[0].size = '';
                          market.lay[1].price = '';
                          market.lay[1].size = '';
                          market.lay[2].price = '';
                          market.lay[2].size = '';
                        }
                      }
                    });
                  }
                }
              } catch (error) {
                // gtag('event', 'exception', {
                //   description: error,
                //   fatal: false,
                // });
                console.error(error);
              }
            });
          }
        })

    }
  }

  GetMatchedUnmatched() {
    if (navigator.onLine == true && document.hidden == false) {
      if (
        this.checkauthservice.IsLogin() &&
        this.currentBets &&
        this.currentBets.length > 0
      ) {
        const mUmModal: MatchUnModel = {
          marketId: '0',
          eventId: this.data.event.id,
          type: this.data.isLocalMarket ? 'ALL' : 'CRICKET',
        };
        this.sportService
          .matchUnmatchAllSports(mUmModal, 'CricketComponent')
          .subscribe({
            next: (resp) => {
              this.matchedUnmatched = resp;
              if (
                this.clientMatchSize !== this.matchedUnmatched.matchedSize ||
                this.clientUnmatchSize !== this.matchedUnmatched.unMatchedSize
              ) {
                setTimeout(() => {
                  this.GetMarketPosition();
                  this.GetSportMarketLiability();
                  this.LoadCurrentBets();
                }, 900);
                this.GetWalllet();
                this.clientMatchSize = this.matchedUnmatched.matchedSize;
                this.clientUnmatchSize = this.matchedUnmatched.unMatchedSize;
              }
            },
            error: (error) => this.catchError(error),
          })
        // .catch((err) => {
        //   this.catchError(err);
        // });
      }
    }
  }

  GetWalllet() {
    this.walletService.loadBalance();
  }

  cancelBets(marketIds: any) {
    this.getSportsbookLiability(marketIds.join(','));
  }

  oddsBetPlacedStatus(status: any) {
    if (status.success) {
      this.data.runners.forEach((r: any) => (r.betslip = null));
      this.callPosLibCurrBets(status.marketId);
    }
  }

  lineBetPlacedStatus(status: any) {
    if (status.success) {
      this.lineData.forEach((l: any) => (l.betslip = null));
      this.callPosLibCurrBets(status.marketId);
    }
  }

  BetPlaceCashout(status: any) {
    if (status.success) {
      this.data.betslip = null;
      this.data.cashout = false;
      this.callPosLibCurrBets(status.marketId);
    }
  }

  callPosLibCurrBets(marketId: any) {
    this.GetMarketPosition();
    this.getSportsbookLiability(marketId);
    this.LoadCurrentBets();
    this.GetWalllet();
  }

  get isOneClickOn() {
    return (
      this.storageService.getItem('OCB') &&
      this.isOneClickBetGlobal
    );
  }

  openCashout(m: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal();
      return;
    }
    if (
      (m.marketLiability == null || m.marketLiability === 0) &&
      m.runners &&
      m.runners[0].position != 0
    ) {
      this.toasterService.show('Exposure not found', {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return;
    }
    this.data.runners.forEach((r: any) => (r.betslip = null));
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
        minBet: this.data.minSettings,
        maxBet: this.data.maxSettings * this.localMarketRate,
      };
    } else {
      m.betslip = null;
    }
  }

  oneClickBetObj: any = {
    odds: false,
    lineMarkets: false,
    tiedMatch: false,
    completedMatch: false,
    toWinToss: false,
  };

  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize;
    try {
      this.oneClickBetObj[betslip.oneClickType] = true;
      let response: any = await this.utillsService.placeBet(betslip);
      this.betStatus(response, betslip.marketId);
    } catch (err: any) {
      this.catchError(err);
    }
    this.oneClickBetObj[betslip.oneClickType] = false;
  }

  catchError(err: any) {
    if (err && err.status && err.status == 401) {
      this.storageService.removeItem('token');
      this.timerService.clearTimer();
      this.fancyTimerService.clearTimer();
      this.genericService.openLoginModal();
    } else {
      console.log(err);
    }
  }

  betStatus(resp: any, marketId: any) {
    let betstatus = resp.status;
    const message = resp.message || resp.response.message;
    if (betstatus) {
      this.callPosLibCurrBets(marketId);
      this.toasterService.show(message, {
        classname: 'bg-success text-white',
        delay: 4000,
        sound: true,
      });
    } else {
      this.toasterService.show(message, {
        classname: 'bg-danger text-white',
        delay: 4000,
        sound: true,
      });
    }
  }

  placebet(
    m: MarketCatalogueSS,
    r: MarketRunners,
    type: string,
    index: number
  ) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal();
      return;
    }
    let price = type == 'back' ? r.back[index].price : r.lay[index].price;
    if (price == '' || price == '0' || price == undefined || price == null) {
      return;
    }
    this.data.runners.forEach((r: any) => (r.betslip = null));
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
      minBet: this.data?.minSettings,
      maxBet: this.data?.maxSettings * this.localMarketRate,
      oneClickType: 'odds',
    };
    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip);
    } else {
      this.data.betslip = null;
      r.betslip = {
        ...betSlip,
      };
    }
  }

  placebetLine(oneClickType: string, r: any, type: string, price: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal();
      return;
    }

    if (price == '' || price == '0' || price == undefined || price == null) {
      return;
    }
    this.lineData.forEach((l: any) => (l.betslip = null));
    let btn = this.checkauthservice.getstaks();
    let betOn = r.runnerName.toLowerCase().includes('line') ? 'LINE' : '';
    let betsSlip = {
      eventId: this.eventId,
      marketId: r.marketId,
      selectionid: r.selectionId,
      name: r.runnerName,
      handicap: r.handicap,
      price: price,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: betOn,
      bettingType: betOn,
      marketType: betOn,
      linerange: r.lineRangeInfo,
      oneClickType,
    };
    if (this.isOneClickOn) {
      this.placeOneClickBet(betsSlip);
    } else {
      if (betOn == 'LINE') {
        r.betslip = {
          ...betsSlip,
          minBet: this.lineData[0].minSettings,
          maxBet: this.lineData[0].maxSettings * this.lineRate,
        };
      } else {
        r.betslip = {
          ...betsSlip,
          minBet: r?.minSettings,
          maxBet: r?.maxSettings * this.localMarketRate,
        };
      }
    }
  }

  GetMarketPosition() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.marketId == undefined || this.marketId.length <= 0) return;
      let oddsMkts = [this.data.marketId.replace('1.', '10.')];
      let otherLineIds: string[] = [];
      if (this.otherLineMarkets && this.otherLineMarkets.length > 0) {
        otherLineIds = this.otherLineMarkets.map((mar) => mar.marketId);
      }
      let allMarkets = [...new Set(oddsMkts), ...new Set(otherLineIds)];
      this.sportService
        .clientpositionsports(allMarkets.join(','))
        .subscribe({
          next: (res) => {
            this.HandleRunnerPosition(res)
          },
          error: (err) => this.catchError(err),
        })

    }
  }

  HandleRunnerPosition(resp: ClientPosition[]): any {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {
        if (this.data && this.data.runners && this.data.runners.length > 0) {
          let runer = this.data.runners.filter(
            (a: any) =>
              a.selectionId == x.runnerId && x.marketId == this.data.marketId
          );
          if (runer && runer.length > 0) {
            runer[0].position = x.position;
            runer[0].RPosition = x.rPosition;
          }
        }
        if (this.otherLineMarkets && this.otherLineMarkets.length > 0) {
          let runer = this.otherLineMarkets.filter(
            (a: any) => a.marketId == x.marketId && x.runnerId == a.selectionId
          );
          if (runer && runer.length > 0) {
            runer[0].position = x.position;
            runer[0].RPosition = x.rPosition;
          }
        }
      });
    }
  }

  GetSportMarketLiability() {
    if (this.isLoggedIn) {
      let sportsBookMarketIds = this.currentBets.filter(
        (bet: any) => bet.marketId
      );
      if (sportsBookMarketIds && sportsBookMarketIds.length > 0) {
        this.getSportsbookLiability(
          sportsBookMarketIds.map((item) => item.marketId).join(',')
        );
      }
    }
  }

  toggleLiveShow: any = false;

  toggleLiveTV() {
    this.toggleLiveShow = false;
  }

  calculateWhatIf($event: any) {
    this.utillsService.calWhatIf(this.data.runners, $event);
  }

  getSportsBook(id: any) {
    if (id > 0) {
      this.sportService
        .sportsBookCall(id, 'CricketComponent')
        .subscribe((data: SportsBookMarkets[]) => {
          if (data && data.length > 0) {
            // this.sportsBooks = data;
            data.forEach((market: SportsBookMarkets) => {
              if (market.marketId) {
                this.sportsBookMarketsMap.set(market.marketId, market);
                this.sportsBooks.push(market);
              }
            });
            let sportsBookMarketIds = this.currentBets.filter(
              (bet: any) => bet.marketId.length > 12
            );
            if (this.isLoggedIn && sportsBookMarketIds.length > 0) {
              this.GetSportbookPosition(
                sportsBookMarketIds.map((item) => item.marketId).join(',')
              );
              this.getSportsbookLiability(
                sportsBookMarketIds.map((item) => item.marketId).join(',')
              );
            }
            this.sportsBookInterval = setInterval(() => {
              this.updateSportsBook(id);
            }, this.sportsBookIntervalTime);
          }
        });
    }
  }

  updateSportsBook(id: any) {
    if (
      this.sportsBooks.length > 0 &&
      navigator.onLine == true &&
      document.hidden == false &&
      this.sportsBookVisible
    ) {
      this.sportService
        .sportsBookCall(id, 'Cricket Component')
        .subscribe((data: SportsBookMarkets[]) => {
          if (data && data.length > 0) {
            data.forEach((market: SportsBookMarkets) => {
              if (market.marketId) {
                const previousMarket = this.sportsBookMarketsMap.get(
                  market.marketId
                );
                if (previousMarket) {
                  previousMarket.update(market);
                } else {
                  this.sportsBookMarketsMap.set(market.marketId, market);
                  this.sportsBooks.push(market);
                }
              }
            });
            // marking those markets as inactive which do not appear in new data
            this.sportsBooks.forEach((market: SportsBookMarkets) => {
              data.filter((_market: any) => _market.marketId == market.marketId)
                .length == 0
                ? (market.status = 'INACTIVE')
                : {};
            });
          }
        });
    }
  }

  onVisibilityChange(visible: any) {
    this.sportsBookVisible = visible;
  }

  closeBetslip(r: any) {
    r.runners.forEach((l: any) => (l.betslip = null));
  }

  placeBetSportsBook(
    index: any,
    r: any,
    sportsMarket: any,
    type: string,
    odds: any,
    runs: any
  ) {
    this.sportsBookIndex = index;
    if (!this.checkauthservice.IsLogin()) {
    }
    this.sportsBooks.forEach((sportsBook: any) => {
      sportsBook.runners.forEach((l: any) => (l.betslip = null));
    });
    this.sportsBooks.forEach((l: any) => (l.betslip = null));
    let btn = this.checkauthservice.getstaks();
    r.betslip = {
      marketId: JSON.stringify(sportsMarket.marketId),
      selectionid: runs,
      handicap: 0,
      price: odds,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'sb',
      bettingType: null,
      marketType: null,
      linerange: null,
      eventId: this.eventId,
      isSingle: 'single',
      isSportsBook: true,
      name: r.runnerName,
    };
  }

  SportsBookBetStatus(status: any) {
    if (status.success) {
      setTimeout(() => {
        this.LoadCurrentBets();
        this.GetSportbookPosition(status.marketId);
        this.getSportsbookLiability(status.marketId);
        this.GetWalllet();
      }, 1000);
    }
  }

  getSportsbookLiability(marketid: string) {
    if (this.checkauthservice.IsLogin()) {
      if (marketid !== '') {
        this.sportService
          .SportsMarketliability(marketid)
          .subscribe(
            {
              next: (resp: any) => {
                if (resp && resp.length > 0) {
                  resp.forEach((x: any) => {
                    // for sports books
                    let market = this.sportsBookMarketsMap.get(x.marketId);
                    market ? (market.liability = x.libility) : {};

                    // for line markets
                    if (this.lineData && this.lineData.length > 0) {
                      let l = this.lineData.filter(
                        (lm: any) => lm.marketId == x.marketId
                      );
                      if (l && l.length > 0) {
                        l[0].marketLiability = x.libility;
                      }
                    }
                    if (this.data) {
                      if (this.data.marketId === x.marketId) {
                        this.data.marketLiability = x.libility;
                      }
                    }
                  });
                }
              },
              error: (err) => {
                this.catchError(err);
              }
            }

          )

      }
    }
  }

  GetSportbookPosition(marketID: string) {
    if (this.checkauthservice.IsLogin()) {
      if (marketID !== '') {
        this.sportService
          .clientpositionsports(marketID)
          .subscribe({
            next: (resp: ClientPosition[]) => this.HandleSportsBookPosition(resp),
            error: (err) => {
              this.catchError(err);
            }
          }
          )

      }
    }
  }

  HandleSportsBookPosition(resp: ClientPosition[]): any {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {
        let market = this.sportsBookMarketsMap.get(x.marketId);
        market
          ? market.updateRunnerPosition({
            runnerId: x.runnerId,
            position: x.position,
            position2: x.position2,
          })
          : {};
      });
    }
  }

  GetLMT(id: any) {
    if (id && id > 0) {
      let themeMode = _window().themeMode ? _window().themeMode : 'dark';
      this.lmtUrl =
        _window().lmtscorecard +
        `Id=${id}&t=${themeMode == 'dark' ? 'd' : 'l'}`;
    }

    iFrameResizer('stats');
  }


}
