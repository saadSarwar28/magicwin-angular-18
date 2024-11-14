import {
  BackendService,
} from '../../services/backend.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  SetAmount,
  shortenLargeNumber,
} from '../../services/shortenLargeNumber';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import {
  CurrentBets,
  MatchedUnmatched,
  ClientPosition,
  MarketDetail,
  MarketBook,
  LineLiablityMulti,
  MarketCatalogueSS,
  MarketRunners,
} from '../../models/models';
import { TimerService } from '../../services/timer.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { RecentMarketsService } from '../../services/recent-markets.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetStatusService } from '../../services/get-status.service';
import { HttpClient } from "@angular/common/http";
import { GenericService } from '../../services/generic.service';
import { WalletService } from '../../services/wallet.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { SkeltonLoaderComponent } from '../../shared/skelton-loader/skelton-loader.component';
import { StreamComponent } from '../../shared/stream.component';
import { TimeremainingComponent } from '../../shared/reuse/time-remaining.component';
import { OddsbuttonComponent } from '../../shared/reuse/oddsbutton.component';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { RoundoffPipe } from '../../pipes/roundoff.pipe';
import { MybetsComponent } from '../my-bets/my-bets.component';
import { ExtractNumberPipe } from '../../pipes/safe.pipe';
import { OrderbyrunnerPipe } from '../../pipes/orderbyrunner.pipe';
@Component({
  selector: 'app-racemarket',
  templateUrl: './racemarket.component.html',
  styles: [
    `
.image-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100px;
    border-radius:5px;
    background-repeat: no-repeat;
  background-position: center;
  background-size: cover;ius: 2px;

    .inner-image-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
}
.horseBg{
  background-image: url('https://iriscdn.b-cdn.net/magicwin.games/raceBgNew.png') ;

}
.grayhoundBg{
  background-image: url('https://iriscdn.b-cdn.net/magicwin.games/greyhound-bg-new.png') ;
}

`
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    MomentModule,
    PartialBetslipComponent,
    SkeltonLoaderComponent,
    StreamComponent,
    TimeremainingComponent,
    OddsbuttonComponent,
    MybetsComponent,
    ShortennumPipe,
    RoundoffPipe,
    ExtractNumberPipe,
    OrderbyrunnerPipe
  ]
})
export class RacemarketComponent implements OnInit, OnDestroy {
  cdnSilkSrc: any;
  silkUrl: any;
  sportsId: string = '';
  marketId: string = '';
  data: any;
  isLoggedIn: any = false;
  source: any;
  interval: any;
  byPassStreamScript: boolean = false;
  currentBets: CurrentBets[] = [];
  matchedUnmatched: MatchedUnmatched | undefined;
  clientMatchSize: any;
  clientUnmatchSize: any;
  clientPosition: ClientPosition | undefined;
  currencyCode = '';
  cBuyRate = 1;
  cTotalShare = 0;
  eventId: any;
  rateSetting: any = 1;
  localMarketRate: number = 1;
  clientParams: any;
  isShowBalanceStream: boolean = false;
  minBalance: any = 0;
  showStreamOnBalance: any = true;
  srcData: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  isOneClickBetGlobal: boolean = false;
  isOneClickBetClient: boolean = false;
  siteLoader: any;
  showStreamAgent: boolean = false;
  isShowStreamMobile: boolean = false;
  deviceInfo: any;
  uniformUrl: any = 'https://score.ssfun.in/SilkColours/';
  constructor(
    private checkauthservice: CheckAuthService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private router: Router,
    private sportsService: BackendService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private timerService: TimerService,
    private utillsService: UtillsService, private getStatusService: GetStatusService,
    private recentMarketsService: RecentMarketsService,
    private deviceService: DeviceDetectorService, private http: HttpClient,
    private genericService: GenericService,
    private walletService: WalletService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();

    this.isOneClickBetClient = this.storageService.getItem('OCB');
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (_window().minBalance) {
      this.minBalance = _window().minBalance;
    }
    if (_window().isShowStreamMobile) {
      this.isShowStreamMobile = _window().isShowStreamMobile;
    }

    if (_window().byPassStreamScript) {
      this.byPassStreamScript = _window().byPassStreamScript;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().uniformUrl) {
      this.uniformUrl = _window().uniformUrl;
    }
    this.route.params.subscribe((p: any) => {
      this.data = null;
      this.currentBets = [];
      this.sportsId = this.marketId = p.id.split('-')[p.id.split('-').length - 1];
      this.clientMatchSize = null;
      this.clientUnmatchSize = null;
      this.checkPathandLoaddata();
    });

    if (_window().racemarkettimer) {
      this.interval = _window().racemarkettimer;
    }

    if (this.checkauthservice.HaveStakes()) {
      this.cBuyRate = this.checkauthservice.cBuyRate;
      this.cTotalShare = this.checkauthservice.cTotalShare;
      this.currencyCode = this.checkauthservice.currencyCode;
      this.localMarketRate = this.checkauthservice.cLocalMarketRate;
    }
  }
  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      this.showStreamAgent = true;
    }
  }


  calculateWhatIf($event: any) {
    this.utillsService.calWhatIf(this.data.runners, $event)
  }

  getNumberStyles(number: any): { backgroundColor: any, color: any } {
    const styles: any = {
      1: { backgroundColor: '#ff0000', color: '#ffffff' },
      2: { backgroundColor: '#ffffff', color: '#000000' },
      3: { backgroundColor: '#0000ff', color: '#ffffff' },
      4: { backgroundColor: '#ffd700', color: '#000000' },
      5: { backgroundColor: '#006400', color: '#ffffff' },
      6: { backgroundColor: '#000000', color: '#ffffff' },
      7: { backgroundColor: '#d2691e', color: '#ffffff' },
      8: { backgroundColor: '#d87093', color: '#ffffff' },
    };

    return styles[number] || { backgroundColor: '#ffffff', color: '#000000' };
  }

  checkPathandLoaddata() {
    if (this.marketId?.length > 7) {
      this.LoadData();
    } else {
      this.router.navigate(['/sports/notfound']);
    }
    this.cdnSilkSrc = _window().stagecdnsilk;
  }

  toggleLiveShow: any = false;
  toggleLiveShow2: any = false;
  toggleLiveTV() {
    this.toggleLiveShow = false;
  }
  toggleLiveTV2() {
    this.toggleLiveShow2 = false;
  }

  apiUrl: any = '';
  channelNew: any = '';
  src: any = '';
  getChannelData(eventId: any, ip: any): void {
    this.http.get<any>(`${this.apiUrl}/${eventId}`).subscribe(
      data => {
        if (data.channelId > 0) {
          this.channelNew = data.channelId
          this.getStream(this.channelNew, ip);
        }
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getStream(id: string, ip: string) {
    this.src = _window().streamurl + `chid=${id}&ip=${ip}`;
  }

  GetTV() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.srcData == undefined) {
        if (this.eventId != '') {
          this.sportsService.TvOnBookmaker(parseInt(this.eventId)).subscribe((resp) => {
            this.srcData = resp;
            this.getChannelData(parseInt(this.eventId || 0), resp.ipAddress)
          })
        }
      }
    }
  }
  LoadData() {
    this.sportsService
      .racemarket(this.marketId, 'RacemarketComponent')
      .subscribe((resp: MarketDetail) => this.HandleMarketDetail(resp))

  }

  routeToRacingMarket() {
    if (this.data.eventType.name == 'Greyhound Racing') {
      this.router.navigate(['/sports/grey-hound-racing/all'])
    } else {
      this.router.navigate(['/sports/horse-racing/all'])
    }
  }


  getChannelId: any = '';
  eventType: any = '';
  HandleMarketDetail(resp: MarketDetail): any {
    if (resp) {
      this.recentMarketsService.pushRecentMarkets({
        route: this.router.url,
        name: resp.event?.name,
      });

      this.data = resp;
      this.getChannelId = this.data?.channelId;
      this.eventId = this.data.event.id;
      this.eventType = resp?.eventType?.id;
      this.GetTV()
      this.route.queryParams.subscribe((x: any) => {
        if (x.bf) {
          this.data.isLocalMarket = 0;
        }
      });
      this.LoadCurrentBets();
      this.MarketBookData();
      this.GetMatchedUnmatched();
      this.GetClientParameters();
      this.LocalMarketUpdates();
      this.timerService.SetTimer(
        setInterval(() => {
          this.MarketBookData();
          this.GetMatchedUnmatched();
        }, this.interval)
      );
    }
  }

  getIPAddress: any = '';
  ngOnInit(): void {
    if (_window().apiUrl) {
      this.apiUrl = _window().apiUrl;
    }
    if (this.byPassStreamScript) {
      this.showStreamAgent = true;
    }
    else {
      this.checkUserAgent();
    }
    this.utillsService.ipaddress.subscribe((data: any) => {
      if (data) {
        this.getIPAddress = data;
      }
    });
    sessionStorage.clear();
    if (this.checkauthservice.IsLogin()) {
      if (_window().isShowBalanceStream) {
        this.isShowBalanceStream = _window().isShowBalanceStream;
      }
      this.isLoggedIn = true;
      if (this.isShowBalanceStream) {
        this.getStatusService.balanceClient$.subscribe(balance => {
          this.showStreamOnBalance = balance.balance < this.minBalance ? false : true;
        });
      }
    }
    this.silkUrl = _window().racemarketsrc;
  }

  ngAfterViewInit() { }



  LoadCurrentBets() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.sportsService
          .localmarketcurrentbets(
            this.sportsId.replace('1.', '10.'),
            'RacemarketComponent'
          )
          .subscribe((resp: CurrentBets[]) => {
            this.HandleCurrentBets(resp);
          })

      }
    }
  }

  HandleCurrentBets(resp: CurrentBets[]) {
    if (resp) {
      this.currentBets = resp;
      this.utillsService.currentBets.next({
        bets: resp,
        eventId: this.eventId,
      });
    } else {
      this.currentBets = [];
    }
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.elementRef.nativeElement.remove();
    this.utillsService.currentBets.next([]);
  }

  MarketBookData() {
    if (this.marketId == undefined || this.marketId.length <= 0) return;
    this.sportsService
      .directSinglemarketbook(this.marketId, 'RacemarketComponent')
      .subscribe((resp: MarketBook) => this.HandleMarketBook(resp))

  }

  HandleMarketBook(resp: MarketBook): any {
    if (this.data) {
      if (resp && resp.marketId == this.marketId) {
        this.data.inplay = resp.inplay;
        this.data.status = resp.status;
        this.data.numberOfWinners = resp.numberOfWinners;
        resp.runners?.forEach((runner: any) => {
          let r = this.data.runners.filter(
            (run: any) => run.selectionId == runner.selectionId
          );
          if (r && r.length > 0) {
            r[0].status = runner.status;
            r[0].totalMatched = shortenLargeNumber(
              SetAmount(runner.totalMatched, this.cTotalShare, this.cBuyRate)
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
  }

  GetMarketPosition() {
    if (this.checkauthservice.IsLogin()) {
      this.sportsService
        .clientpositionsports(
          this.sportsId.replace('1.', '10.'),
          'RacemarketComponent'
        )
        .subscribe(
          {
            next: (resp: ClientPosition[]) => this.HandleRunnerPosition(resp),
            error: (error) => this.catchError(error),
          }
        )


    }
  }

  GetWalllet() {
    this.walletService.loadBalance()

  }



  cancelBets(marketIds: any) {
    this.GetSportMarketLiability();
  }



  GetClientParameters() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.checkauthservice.clientParameters.subscribe((clientParams: any) => {
          if (clientParams) {
            this.cBuyRate = this.clientParams?.cBuyRate;
            this.cTotalShare =
              this.clientParams.pShare + this.clientParams.cShare;
            this.localMarketRate = this.clientParams.localMarketRate;
          }
        })

      }
    }
  }



  LocalMarketUpdates() {
    if (this.data.isLocalMarket) {
      if (!this.checkauthservice.IsLogin()) {
        let raceRate = _window()?.raceMarketRate;
        this.localMarketRate = raceRate;
      }
    }
  }

  GetSportMarketLiability() {
    if (this.checkauthservice.IsLogin()) {
      this.sportsService
        .SportsMarketliability(
          this.sportsId.replace('1.', '10.'),
          'RacemarketComponent'
        )
        .subscribe(
          {
            next: (resp: LineLiablityMulti[]) => this.HandleMarketLiability(resp),
            error: (error) => this.catchError(error),
          }
        )
    }
  }

  HandleMarketLiability(resp: LineLiablityMulti[]): any {
    if (resp && resp.length > 0) {
      if (resp.length == 1) {
        if (this.data) {
          this.data.marketLiability = resp[0].libility;
        }
      }
    } else {
      if (this.data) {
        this.data.marketLiability = 0;
      }
    }
  }

  HandleRunnerPosition(resp: ClientPosition[]): any {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {
        if (this.data) {
          let runer = this.data.runners.filter(
            (a: any) => a.selectionId == x.runnerId
          );
          if (runer && runer.length > 0) {
            runer[0].position = x.position;
            runer[0].rPosition = x.rPosition;
          }
        }
      });
    }
  }

  GetMatchedUnmatched() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin() && this.currentBets && this.currentBets.length > 0) {
        this.sportsService
          .MatchunmatchLocalMarket(
            this.sportsId.replace('1.', '10.'),
            'RacemarketComponent'
          )
          .subscribe(
            {
              next: (resp) => {
                this.matchedUnmatched = resp;
                if (
                  this.clientMatchSize !== this.matchedUnmatched.matchedSize ||
                  this.clientUnmatchSize !== this.matchedUnmatched.unMatchedSize
                ) {
                  this.LoadCurrentBets()
                  this.GetMarketPosition();
                  this.GetSportMarketLiability();
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

  // response from partial bet
  BetPlacedStatus(status: any) {
    if (status.success) {
      this.data.runners.forEach((x: any) => (x.betslip = null));
      this.LoadCurrentBets();
      this.GetWalllet();
      this.GetMarketPosition();
      this.GetSportMarketLiability();
    }

  }

  get isOneClickOn() {
    return this.storageService.getItem('OCB') && this.isOneClickBetGlobal
  }

  placingBet = false;

  placebet(m: MarketCatalogueSS, r: MarketRunners, type: string, price: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (price == '' ||
      price == '0'
      || price == undefined || price == null) {
      return
    }
    this.data.runners.forEach((x: any) => (x.betslip = null));

    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      eventId: m?.event?.id ? m?.event?.id : '',
      marketId: m.marketId,
      selectionid: r.selectionId,
      name: r.runnerName,
      handicap: r.handicap ? r.handicap : 0,
      price: price,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'local',
      bettingType: m.description?.bettingType,
      marketType: m.description?.marketType,
      linerange: m.description?.lineRangeInfo,
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
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.placingBet = true
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response, betslip.marketId)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.placingBet = false

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



}
