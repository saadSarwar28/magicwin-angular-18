import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookMaker, ClientPosition } from '../../models/models';
import { _window, BackendService } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { StorageService } from '../../services/storage.service';
import { FancytimerService, TimerService } from '../../services/timer.service';
import { ToastService } from '../../services/toast.service';
import { UtillsService } from '../../services/utills.service';
import { BookpositionComponent } from '../../shared/bookposition/bookposition.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { RoundoffPipe } from '../../pipes/roundoff.pipe';
import { OddsbuttonComponent } from '../../shared/reuse/oddsbutton.component';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { CashoutBetslipComponent } from '../../shared/cashout-betslip/cashout-betslip.component';
import { RemoveUnderscorePipe } from '../../pipes/removeUnderscore.pipe';
import { TruncPipe } from '../../pipes/trunc.pipe';
import { OrderbyrunnerPipe } from '../../pipes/orderbyrunner.pipe';
@Component({
  selector: 'app-bookmaker-data',
  templateUrl: './bookmaker-data.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    ShortennumPipe,
    TranslateModule,
    CommonModule,
    OddsbuttonComponent,
    PartialBetslipComponent,
    CashoutBetslipComponent,
    RemoveUnderscorePipe,
    RoundoffPipe,
    TruncPipe,
    OrderbyrunnerPipe
  ]
})
export class BookmakerDataComponent implements OnInit {
  fancyData: any = {};
  @Input() eventId: any;
  @Input() fancyResponse?: any;
  @Input() bookMakerRate: number = 1;
  @Output() loadBets: EventEmitter<any> = new EventEmitter<any>();

  fInterval: any;
  showCashout: boolean = false;
  isOneClickBetGlobal: boolean = false;
  minBKFncy: number = 50;
  siteLoader: string = "";
  constructor(
    private sportService: BackendService,
    private fancyTimerService: FancytimerService,
    private timerService: TimerService,
    private storageService: StorageService,
    private checkauthservice: CheckAuthService,
    private toasterService: ToastService,
    private genericService: GenericService,
    private utillsService: UtillsService,
  ) { }

  ngOnInit(): void {

    if (_window().showCashout) {
      this.showCashout = _window().showCashout;
    }
    if (_window().minBKFncy) {
      this.minBKFncy = _window().minBKFncy;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    this.isLoggedIn = this.checkauthservice.IsLogin()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['fancyResponse']) {
      this.fancyHandling(this.fancyResponse)
    }
  }

  isLoggedIn: any = false;

  cashoutBetSlipBookmaker(r: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (
      (r.liability == null || r.liability === 0) &&
      r.runners &&
      r.runners[0].position != 0
    ) {
      this.toasterService.show('Exposure not found', {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return;
    }
    r.runners.forEach((runner: any) => {
      runner.back = [];
      runner.lay = [];
      runner.back.push({ price: runner.backOdds });
      runner.lay.push({ price: runner.layOdds });
    });
    this.fancyData.bookMaker.forEach((l: any) => {
      l.betslip = null;
      l.runners.forEach((runner: any) => {
        runner.betslip = null;
      });
    });

    r.cashout = !r.cashout;

    if (r.cashout) {
      let btn = this.checkauthservice.getstaks();

      r.betslip = {
        eventId: this.eventId,
        marketId: r.marketId,
        selectionid: r.selectionId,
        name: r.selectionName,
        handicap: 0,
        price: null,
        size: btn.stakeVal2,
        bType: null,
        stakeButtons: btn,
        bettingOn: 'bm',
        bettingType: null,
        marketType: null,
        linerange: null,
        minBet: this.fancyData.bookMaker[0].minSetting,
        maxBet: this.fancyData.bookMaker[0].maxSetting * this.bookMakerRate,
        bookMakerMarkets: this.bookMakerMarkets,
      };
    } else {
      r.betslip = null;
    }
  }
  oneClickBetObj: any = {
  }
  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.oneClickBetObj[betslip.oneClickType] = true
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response, betslip)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.oneClickBetObj[betslip.oneClickType] = false
  }

  catchError(err: any) {
    if (err && err.status && err.status == 401) {
      this.storageService.removeItem('token');
      this.fancyTimerService.clearTimer();
      this.timerService.clearTimer()
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
      this.callBookmakerPosLib('6.' + betslip.marketId)
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

  placebetBookmaker(category: string, r: BookMaker, type: string, odds: any, marketId: string) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (odds == '' ||
      odds == '0'
      || odds == undefined || odds == null) {
      return
    }
    r.runners?.forEach((runner: any) => {
      runner.betslip = null;
    });

    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      eventId: this.eventId,
      marketId: marketId,
      selectionid: r.selectionId,
      name: r.selectionName,
      handicap: 0,
      price: odds,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'bm',
      bettingType: null,
      marketType: null,
      linerange: null,
      oneClickType: category,
      minBet: this.fancyData.bookMaker[0].minSetting,
      maxBet: this.fancyData.bookMaker[0].maxSetting * this.bookMakerRate,
    };
    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip)
    } else {
      r.betslip = {
        ...betSlip
      };
    }

  }
  collapseMarket(item: any) {
    item.collapse = !item.collapse;
  }

  openFancyPosition(m: any, n: any) {
    let marketId: any = '4.' + m
    let data = { marketId: marketId, marketName: n }
    this.genericService.openPopup(BookpositionComponent, data)
  }

  calculateWhatIf($event: any) {
    const bmMarket = this.fancyData.bookMaker.find(
      (x: any) => x.marketId === $event.marketId
    );
    if (bmMarket) {
      this.utillsService.calWhatIf(bmMarket.runners, $event)
    }
  }



  private GetMarketPosition(mkts: any) {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        if (this.fancyData && this.fancyData.bookMaker && this.fancyData.bookMaker.length > 0) {
          this.sportService
            .clientpositionsports(mkts)
            .subscribe((resp: ClientPosition[]) => this.HandleRunnerPosition(resp)
              , err => {
                this.catchError(err)
              }
            )
        }
      }
    }
  }

  HandleRunnerPosition(resp: ClientPosition[]) {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {
        if (this.fancyData.bookMaker && this.fancyData.bookMaker.length > 0) {
          let f = this.fancyData.bookMaker.filter(
            (a: any) => a.marketId == x.marketId.split('.')[1]
          );
          if (f && f[0] && f[0].runners) {
            f[0].runners.forEach((fr: any) => {
              if (fr && fr.selectionId == x.runnerId) {
                fr.position = x.position;
              }
            });
          }
        }
      });
    }
  }

  callBookmakerPosLib(marketId: any) {
    this.GetMarketPosition(marketId)
    this.getSportsbookLiability(marketId)
    this.loadBets.emit()
  }


  BookMakerBetStatus(status: any) {
    if (status.success) {
      this.fancyData.bookMaker.forEach((l: any) => (l.betslip = null));
      this.callBookmakerPosLib('6.' + status.marketId)
    }
  }
  BetPlaceBookmakerCashout(status: any) {
    if (status.success) {
      this.fancyData.bookMaker.forEach((l: any) => (l.betslip = null));
      this.callBookmakerPosLib('6.' + status.marketId)
    }
  }

  bookMakerMarketName: String = 'bookmaker';
  bookMakerMarkets: string[] = [];
  callFirstTime: boolean = true

  fancyHandling(d: any) {
    try {
      if (d) {
        if (d.hasOwnProperty('bookMaker')) {
          let bookmakerMarketsData: any = [];
          if (d.bookMaker && d.bookMaker.length > 0) {
            d.bookMaker.forEach((b: string) => {
              const hedaing: string[] = b.split('~');
              const hh: string[] = hedaing[0].split('|');
              const mid = {
                marketId: hh[0],
                marketName: hh[1],
                minSetting: hh[2],
                maxSetting: hh[3],
                ratingExposure: hh[4],
                rebateRatio: hh[5],
                statusName: hh[6],
                runners: [] as Array<{
                  selectionId: string;
                  selectionName: string;
                  backOdds: string;
                  layOdds: string;
                  status: string;
                  SelectionStatus: string;
                  sortPeriority: string;
                }>,
              };
              const runners: string = hedaing[1];
              runners.split('*').forEach((hhh: string) => {
                const hhhSplit: string[] = hhh.split('|');
                //
                mid.runners.push({
                  selectionId: hhhSplit[0],
                  selectionName: hhhSplit[1],
                  backOdds: hhhSplit[4],
                  layOdds: hhhSplit[3],
                  status: hhhSplit[2],
                  SelectionStatus: hhhSplit[5],
                  sortPeriority: hhhSplit[6],
                });
              });
              bookmakerMarketsData.push(mid);
              // console.log(JSON.stringify(mid));
            });
          }
          let bookMakerData = bookmakerMarketsData;
          if (bookMakerData[0]?.marketName) {
            this.bookMakerMarketName = bookMakerData[0]?.marketName;
          }
          if (bookMakerData && bookMakerData.length > 0) {
            if (this.fancyData.bookMaker && this.fancyData.bookMaker.length > 0) {
              bookMakerData.forEach((newMdata: any) => {
                var filterm = this.fancyData.bookMaker.filter(
                  (x: any) => x.marketId == newMdata.marketId
                );
                if (filterm && filterm.length > 0) {
                  newMdata.runners.forEach((newRun: any) => {
                    var filterrun = filterm[0].runners.filter(
                      (x: any) => x.selectionId == newRun.selectionId
                    );
                    if (filterrun && filterrun.length > 0) {
                      filterrun[0].SelectionStatus = newRun.SelectionStatus;
                      filterrun[0].backOdds = newRun.backOdds;
                      filterrun[0].layOdds = newRun.layOdds;
                    }
                  });
                }
              });

              // remove closed Bookmaker Markets
              let NewMarketList = bookMakerData.map((x: any) => x.marketId);
              let ExistingMarketList = this.fancyData.bookMaker.map(
                (x: any) => x.marketId
              );
              let finding = ExistingMarketList.filter(
                (x: any) => !NewMarketList.includes(x)
              );
              if (finding && finding?.length > 0) {
                finding?.forEach((el: any) => {
                  this.fancyData.bookMaker = this.fancyData.bookMaker.filter(
                    (x: any) => x.marketId != el
                  );
                });
              }

            } else {
              this.fancyData.bookMaker = bookMakerData;
            }
            if (this.bookMakerMarketsLength != this.fancyData.bookMaker.length) {
              this.fancyData.bookMaker.forEach((market: any) => {
                this.bookMakerMarkets.push(market.marketName)
                this.oneClickBetObj[market.marketName] = false;
              })
              this.bookMakerMarketsLength = this.bookMakerMarkets.length
            }

          } else {
            this.fancyData.bookMaker = [];
          }
        }
        if (this.callFirstTime) {
          let ids = this.fancyData.bookMaker.map((x: any) => '6.' + x.marketId).join(',')
          this.getSportsbookLiability(ids)
          this.GetMarketPosition(ids);
        }
        this.callFirstTime = false
      }


    } catch (error) {
      console.error(error);
    }
  }
  bookMakerMarketsLength: number = 0
  getSportsbookLiability(marketid: string) {
    if (this.checkauthservice.IsLogin()) {
      if (marketid !== '') {
        this.sportService
          .SportsMarketliability(marketid)
          .subscribe((resp: any) => {
            if (resp && resp.length > 0) {
              resp.forEach((x: any) => {
                let f = this.fancyData.bookMaker.filter(
                  (xx: any) => xx.marketId == x.marketId.split('.')[1]
                );
                if (f && f.length > 0) {
                  f[0].liability = x.libility;
                }
              });
            }
          },
            err => {
              this.catchError(err)

            }
          )

      }
    }
  }
  ngOnDestroy(): void {
    this.fancyTimerService.clearTimer();
    this.timerService.clearTimer();
  }
}
