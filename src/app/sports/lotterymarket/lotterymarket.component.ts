import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BookMaker,
  ClientPosition,
} from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import {
  LotterytimerService,
} from '../../services/timer.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { ToastService } from '../../services/toast.service';
import { UtillsService } from '../../services/utills.service';
import { GenericService } from '../../services/generic.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OrderbyrunnerPipe } from '../../pipes/orderbyrunner.pipe';
import { TruncPipe } from '../../pipes/trunc.pipe';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { PlatformService } from '../../services/platform.service';
@Component({
  selector: 'app-lotterymarket',
  templateUrl: './lotterymarket.component.html',
  styleUrls: ['./lotterymarket.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ShortennumPipe,
    TruncPipe,
    OrderbyrunnerPipe,
    PartialBetslipComponent

  ]
})
export class LotterymarketComponent implements OnInit, OnDestroy {
  @Input() fancyRate: any;
  @Input() eventId: any;
  @Output() loadBets: EventEmitter<any> = new EventEmitter<any>();

  lotteryData: any = {};
  bookName = '';
  isOneClickBetGlobal: boolean = false;
  isOneClickBetClient: boolean = false;
  siteLoader: string = "";
  Lotterytimer: any = 5000;
  minBKFncy: number = 50
  constructor(
    private checkauthservice: CheckAuthService,
    private sportService: BackendService,
    private lotterytimerService: LotterytimerService,
    private storageService: StorageService,
    private toasterService: ToastService,
    private utillsService: UtillsService,
    private genericService: GenericService,
    private platformService: PlatformService


  ) {
    if (this.platformService.isBrowser()) {

      if (_window().Lotterytimer) {
        this.Lotterytimer = _window().Lotterytimer;
      }
      if (_window().minBKFncy) {
        this.minBKFncy = _window().minBKFncy;
      }
      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader;
      }
      this.isOneClickBetClient = this.storageService.getItem('OCB');
      if (_window().hideOCBonComp) {
        this.isOneClickBetGlobal = true;
      }
    }
  }
  ngOnDestroy(): void {
    this.lotterytimerService.clearTimer();
    clearInterval(this.lotteryInterval)
  }

  lotteryInterval: any
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      this.loadLotteryData();
      this.lotteryInterval = setInterval(() => {
        this.loadLotteryData();
      }, 10000)
    }
  }


  callFirstTime: boolean = true
  loadLotteryData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportService
        .LotteryMarkets(this.eventId || 0, 'LotterymarketComponent')
        .subscribe((resp) => {
          if (resp) {
            this.lotteryHandling(resp);
            if (this.callFirstTime) {
              let ids = this.lotteryData.map((x: any) => '6.' + x.marketId).join(',')
              this.GetMarketPosition(ids);
              this.GetSportMarketLiability(ids);
            }
            this.callFirstTime = false
          }
        })

    }
  }
  lotteryCollapse: boolean = true;
  collapseLottery() {
    this.lotteryCollapse = !this.lotteryCollapse;
    if (this.lotteryCollapse) {
      this.lotteryData.forEach((market: any) => {
        market.collapse = false;
      });
    } else {
      this.lotteryData.forEach((market: any) => {
        market.collapse = true;
      });
    }
  }

  collapseMarket(lottery: any) {
    lottery.collapse = !lottery.collapse;
  }
  lotteryHandling(d: any) {
    try {
      let lotteryMarketsData: any = [];
      if (d && d.length > 0) {
        d.forEach((b: string) => {
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
          lotteryMarketsData.push(mid);
        });
      }

      let lottery = lotteryMarketsData;

      if (lottery && lottery.length > 0) {
        if (this.lotteryData && this.lotteryData.length > 0) {
          lottery?.forEach((runner: any) => {
            let fr = this.lotteryData.filter(
              (x: any) => x.marketId == runner.marketId
            );
            if (fr && fr.length > 0) {
              fr[0].selectionId = runner.selectionId;
              fr[0].selectionName = runner.selectionName;
              fr[0].backOdds = runner.backOdds;
              fr[0].layOdds = runner.layOdds;
              fr[0].status = runner.status;
              fr[0].SelectionStatus = runner.SelectionStatus;
              fr[0].sortPeriority = runner.sortPeriority;
              fr[0].statusName = runner.statusName;
            } else {
              this.lotteryData = [...this.lotteryData, runner];
            }
          });

        } else {
          this.lotteryData = lottery;
        }
        lottery?.forEach((runner: any) => {
          if (runner.statusName !== 'OPEN') {
            this.collapseMarket(runner);
          }
        });
      } else {
        this.lotteryData = [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  placebetLottery(lotteryMdata: any, r: BookMaker, type: string, odds: any, marketId: string) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    this.lotteryData.forEach((l: any) => (l.betslip = null));
    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      marketId: marketId,
      selectionid: r.selectionId,
      name: r.selectionName,
      handicap: 0,
      price: odds,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'lotm',
      bettingType: null,
      marketType: null,
      linerange: null,
      eventId: this.eventId,
      minBet: this.minBKFncy,
    }

    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip)
    } else {
      lotteryMdata.betslip = {
        ...betSlip,
        maxBet: this.lotteryData[0].maxSetting * this.fancyRate,
        lotterySelectionName: r.selectionName,
      };
    }
  }
  placeBetMarketId: string = ""
  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.placeBetMarketId = betslip.marketId
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.placeBetMarketId = ""
  }

  catchError(err: any) {
    if (err && err.status && err.status == 401) {
      this.storageService.removeItem('token');
      clearInterval(this.lotteryInterval)
      this.genericService.openLoginModal()

    } else {
      console.log(err);
    }
  }

  betStatus(resp: any) {
    let betstatus = resp.status;
    const translatedResponse = resp.message || resp.response.message;
    if (betstatus) {
      this.lotteryBetStatus({
        success: this.placeBetMarketId,
        marketId: this.placeBetMarketId
      })
      this.toasterService.show(translatedResponse, {
        classname: 'bg-success text-white',
        delay: 4000,
        sound: true,
      });

    } else {
      this.toasterService.show(translatedResponse, {
        classname: 'bg-danger text-white',
        delay: 4000,
        sound: true,
      });
    }

  }
  get isOneClickOn() {
    return this.storageService.getItem('OCB') && this.isOneClickBetGlobal
  }




  private GetMarketPosition(mkts: any) {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        if (this.lotteryData && this.lotteryData && this.lotteryData.length > 0) {
          this.sportService
            .clientpositionsports(mkts)
            .subscribe(
              {
                next: (resp: ClientPosition[]) => this.HandleRunnerPosition(resp),
                error: (error) => this.catchError(error),
              }
            )

        }
      }
    }
  }


  HandleRunnerPosition(resp: ClientPosition[]) {
    if (resp && resp.length > 0) {
      resp.forEach((x: any) => {
        if (this.lotteryData && this.lotteryData.length > 0) {
          let f = this.lotteryData.filter(
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

  lotteryBetStatus(status: any) {
    if (status.success) {
      this.lotteryData.forEach((l: any) => (l.betslip = null));
      this.GetMarketPosition('6.' + status.marketId)
      this.GetSportMarketLiability('6.' + status.marketId);
      this.loadBets.emit()
    }
  }

  GetSportMarketLiability(mkts: any) {
    if (navigator.onLine == true && document.hidden == false) {

      if (this.checkauthservice.IsLogin()) {
        if (this.lotteryData && this.lotteryData.length > 0) {
          this.sportService
            .SportsMarketliability(mkts)
            .subscribe(
              {
                next: (resp: any) => {
                  if (resp && resp.length > 0) {
                    resp.forEach((x: any) => {
                      let f = this.lotteryData.filter(
                        (xx: any) => xx.marketId == x.marketId.split('.')[1]
                      );
                      if (f && f.length > 0) {
                        f[0].liability = x.libility;
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
  }





}
