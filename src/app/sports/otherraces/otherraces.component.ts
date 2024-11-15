
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BettingResponse, ClientParameters, ClientPosition, ClientWallet, CurrentBetsInput, LineLiablityMulti, MatchedUnmatched } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { TimerService } from '../../services/timer.service';
import { StorageService } from '../../services/storage.service';
import { SetAmount, shortenLargeNumber } from '../../services/shortenLargeNumber';
import { ToastService } from '../../services/toast.service';
import { UtillsService } from '../../services/utills.service';
import { WalletService } from '../../services/wallet.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PremiumRacePipe } from '../../pipes/premium-race.pipe';
import { SortByDatePipe } from '../../pipes/sortByDate.pipe';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { FilterBets } from '../../pipes/filterbets.pipe';
import { PlatformService } from '../../services/platform.service';


@Component({
  selector: 'app-otherraces',
  styleUrls: ['./otherraces.component.scss'],
  templateUrl: './otherraces.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    PremiumRacePipe,
    SortByDatePipe,
    FilterBets,
    PartialBetslipComponent,

  ]
})


export class OtherracesComponent implements OnInit, OnDestroy {

  private hubConnection: signalR.HubConnection;
  sendingrequest: any = false;
  readOnly: any;
  haveMatched = false;
  haveRejected = false;
  haveUnmatched = false;
  cancellingBet = false;
  noContentFound: any = false;
  markets: RaceMarket[] = [];
  currentBets: any;
  sportsId: string = '';
  marketId: string = "";
  bookData: any[] = [];
  data: any = {};
  eventId: any;
  src: any;
  cBuyRate = 1;
  cTotalShare = 0;
  clientParams: any;
  localMarketRate: number = 1;
  cdnSilkSrc: any;
  clientPosition: ClientPosition | undefined;
  sportsBooks: any = [];
  jBack: any;
  jLay: any;
  interval: any;

  matchedUnmatched!: MatchedUnmatched;
  clientMatchSize: any;
  clientUnmatchSize: any;
  isCollapsedStates: boolean[] = [];
  betslip: any;
  isDataLoad: boolean = false
  isLoadMarkets: boolean = false;
  isLogin: boolean = false;
  isLoading: boolean = true
  premiumRacesUrl: string = 'https://raceweb.urexch.net/races';
  siteLoader: string = '';
  isOneClickBetGlobal: boolean = false;
  isOneClickBetClient: boolean = false;
  minBKFncy: number = 50
  constructor(
    private checkauthservice: CheckAuthService,
    private timerService: TimerService,
    private sportsService: BackendService,
    private storageService: StorageService,
    private toasterService: ToastService,
    private utillsService: UtillsService,
    private walletService: WalletService,
    private platformService: PlatformService



  ) {
    if (this.platformService.isBrowser()) {

      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader;
      }
      this.isOneClickBetClient = this.storageService.getItem('OCB');
      if (_window().hideOCBonComp) {
        this.isOneClickBetGlobal = true;
      }
      sessionStorage.clear()
      console.clear();
      if (_window().premiumRacesUrl) {
        this.premiumRacesUrl = _window().premiumRacesUrl;
      }

      if (_window().minBKFncy) {
        this.minBKFncy = _window().minBKFncy;
      }
      this.markets = [];
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.premiumRacesUrl, { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();
      this.hubConnection
        .start().then(() => {
          this.isLoading = false
          this.LoadCurrentBets();
        })
        .catch((err: any) => console.error('Error while starting SignalR connection:', err));
      this.hubConnection.on("ReceiveData", (data: any) => {
        this.populateRates(JSON.parse(data));
        this.GetClientParameters();
        this.isLoading = false
        if (!this.isLoadMarkets) {
          this.GetMarketPosition();
          this.isLoadMarkets = true
        }


      });
      this.hubConnection.on("ChangeStatus", (data: any) => this.changeMarketStatus(JSON.parse(data)));
      this.hubConnection.on("ChangeData", (data: any) => this.UpdateSelectionRate(JSON.parse(data)));
    }
  }
  changeMarketStatus(d: any) {

    if (d) {
      let pos = this.markets.filter(xx => xx.marketId == d.marketId);
      if (pos && pos.length > 0) {
        pos[0].status = d.status;
        pos[0].inplay = d.inplay

      }
    }
  }
  UpdateSelectionRate(d: any) {
    if (this.isDataLoad == true) {
      if (this.markets && this.markets.length > 0) {
        if (d) {
          if (d.selectionId == "0" || d.selectionId == 0) {
            let pos = this.markets.filter((xx: RaceMarket) => xx.marketId == d.marketId);
            if (pos && pos.length > 0) {

              pos[0].runners.map((x: any) => {
                x.setRates({});
              });

            }
            return;

          }

          let pos = this.markets.filter((xx: RaceMarket) => xx.marketId == d.marketId);
          if (pos && pos.length > 0) {

            let r = pos[0].runners.filter((x: { selectionId: any; }) => x.selectionId == d.selectionId);

            if (r && r.length > 0) {
              r[0].setRates(JSON.parse(d.rate.replaceAll('\'', '\"')));

            }
          }
        }
      }
    }

  }

  marketNameF(d: any) {
    //debugger
    const marketName = d;

    const parts = marketName.split(" : ");
    if (parts.length === 2) {
      const [type, rest] = parts;
      const raceParts = rest.split(" \\ ");
      if (raceParts.length === 3) {
        const [country, trackName, raceInfo] = raceParts;
        //debugger
        const raceInfoParts = raceInfo.split(" ) ");
        if (raceInfoParts.length === 2) {
          const [distance, race] = raceInfoParts;
          const marketNameArray = {
            Type: type.trim(),
            Country: country.trim(),
            TrackName: trackName.trim(),
            Distance: distance.trim() + ' ) ',
            RaceNo: race.trim()
          }

          return marketNameArray
        } else {
          console.log("Unable to parse Race information.");
        }
      } else {
        console.log("Unable to parse Country and TrackName.");
      }
    } else {
      console.log("Market name format doesn't match the expected pattern.");
    }
    return "";
  }

  toggleCollapse(data: any) {
    data.tabOpen = !data.tabOpen
  }



  GetClientParameters() {
    if (this.checkauthservice.IsLogin()) {
      if (navigator.onLine == true && document.hidden == false) {
        this.checkauthservice.clientParameters.subscribe((clientParams: any) => {
          if (clientParams) {
            this.cBuyRate = clientParams?.cBuyRate;
            this.cTotalShare = clientParams.pShare + clientParams.cShare;
            this.localMarketRate = clientParams.localMarketRate;
          }
        }
        )
      }
    }
  }







  GetMatchedUnmatched() {

    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {

        if (this.data) {
          this.sportsService
            .MatchunmatchLocalMarket('10', 'otherracesComponent')
            .subscribe((resp: any) => {
              this.matchedUnmatched = resp;
              if (
                this.clientMatchSize !== this.matchedUnmatched.matchedSize ||
                this.clientUnmatchSize !== this.matchedUnmatched.unMatchedSize
              ) {
                this.LoadCurrentBets();
                this.GetMarketPosition();
                this.GetSportMarketLiability();
                // this.GetWalllet();
                this.clientMatchSize = this.matchedUnmatched.matchedSize;
                this.clientUnmatchSize = this.matchedUnmatched.unMatchedSize;
              }
            }, err => {
              if (err.status == 401) {
                this.storageService.removeItem('token');
                window.location.href = window.location.href;
                this.timerService.clearTimer();
              }
            })
        } else {
          this.sportsService
            .matchUnmatchAllSports(this.data.marketId, 'OtherracesComponent')
            .subscribe((resp) => {
              this.matchedUnmatched = resp;
              if (
                this.clientMatchSize !== this.matchedUnmatched.matchedSize ||
                this.clientUnmatchSize !== this.matchedUnmatched.unMatchedSize
              ) {
                this.LoadCurrentBets();
                this.clientMatchSize = this.matchedUnmatched.matchedSize;
                this.clientUnmatchSize = this.matchedUnmatched.unMatchedSize;
              }
            }, err => {
              if (err.status == 401) {
                this.storageService.removeItem('token');
                window.location.href = window.location.href;
                this.timerService.clearTimer();
              }
            }
            )

        }
      }
    }
  }

  racesCategory: any[] = []
  selectedCategory = 'all'

  populateRates(d: any) {

    try {

      if (this.markets.length > 0) {
        const dataMarketIds = new Set(d.map((e: any) => e.marketId));

        this.markets = this.markets.filter((market: any) => dataMarketIds.has(market.marketId));

        d.forEach((e: any) => {
          let f = this.markets.filter((x: any) => x.marketId == e.marketId);
          if (f && f.length > 0) {
            f[0].setRunners(e.runners);
            f[0].marketLiability = sessionStorage.getItem(e.marketId)
          } else {
            this.markets.push(new RaceMarket(e.inplay, e.betfairMarketId, e.startTime, this.marketNameF(e.marketName), e.marketId, e.runners));
          }
        });

      } else {

        d.forEach((e: any) => {

          this.markets.push(new RaceMarket(e.inplay, e.betfairMarketId, e.startTime, this.marketNameF(e.marketName), e.marketId, e.runners));
        });

      }
      this.racesCategory = [...new Set(this.markets.map(market => market.marketName.Type))].sort();

      this.markets.forEach((element: any) => {
        element.runners.forEach((run: any) => {
          let str1 = run.selectionName.split(" ")
          let str3 = "";
          str3 = str1.slice(1, str1.length).join(" ")
          run.selectionNameNew = str3;
          run.indexNo = str1[0];
        })
      });

    } catch (error) {
      console.error(error);
    }

    this.isDataLoad = true
  }

  placingBet = false;
  oneClickpb(
    mktId: any,
    selectionId: any,
    handicap: any,
    bType: string,
    price: any,
    size: any,


  ) {
    if (price == null || price == 0 || price == '') {
      this.toasterService.show('Please enter the odds value', {
        classname: 'red accent-3 text-light',
        delay: 3000,
        sound: true,
      });
      return;
    }
    this.placingBet = true;
    let betstatus = false;


    const requestData = {
      marketId: mktId,
      selectionId: selectionId,
      betType: bType,
      handicap: '0',
      price: price,
      size: size,
      keepAliveOn: false,
      version: 1,
    };

    this.sportsService
      .otherRacesPost(requestData)
      .subscribe((resp: BettingResponse) => {
        betstatus = resp.status;
        const translatedResponse = resp.message;

        if (betstatus) {
          this.toasterService.show(translatedResponse, {
            classname: 'bg-success text-light',
            delay: 4000,
            sound: true,
          });
        } else {
          this.toasterService.show(translatedResponse, {
            classname: 'red darken-1 text-light',
            delay: 4000,
            sound: true,
          });
        }
        this.placingBet = false
      })

  }

  BetPlacedStatus(status: any, r: any, data: any) {
    r.betslip = null
    if (status.d) {
      this.currentBets = status.d;
    }
    if (status == 'yes') {
      data.status = 'yes'
      data.status = 'OPEN'
      this.LoadCurrentBets();
      this.GetWalllet();
      this.GetMarketPosition();
      this.GetSportMarketLiability();
    }
  }

  selectedM: any;
  raceNo: any;
  placebet(m: RaceMarket, r: RaceRunner, type: string, price: any, raceNo: number) {
    if (!this.checkauthservice.IsLogin()) {
      return;
    }
    if (
      this.storageService.getItem('OCB') &&
      this.isOneClickBetGlobal
    ) {
      let betSize = this.storageService.getItem('OCBSelectedVal');
      this.raceNo = raceNo
      this.oneClickpb(
        m.marketId,
        r.selectionId,
        0,
        type,
        price,
        betSize,

      );

    } else {

      this.selectedM = m
      m.runners.forEach((x: any) => (x.betslip = null));
      let btn = this.checkauthservice.getstaks();
      r.betslip = {}
      r.betslip = {
        marketId: m.marketId,
        selectionid: r.selectionId,
        name: r.selectionName,
        handicap: 0,
        price: price,
        size: btn.stakeVal2,
        bType: type,
        stakeButtons: btn,
        bettingOn: 'Otherraces',
        bettingType: null,
        marketType: null,
        linerange: null,
        isSingle: 'single',
        betType: type,
        keepAliveOn: false,
        version: 1,
        minBet: this.minBKFncy,
        maxBet: 100,
      };

      this.betslip = r.betslip;
    }
  }

  ngOnDestroy(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
    this.timerService.clearTimer();
  }

  ngOnInit(): void {
    this.timerService.SetTimer(
      setInterval(() => {
        this.GetMatchedUnmatched();
      }, 1000)
    );
  }
  openMyBetsModal() {


  }


  GetWalllet() {
    this.walletService.loadBalance()
  }

  HandleRunnerPosition(resp: ClientPosition[]): any {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {

        var pos = this.markets.filter(xx => xx.marketId == x.marketId)

        if (pos && pos.length > 0) {
          pos[0].runners.forEach(item => {

            if (item.selectionId == x.runnerId) {
              item.position = x.position;
              item.RPosition = x.rPosition;
            }

          });
        }
      });
    }
    else {
      this.data.runners?.forEach((e: any) => {
        e.position = undefined;
        e.rPosition = undefined;
      });
    }
  }

  toggleLiveShow: any = false
  toggleLiveTV() {
    this.toggleLiveShow = false;
  }
  getStream() {
    this.src = _window().OwnStreamUrlRace;
    this.toggleLiveShow = true;
  }


  LoadCurrentBets() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        this.sendingrequest = true;

        let body = new CurrentBetsInput('10', '10', false);

        this.sportsService.localmarketcurrentbets("10", "otherracesComponent").subscribe((resp: any) => {
          if (resp && resp.length > 0) {
            this.currentBets = resp;

            if (resp.some(x => x.betStatus == "Matched Bets")) {
              this.haveMatched = true;
            }
            if (resp.some(x => x.betStatus == "Rejected Bets")) {
              this.haveRejected = true;
            }
          }
          else {
            this.currentBets = resp;
          }
        }, err => {
          if (err.status == 401) {
            this.storageService.removeItem('token');
            window.location.href = window.location.href;

            if (!this.readOnly) {
              this.timerService.clearTimer();
            }
          }
          this.sendingrequest = false
        })

      }
    }
  }

  HandleClientPrameters(resp: any): any {
    if (resp) {
      sessionStorage.setItem('clientParams ' + this.sportsId, JSON.stringify(resp));
      this.clientParams = resp
      this.cBuyRate = this.clientParams?.cBuyRate;
      this.cTotalShare = this.clientParams.pShare + this.clientParams.cShare
      this.localMarketRate = this.clientParams.localMarketRate
    }
  }

  GetMarketPosition() {
    if (this.checkauthservice.IsLogin()) {
      const mktids = this.markets.map((x: { marketId: any; }) => x.marketId);
      this.sportsService
        .clientpositionsports(
          mktids.join(","),
        )
        .subscribe((resp: ClientPosition[]) => this.HandleRunnerPosition(resp)
          , (err) => {
            if (err.status == 401) {

              this.timerService.clearTimer();
            } else {
              console.error(err);
            }
          });

    }
  }

  GetSportMarketLiability() {
    if (this.checkauthservice.IsLogin()) {
      const mktids = this.markets.map(x => x.marketId);
      this.sportsService
        .SportsMarketliability(mktids.join(','))
        .subscribe((resp: LineLiablityMulti[]) => this.HandleMarketLiability(resp))

    }
  }

  HandleMarketLiability(resp: LineLiablityMulti[]): any {
    if (resp && resp.length > 0) {

      resp.forEach(
        (x: any) => {
          sessionStorage.setItem(x.marketId, x.libility);
        });
    }
    else {
      this.data.marketLiability = 0;
    }
  }
}




export class RaceMarket {
  runners: RaceRunner[]
  isLocalMarket = false;
  status = "OPEN"
  marketLiability: any;
  tabOpen = true;
  constructor(
    public inplay: boolean,
    public betfairMarketId: string,
    public startTime: string,
    public marketName: any,
    public marketId: string,
    public r: RaceRunner[],

  ) {
    this.runners = [];
    this.isLocalMarket = false;
    this.status = "OPEN";




    if (r && r.length > 0) {
      r.forEach((rr: any) => {
        this.runners.push(new RaceRunner(rr.selectionId, rr.selectionName, rr.rates, rr.winnerState));
      });
    }
    // }

  }

  public setRunners(r: RaceRunner[]) {

    try {
      r.forEach((r: any) => {
        let f = this.runners.filter((x: any) => x.selectionId == r.selectionId);
        if (f && f.length > 0) {
          f[0].setStatus(r.winnerState);
          if (r.rates != null && r.rates != undefined && r.rates.length > 2) {
            f[0].setRates(JSON.parse(r.rates.replaceAll('\'', '\"')));
          }

        }
      });
    } catch (error) {
      console.error(error, r);
    }
  }


}
export class RaceRunner {
  public back: backlay[]
  public lay: backlay[]
  public RPosition: any
  public position: any
  public betslip: any;
  public indexNo: any;
  public selectionNameNew: any;
  public runnerStatus: any;
  public cBuyRate: any;
  public cTotalShare: any;
  clientParam: any;
  constructor(public selectionId: string,
    public selectionName: string,
    rates: any,
    public winnerState?: string,

  ) {
    this.back = [new backlay(0, 0), new backlay(0, 0), new backlay(0, 0)];
    this.lay = [new backlay(0, 0), new backlay(0, 0), new backlay(0, 0)];

    if (rates != null && rates != '{}') {
      try {
        this.setRates(JSON.parse(rates.replaceAll('\'', '\"')));
        this.setStatus('')
      } catch (error) {
        console.error(error, rates);
      }
    }
  }
  public setRunnerStatus(s: any) {
    this.runnerStatus = s;
  }
  public setStatus(s: any) {
    this.winnerState = s;
  }
  public setRates(r: any) {

    let cp = sessionStorage.getItem('clientParams ')
    //debugger
    if (cp != null) {
      this.clientParam = JSON.parse(cp);
      this.cBuyRate = this.clientParam?.cBuyRate;
      this.cTotalShare = this.clientParam.pShare + this.clientParam.cShare;

    }

    if (r == null || r == undefined || r.length < 3) {
      this.setStatus('NonRunner');
    } else {
      this.setStatus(null);
    }

    if (!this.lay) {
      // debugger
      this.lay = [new backlay(0, 0), new backlay(0, 0), new backlay(0, 0)];
    }
    if (!this.back) {
      this.back = [new backlay(0, 0), new backlay(0, 0), new backlay(0, 0)];
    }
    // this.lay = new Array();
    // this.back = new Array();

    let bexists = false;
    let btype = '';
    if (this.betslip) {
      bexists = true;
      btype = this.betslip.bType;
    }



    if (r && r.l) {

      if (r.l.length > 2) {
        this.lay[0].price = r.l[0].split('@')[0];
        this.lay[0].size = shortenLargeNumber(SetAmount(r.l[0].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.lay[1].price = r.l[1].split('@')[0];
        this.lay[1].size = shortenLargeNumber(SetAmount(r.l[1].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.lay[2].price = r.l[2].split('@')[0];
        this.lay[2].size = shortenLargeNumber(SetAmount(r.l[2].split('@')[1], this.cTotalShare, this.cBuyRate));
        if (bexists == true && btype == "lay") {
          this.betslip.price = this.lay[0].price;
        }
      } else if (r.l.length > 1) {
        this.lay[0].price = r.l[0].split('@')[0];
        this.lay[0].size = shortenLargeNumber(SetAmount(r.l[0].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.lay[1].price = r.l[1].split('@')[0];
        this.lay[1].size = shortenLargeNumber(SetAmount(r.l[1].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.lay[2].price = 0;
        this.lay[2].size = 0;
        if (bexists == true && btype == "lay") {
          this.betslip.price = this.lay[0].price;
        }
      } else if (r.l.length > 0) {
        this.lay[0].price = r.l[0].split('@')[0];
        this.lay[0].size = shortenLargeNumber(SetAmount(r.l[0].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.lay[1].price = 0;
        this.lay[1].size = 0;
        this.lay[2].price = 0;
        this.lay[2].size = 0;
        if (bexists == true && btype == "lay") {
          this.betslip.price = this.lay[0].price;
        }
      } else {
        this.lay[0].price = 0;
        this.lay[0].size = 0;
        this.lay[1].price = 0;
        this.lay[1].size = 0;
        this.lay[2].price = 0;
        this.lay[2].size = 0;
        if (bexists == true && btype == "lay") {
          // this.betslip = null;
        }
      }

      r.l.forEach((e: any, index: number) => {
        this.lay[index].price = e.split('@')[0];
        this.lay[index].size = shortenLargeNumber(SetAmount(e.split('@')[1], this.cTotalShare, this.cBuyRate));
      });
      if (bexists == true && btype == "lay") {
        this.betslip.price = this.lay[0].price;
      }

    } else {

      this.lay[0].price = 0;
      this.lay[0].size = 0;
      this.lay[1].price = 0;
      this.lay[1].size = 0;
      this.lay[2].price = 0;
      this.lay[2].size = 0;
      if (bexists == true && btype == "lay") {
        // this.betslip = null;
      }
    }

    if (r && r.b) {
      if (r.b.length > 2) {
        this.back[0].price = r.b[0].split('@')[0];
        this.back[0].size = shortenLargeNumber(SetAmount(r.b[0].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.back[1].price = r.b[1].split('@')[0];
        this.back[1].size = shortenLargeNumber(SetAmount(r.b[1].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.back[2].price = r.b[2].split('@')[0];
        this.back[2].size = shortenLargeNumber(SetAmount(r.b[2].split('@')[1], this.cTotalShare, this.cBuyRate));
        if (bexists == true && btype == "back") {
          this.betslip.price = this.back[0].price;
        }
      } else if (r.b.length > 1) {
        this.back[0].price = r.b[0].split('@')[0];
        this.back[0].size = shortenLargeNumber(SetAmount(r.b[0].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.back[1].price = r.b[1].split('@')[0];
        this.back[1].size = shortenLargeNumber(SetAmount(r.b[1].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.back[2].price = 0;
        this.back[2].size = 0;
        if (bexists == true && btype == "back") {
          this.betslip.price = this.back[0].price;
        }
      } else if (r.b.length > 0) {
        this.back[0].price = r.b[0].split('@')[0];
        this.back[0].size = shortenLargeNumber(SetAmount(r.b[0].split('@')[1], this.cTotalShare, this.cBuyRate));
        this.back[1].price = 0;
        this.back[1].size = 0;
        this.back[2].price = 0;
        this.back[2].size = 0;
        if (bexists == true && btype == "back") {
          this.betslip.price = this.back[0].price;
        }
      } else {
        this.back[0].price = 0;
        this.back[0].size = 0;
        this.back[1].price = 0;
        this.back[1].size = 0;
        this.back[2].price = 0;
        this.back[2].size = 0;
        if (bexists == true && btype == "back") {
          // this.betslip = null;
        }
      }

      r.b.forEach((e: any, index: number) => {
        this.back[index].price = e.split('@')[0];
        this.back[index].size = shortenLargeNumber(SetAmount(e.split('@')[1], this.cTotalShare, this.cBuyRate));

      });

    } else {
      this.back[0].price = 0;
      this.back[0].size = 0;
      this.back[1].price = 0;
      this.back[1].size = 0;
      this.back[2].price = 0;
      this.back[2].size = 0;
      if (bexists == true && btype == "back") {
        // this.betslip = null;
      }
    }
  }
}

export class backlay {
  public price: any;
  public size: any;
  constructor(p: any,
    s: any) {
    this.price = p;
    this.size = s;
  }
}


export function isNullOrUndefinedOrEmpty(value: any): value is null | undefined | '' | [] | {} | 0 {
  if (!value) {
    return true;
  }
  if (typeof value == "string") {
    return value === '';
  }
  if (isNaN(value)) {
    return value === 0;
  }
  if (typeof value === 'number' && isNaN(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length <= 0;
  }
  if (typeof value == "object") {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }
  return false;
}
