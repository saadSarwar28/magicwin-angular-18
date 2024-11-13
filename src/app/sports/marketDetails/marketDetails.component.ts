import {
  MatchUnModel,
} from '../../models/models';
import { BackendService } from '../../services/backend.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iFrameResizer } from '../../../assets/lmtScore/sports-radar';
import { StorageService } from '../../services/storage.service';
import {
  ClientParameters,
  ClientPosition,
  ClientWallet,
  CurrentBets,
  CurrentBetsInput,
  MarketCatalogueSS,
  MarketRunners,
  MatchedUnmatched,
} from '../../models/models';
import { FancytimerService, TimerService } from '../../services/timer.service';
import { ToastService } from '../../services/toast.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import {
  SetAmount,
  shortenLargeNumber,
} from '../../services/shortenLargeNumber';
import { UtillsService } from '../../services/utills.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetStatusService } from '../../services/get-status.service';
import { GenericService } from '../../services/generic.service';
import { WalletService } from '../../services/wallet.service';
declare function iFrameResize(): any;
@Component({
  selector: 'app-marketDetails',
  templateUrl: './marketDetails.component.html',
  styleUrls: ['./marketDetails.component.css'],
})
export class MarketDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  deviceInfo: any;
  ngAfterViewInit(): void {
    setTimeout(() => {
      iFrameResize();
    }, 5000);
  }
  siteLoader: any;
  marketId: string = '';
  matchedUnmatched: MatchedUnmatched | undefined;
  clientMatchSize: any;
  clientUnmatchSize: any;
  sportsId: string = '';
  data: any = {};
  interval: any;
  bookData: any[] = [];
  currentBets: CurrentBets[] = [];
  byPassStreamScript: boolean = false;
  clientPosition: ClientPosition | undefined;
  marketIds = Array<string>();
  cBuyRate = 1;
  localMarketRate = 1;
  cTotalShare = 0;
  matchId: any = 0;
  lmtUrl: any = '';
  eventId: any;
  otherMarkets: any;
  srcData: any;
  src: any;
  displayLMT: boolean = false;
  isShowStreamMobile: boolean = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  hideOCBonComp: boolean = false;
  showCashout: boolean = false;
  isOneClickBetGlobal: boolean = false;
  winnerFancyMarketDetails: boolean = false;
  showStreamAgent: boolean = false;
  isLoggedIn: boolean = false;
  isShowBalanceStream: boolean = false;
  minBalance: any = 0;
  showStreamOnBalance: any = true;
  isLoading: any = true;
  fancyVersion: string = 'v4';
  fInterval: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportService: BackendService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private checkauthservice: CheckAuthService,
    private timerService: TimerService,
    private utillsService: UtillsService,
    private getStatusService: GetStatusService,
    private deviceService: DeviceDetectorService,
    private genericService: GenericService,
    private fancyTimerService: FancytimerService,
    private walletService: WalletService



  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();

    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    // this.getStreamData();
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().isShowStreamMobile) {
      this.isShowStreamMobile = _window().isShowStreamMobile;
    }
    if (_window().byPassStreamScript) {
      this.byPassStreamScript = _window().byPassStreamScript;
    }
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (_window().minBalance) {
      this.minBalance = _window().minBalance;
    }

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }

    if (_window().showCashout) {
      this.showCashout = _window().showCashout;
    }
    if (_window().winnerFancyMarketDetails) {
      this.winnerFancyMarketDetails = _window().winnerFancyMarketDetails;
    }
    if (_window().fancyVersion) {
      this.fancyVersion = _window().fancyVersion;
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

    if (_window().hideOCBonComp) {
      if (!this.storageService.secureStorage.getItem('OCB')) {
        this.hideOCBonComp = false;
      } else {
        this.hideOCBonComp = _window().hideOCBonComp;
      }
    }

    this.route.params.subscribe((p: any) => {
      this.marketId = p.name;
      this.marketId =
        this.marketId.split('-')[this.marketId.split('-').length - 1];
      this.sportsId = this.marketId;
      this.clientMatchSize = null;
      this.clientUnmatchSize = null;
      this.isLoading = true
      this.data = null;
      this.checkPathandLoaddata();

    });
    if (_window().marketdetailtimer) {
      this.interval = _window().marketdetailtimer;
    }
    if (_window().displaylmt) {
      this.displayLMT = _window().displaylmt;
    }

  }
  BetPlaceCashout(status: any) {
    if (status.success) {
      this.data.betslip = null;
      this.data.cashout = false;
      this.LoadCurrentBets();
      this.GetWalllet();
      this.GetMarketPosition(status.marketId);
      this.GetSportMarketLiability(status.marketId);
    }
  }

  openCashout(m: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (this.data.liability == null || this.data.liability == 0) {
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
        bettingOn: m.description?.bettingType === "LINE" ? m.description?.bettingType : 'ODDS',
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
  placingBet = false;

  getStream() {
    if (this.getChannelId && this.getIPAddress) {
      this.src =
        _window().streamurl +
        `chid=${this.getChannelId}&ip=${this.getIPAddress}`;
    }
  }
  toggleLiveShow: any = false;
  toggleLiveTV() {
    this.toggleLiveShow = false;
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.fancyTimerService.clearTimer()
    this.utillsService.currentBets.next([]);
  }

  getIPAddress: any = '';
  ngOnInit(): void {
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
    if (!this.checkauthservice.IsLogin()) {
      this.localMarketRate = _window().locMarketRates;
    }
    sessionStorage.clear();
  }

  checkPathandLoaddata() {
    if (this.marketId && this.marketId.length > 0) {
      this.bookData = [];
      this.LoadData();
    } else {
      this.router.navigate(['/sports/notfound']);
    }
  }

  fancyResponse: any;
  loadFancyData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportService
        .FancyMarketsAny(
          this.fancyVersion,
          this.eventId
        )
        .subscribe((resp) => {
          if (resp) {
            this.fancyResponse = resp
          }
        })

    }
    this.fancyTimerService.SetTimer(
      setInterval(() => {
        this.loadFancyData();
      }, this.fInterval)
    );
  }

  getChannelId: any = '';
  LoadData() {
    // ;
    this.sportService
      .marketdetail(this.marketId, 'MarketDetailsComponent')
      .subscribe((resp) => {
        if (resp) {
          this.isLoading = false
          this.data = resp;
          this.getChannelId = this.data?.channelId;
          this.getStream();
          this.eventId = this.data.event.id;
          this.matchId = this.data.event.matchId;
          if (
            this.data.eventType.id === '4' &&
            this.data.description.marketType === 'MATCH_ODDS'
          ) {
            let marketName = this.data.event.name
              .toLowerCase()
              .trim()
              .split(' ')
              .join('-')
              .replace(/[^a-z0-9-]/g, '')
              .replace('-v-', '-vs-')
            this.router.navigate(['/sports/cricket/' + marketName + '-' + this.data.event.id]);
          } else if (
            this.data.eventType.id === '7' ||
            this.data.eventType.id === '4339'
          ) {
            this.router.navigate(['/sports/racemarket/' + this.data.marketId]);
          } else {
            this.GetClientParameters();
            this.GetMarketRates();
            if (this.winnerFancyMarketDetails) {
              this.loadFancyData()
            }
            this.timerService.SetTimer(
              setInterval(() => {
                this.GetMarketRates();
                this.GetMatchedUnmatched();
              }, this.interval)
            );
          }
          let otherMarkets = ['TIED_MATCH', 'COMPLETED_MATCH', 'TO_WIN_THE_TOSS']
          if (otherMarkets.includes(this.data.description.marketType)) {
            this.showCashout = false
          }
          this.GetSportMarketLiability(this.marketId);
          this.GetMarketPosition(this.marketId);
          this.LoadCurrentBets();
          setTimeout(() => {
            if (this.matchId > 0) {
              this.GetLMT(this.matchId);
            }
          }, 2500);
        }

      })

  }

  routeToSports(data: any) {
    if (data.eventType.name == 'Politics') {
      return
    }
    this.router.navigate(
      ['/sports/' + data.eventType.name.toLowerCase()]
    )
  }

  routeToTournament(data: any) {
    // console.log(data)
    if (data.eventType.name == 'Politics') {
      return
    }
    this.router.navigate(
      ['/sports/tournament/' + this.sportService.slugifyName(data.competition.name) + '-' + data.competition.id]
    )
  }

  routeToEvent(data: any) {
    // console.log(data)
    if (data.eventType.name == 'Politics') {
      return
    }
    this.router.navigate(
      ['/sports/' + data.eventType.name.toLowerCase() + '/' + this.sportService.slugifyName(data.event.name) + '-' + data.event.id]
    )
  }

  GetClientParameters() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.checkauthservice.clientParameters.subscribe((clientParams: any) => {
          if (clientParams) {
            this.cBuyRate = clientParams?.cBuyRate;
            this.cTotalShare = clientParams.pShare + clientParams.cShare;
            this.localMarketRate = clientParams.localMarketRate;
            this.bookMakerRate = clientParams.bookMakerRate;
            this.fancyRate = clientParams.fancyRate;
          }
        })
      }
    }
  }

  bookMakerRate: number = 1;
  fancyRate: number = 1;

  LoadCurrentBets() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        let body = new CurrentBetsInput(
          this.data.isLocalMarket
            ? this.marketId.replace('1.', '10.')
            : this.marketId,
          '0',
          false
        );
        if (this.data && this.data.event && this.data.event.id) {
          body.eventId = this.eventId;
        }
        this.sportService
          .SportsCurrentbets(body, 'MarketDetailsComponent')
          .subscribe(
            {
              next: (value) => (resp) => {
                this.utillsService.currentBets.next({
                  bets: resp,
                  eventId: this.eventId,
                });
                if (resp && resp.length > 0) {
                  this.currentBets = resp;
                } else {
                  this.currentBets = resp;
                }
              },
              error: (error) => this.catchError(error),
            }
          )

      }
    }
  }



  GetMarketRates() {
    if (this.marketId == undefined || this.marketId.length <= 0) return;
    this.sportService
      .directSinglemarketbook(this.marketId, 'MarketDetailsComponent')
      .subscribe((resp) => {
        if (resp) {
          if (this.data?.description?.bettingType === 'LINE') {
            let m = this.data.runners;
            if (m && m.length > 0) {
              m[0].inplay = resp.inplay;
              m[0].status = resp.status;
              let runer = resp.runners?.filter(
                (x: any) => x.selectionId == m[0].selectionId
              );
              if (runer && runer.length > 0) {
                let bfrun = runer[0];
                m[0].totalMatched = shortenLargeNumber(
                  SetAmount(
                    bfrun.totalMatched || 0,
                    this.cTotalShare,
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
                      this.cTotalShare,
                      this.cBuyRate
                    )
                  );
                  m[0].lay[1].price = bfrun.ex.availableToBack[1].price
                    ? bfrun.ex.availableToBack[1].price + 0.5
                    : '';
                  m[0].lay[1].size = shortenLargeNumber(
                    SetAmount(
                      bfrun?.ex?.availableToBack[1].size || 0,
                      this.cTotalShare,
                      this.cBuyRate
                    )
                  );
                  m[0].lay[2].price = bfrun.ex.availableToBack[2].price
                    ? bfrun.ex.availableToBack[2].price + 0.5
                    : '';
                  m[0].lay[2].size = shortenLargeNumber(
                    SetAmount(
                      bfrun?.ex?.availableToBack[2].size || 0,
                      this.cTotalShare,
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
                      this.cTotalShare,
                      this.cBuyRate
                    )
                  );
                  m[0].lay[1].price = bfrun.ex.availableToBack[1].price
                    ? bfrun.ex.availableToBack[1].price + 0.5
                    : '';
                  m[0].lay[1].size = shortenLargeNumber(
                    SetAmount(
                      bfrun?.ex?.availableToBack[1].size || 0,
                      this.cTotalShare,
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
                      this.cTotalShare,
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
                      this.cTotalShare,
                      this.cBuyRate
                    )
                  );
                  m[0].back[1].price = bfrun.ex.availableToLay[1].price
                    ? bfrun.ex.availableToLay[1].price + 0.5
                    : '';
                  m[0].back[1].size = shortenLargeNumber(
                    SetAmount(
                      bfrun?.ex?.availableToLay[1].size || 0,
                      this.cTotalShare,
                      this.cBuyRate
                    )
                  );
                  m[0].back[2].price = bfrun.ex.availableToLay[2].price
                    ? bfrun.ex.availableToLay[2].price + 0.5
                    : '';
                  m[0].back[2].size = shortenLargeNumber(
                    SetAmount(
                      bfrun?.ex?.availableToLay[2].size || 0,
                      this.cTotalShare,
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
                      this.cTotalShare,
                      this.cBuyRate
                    )
                  );
                  m[0].back[1].price = bfrun.ex.availableToLay[1].price
                    ? bfrun.ex.availableToLay[1].price + 0.5
                    : '';
                  m[0].back[1].size = shortenLargeNumber(
                    SetAmount(
                      bfrun?.ex?.availableToLay[1].size || 0,
                      this.cTotalShare,
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
                      this.cTotalShare,
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
          } else {
            if (resp.marketId == this.marketId) {
              this.data.inplay = resp.inplay;
              this.data.status = resp.status;
              this.data.totalMatched = resp.totalMatched;
              if (resp.status == 'CLOSED') {
                this.timerService.clearTimer();
              }
              if (
                this.data.description.marketType == 'ASIAN_HANDICAP' ||
                this.data.description.marketType == 'ALT_TOTAL_GOALS'
              ) {
                resp.runners?.forEach((runner: any) => {
                  let r = this.data.runners.filter(
                    (run: any) =>
                      run.selectionId == runner.selectionId &&
                      run.handicap == runner.handicap
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
                        this.cTotalShare,
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
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[1].price = runner.ex.availableToBack[1].price;
                      r.back[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[1].size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[2].price = runner.ex.availableToBack[2].price;
                      r.back[2].size = shortenLargeNumber(
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
                      r.back[0].price = runner.ex.availableToBack[0].price;
                      r.back[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[0].size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[1].price = runner.ex.availableToBack[1].price;
                      r.back[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[1].size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[2].price = '';
                      r.back[2].size = '';
                    } else if (
                      runner.ex.availableToBack &&
                      runner.ex.availableToBack.length > 0
                    ) {
                      r.back[0].price = runner.ex.availableToBack[0].price;
                      r.back[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[0].size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[1].price = '';
                      r.back[1].size = '';
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
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[1].price = runner.ex.availableToLay[1].price;
                      r.lay[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[1].size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[2].price = runner.ex.availableToLay[2].price;
                      r.lay[2].size = shortenLargeNumber(
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
                      r.lay[0].price = runner.ex.availableToLay[0].price;
                      r.lay[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[0].size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[1].price = runner.ex.availableToLay[1].price;
                      r.lay[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[1].size,
                          this.cTotalShare,
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
                          this.cTotalShare,
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
              } else {
                resp.runners?.forEach((runner: any) => {
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
                    // r.totalMatched = shortenLargeNumber(SetAmount(runner.totalMatched, this.cTotalShare, this.cBuyRate));
                    if (
                      runner.ex.availableToBack &&
                      runner.ex.availableToBack.length > 2
                    ) {
                      r.back[0].price = runner.ex.availableToBack[0]?.price;
                      r.back[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[0]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[1].price = runner.ex.availableToBack[1]?.price;
                      r.back[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[1]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[2].price = runner.ex.availableToBack[2]?.price;
                      r.back[2].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[2]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                    } else if (
                      runner.ex.availableToBack &&
                      runner.ex.availableToBack.length > 1
                    ) {
                      r.back[0].price = runner.ex.availableToBack[0]?.price;
                      r.back[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[0]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[1].price = runner.ex.availableToBack[1]?.price;
                      r.back[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[1]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[2].price = '';
                      r.back[2].size = '';
                    } else if (
                      runner.ex.availableToBack &&
                      runner.ex.availableToBack.length > 0
                    ) {
                      r.back[0].price = runner.ex.availableToBack[0]?.price;
                      r.back[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[0]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.back[1].price = '';
                      r.back[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToBack[1]?.size,
                          this.cTotalShare,
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
                          runner.ex.availableToLay[0]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[1].price = runner.ex.availableToLay[1]?.price;
                      r.lay[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[1]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[2].price = runner.ex.availableToLay[2]?.price;
                      r.lay[2].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[2]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                    } else if (
                      runner.ex.availableToLay &&
                      runner.ex.availableToLay.length > 1
                    ) {
                      r.lay[0].price = runner.ex.availableToLay[0]?.price;
                      r.lay[0].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[0]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[1].price = runner.ex.availableToLay[1]?.price;
                      r.lay[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[1]?.size,
                          this.cTotalShare,
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
                          runner.ex.availableToLay[0]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
                      r.lay[1].price = '';
                      r.lay[1].size = shortenLargeNumber(
                        SetAmount(
                          runner.ex.availableToLay[1]?.size,
                          this.cTotalShare,
                          this.cBuyRate
                        )
                      );
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
            }
          }
        }
      })

  }



  GetMatchedUnmatched() {
    let marketIdes = new MatchUnModel(this.marketId, this.eventId, 'sports');
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin() && this.currentBets && this.currentBets.length > 0) {
        let m = new MatchUnModel(this.marketId, '0', 'SPORTS');
        if (this.data.isLocalMarket) {
          marketIdes.type = 'All';
        }
        this.sportService
          .matchUnmatchAllSports(marketIdes, 'MarketDetailsComponent')
          .subscribe(
            {
              next: (resp) => {
                this.matchedUnmatched = resp;
                if (
                  this.clientMatchSize !== this.matchedUnmatched.matchedSize ||
                  this.clientUnmatchSize !== this.matchedUnmatched.unMatchedSize
                ) {
                  this.LoadCurrentBets();
                  this.GetMarketPosition(this.marketId);
                  this.GetSportMarketLiability(this.marketId);
                  this.GetWalllet();
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

  GetWalllet() {
    this.walletService.loadBalance()
  }


  cancelBets(event: any) {
    this.GetSportMarketLiability(event.marketId);
  }

  BetPlacedStatus(status: any) {
    if (status.success) {
      this.data.runners?.forEach((x: any) => (x.betslip = null));
      this.LoadCurrentBets();
      this.GetWalllet();
      this.GetMarketPosition(status.marketId);
      this.GetSportMarketLiability(status.marketId);
    }
  }

  get isOneClickOn() {
    return this.storageService.secureStorage.getItem('OCB') && this.isOneClickBetGlobal
  }
  placebet(
    m: MarketCatalogueSS,
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
    this.data.betslip = null;
    this.data.cashout = false;
    m.runners?.forEach((x) => (x.betslip = null));
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
      bettingOn: m.description?.bettingType === "LINE" ? m.description?.bettingType : 'ODDS',
      bettingType: m.description?.bettingType,
      marketType: m.description?.marketType,
      linerange: m.description?.lineRangeInfo,
      oneClickType: this.data.marketName,
      minBet: this.data?.minSettings,
      maxBet: this.data?.maxSettings * this.localMarketRate,
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
    let betSize = this.storageService.secureStorage.getItem('OCBSelectedVal');
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
    if (err && err.status && err.status == 401) {
      this.storageService.secureStorage.removeItem('token');
      this.timerService.clearTimer();
      this.genericService.openLoginModal()

    } else {
      console.log(err);
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


  calculateWhatIf($event: any) {
    this.utillsService.calWhatIf(this.data.runners, $event)
  }

  private GetMarketPosition(marketID: string) {
    if (this.checkauthservice.IsLogin()) {
      if (marketID !== '') {
        this.sportService
          .clientpositionsports(marketID.replace('1.', '10.'))
          .subscribe(
            {
              next: (resp: ClientPosition[]) => this.HandleRunnerPosition(resp),
              error: (error) => this.catchError(error),
            }
          )

      }
    }
  }

  HandleRunnerPosition(resp: ClientPosition[]): any {
    if (
      this.data.description.bettingType == 'LINE' || this.data.description.marketType == "INNINGS_RUNS"
    ) {
      if (resp && resp.length > 0) {
        this.bookData = [...resp];
      } else {
        this.bookData = [];
      }
    } else {
      resp.forEach((x: any) => {
        let runer = this.data.runners.filter(
          (a: any) =>
            a.selectionId === x.runnerId
        );
        if (runer && runer.length > 0) {
          runer[0].position = x.position;
          runer[0].RPosition = x.rPosition;
        }
      });
    }

  }
  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      this.showStreamAgent = true;
    }
  }
  private GetSportMarketLiability(mkts: any) {
    if (this.checkauthservice.IsLogin()) {
      this.sportService
        .SportsMarketliability(mkts)
        .subscribe(
          {
            next: (resp: any) => {
              if (resp && resp.length > 0) {
                resp.forEach((x: any) => {
                  if (x.marketId == this.data.marketId) {
                    this.data.liability = x.libility;
                  }
                });
              }
            },
            error: (error) => this.catchError(error),
          }
        )

    }

  }

  GetLMT(id: any) {
    if (id && id > 0) {
      let themeMode = _window().themeMode ? _window().themeMode : 'dark';
      this.lmtUrl = _window().lmtscorecard + `Id=${id}&t=${themeMode == 'dark' ? 'd' : 'l'}`;
    }

    iFrameResizer('stats');
  }


}

