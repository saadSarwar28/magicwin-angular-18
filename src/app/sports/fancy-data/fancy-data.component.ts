import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookMaker } from '../../models/models';
import { _window, BackendService } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { StorageService } from '../../services/storage.service';
import { FancytimerService, TimerService } from '../../services/timer.service';
import { ToastService } from '../../services/toast.service';
import { UtillsService } from '../../services/utills.service';
import { BookpositionComponent } from '../../shared/bookposition/bookposition.component';

@Component({
  selector: 'app-fancy-data',
  templateUrl: './fancy-data.component.html',
  styleUrls: ['./fancy-data.component.css']
})
export class FancyDataComponent implements OnInit, OnChanges {

  fancyData: any = {};
  @Input() eventId: any;
  @Input() fancyRate: any;
  @Input() fancyResponse?: any;
  @Output() loadBets: EventEmitter<any> = new EventEmitter<any>();

  otherCategories: any = [];
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
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    if (_window().fancytimer) {
      this.fInterval = _window().fancytimer;
    }
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
  oneClickBetObj: any = {

  }
  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.secureStorage.getItem('OCBSelectedVal');
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
      this.storageService.secureStorage.removeItem('token');
      this.fancyTimerService.clearTimer();
      this.timerService.clearTimer()
      this.genericService.openLoginModal()

    } else {
      console.log(err);
    }
  }


  collapseMarket(item: any) {
    item.collapse = !item.collapse
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
      this.FancyBetStatus({
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
    return this.storageService.secureStorage.getItem('OCB') && this.isOneClickBetGlobal
  }

  placeBetFancy(catagory: string, r: BookMaker, type: string, odds: any, runs: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (odds == 0 || odds == null || odds == '') {
      this.toasterService.show('Invalid odds value', {
        classname: 'bg-danger text-light',
        delay: 3000,
        sound: true,
      });
      return;
    }

    this.fancyData.fancy.forEach((l: any) => (l.betslip = null));
    let btn = this.checkauthservice.getstaks();
    let betSlip = {
      marketId: r.marketId,
      selectionid: runs,
      handicap: 0,
      price: odds,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: 'fn',
      bettingType: null,
      marketType: null,
      linerange: null,
      eventId: this.eventId,
      oneClickType: catagory,
      minBet: this.fancyData.fancy[0]?.minSetting,
      maxBet: this.fancyData.fancy[0]?.maxSetting * this.fancyRate,
    }
    if (this.isOneClickOn) {
      this.placeOneClickBet(betSlip)
    } else {
      r.betslip = {
        ...betSlip
      };
    }
    ///console.log("i exit");
  }

  openFancyPosition(m: any, n: any) {

    if (this.checkauthservice.IsLogin()) {
      let marketId: any = '4.' + m
      let data = { marketId: marketId, marketName: n }
      this.dialogRef.open(BookpositionComponent, {
        width: '500px',
        maxHeight: '70vh',
        maxWidth: '95vw',
        panelClass: 'my-markets-dialog',
        data,
      });
    } else {
      this.genericService.openLoginModal()
    }

  }



  FancyBetStatus(status: any) {
    if (status.success) {
      this.fancyData.fancy.forEach((l: any) => (l.betslip = null));
      this.GetFancyMarketLiability()
      this.loadBets.emit()
    }
  }

  fancyMarkets = [
    {
      oddsYes: "oddsYes",
      oddsNo: "oddsNo",
      runsNo: "runsNo",
      runsYes: "runsYes",
      statusName: "statusName"
    },
    {
      oddsYes: "oddsYes1",
      oddsNo: "oddsNo1",
      runsNo: "runsNo1",
      runsYes: "runsYes1",
      statusName: "statusName1"
    },
    {
      oddsYes: "oddsYes2",
      oddsNo: "oddsNo2",
      runsNo: "runsNo2",
      runsYes: "runsYes2",
      statusName: "statusName2"
    }
  ]

  fancyDataFilters: any = [];
  fancyFilter = 'ALL';
  callFirstTime: boolean = true
  reorderArrayBySequence(array: any, sequence: any) {
    let remainingItems = array.filter((item: any) => !sequence.includes(item));
    return sequence.concat(remainingItems);
  }


  fancyHandling(d: any) {
    try {
      if (d) {
        let fancyMarketsData: any = [];
        if (d.hasOwnProperty('fancy')) {
          if (d.fancy && d.fancy.length > 0) {
            d.fancy.forEach((b: string) => {
              const splitData: string[] = b.split('|');
              const obj = {
                marketId: splitData[0],
                marketName: splitData[1],
                statusName: splitData[2],
                catagory: splitData[3],
                minSetting: splitData[4],
                maxSetting: splitData[5],
                ratingExposure: splitData[6],
                rebateRatio: splitData[7],
                source: splitData[8],
                sortingOrder: Number(splitData[9]),
                oddsYes: splitData[10],
                oddsNo: splitData[11],
                runsYes: splitData[12],
                runsNo: splitData[13],
                oddsYes1: splitData[14],
                oddsNo1: splitData[15],
                runsYes1: splitData[16],
                runsNo1: splitData[17],
                statusName1: splitData[18],
                oddsYes2: splitData[19],
                oddsNo2: splitData[20],
                runsYes2: splitData[21],
                runsNo2: splitData[22],
                statusName2: splitData[23],
              };
              fancyMarketsData.push(obj);
              //
            });
          }

          let fancyData = fancyMarketsData;
          if (fancyData && fancyData.length > 0) {
            this.otherCategories = fancyData.filter(
              (item: any) => item.catagory === 'ODD/EVEN'
            );
            let filteredCategory = Array.from(
              new Set(fancyData.map((x: any) => x.catagory))
            );
            //let catagory = filteredCategory.filter((cat) => cat !== 'ODD/EVEN');
            let catagory = Array.from(
              new Set(fancyData.map((x: any) => x.catagory))
            );
            let sequence = ['SESSION', 'W/P MARKET', 'ODD/EVEN', 'XTRA'].filter(
              (cat) => cat
            );
            catagory = this.reorderArrayBySequence(catagory, sequence);
            //console.log("sequence", catagory)
            let updatedFiterData = this.fancyDataFilters.filter((x: any) =>
              catagory.includes(x)
            );
            if (this.fancyDataFilters && this.fancyDataFilters.length <= 0) {
              this.fancyDataFilters = [this.fancyFilter, ...updatedFiterData];
            } else {
              catagory.forEach((x) => {
                if (!this.fancyDataFilters.includes(x)) {
                  this.fancyDataFilters.push(x);
                }
              });
            }

            if (this.fancyData.fancy && this.fancyData.fancy.length > 0) {
              fancyData?.forEach((runner: any) => {
                let fr = this.fancyData.fancy.filter(
                  (x: any) => x.marketId == runner.marketId
                );
                if (fr && fr.length > 0) {
                  fr[0].catagory = runner.catagory;
                  fr[0].statusName = runner.statusName;
                  fr[0].runsNo = runner.runsNo;
                  fr[0].runsYes = runner.runsYes;
                  fr[0].oddsYes = runner.oddsYes;
                  fr[0].oddsNo = runner.oddsNo;

                  fr[0].runsNo1 = runner.runsNo1;
                  fr[0].runsYes1 = runner.runsYes1;
                  fr[0].oddsYes1 = runner.oddsYes1;
                  fr[0].oddsNo1 = runner.oddsNo1;
                  fr[0].statusName1 = runner.statusName1;
                  fr[0].runsNo2 = runner.runsNo2;
                  fr[0].runsYes2 = runner.runsYes2;
                  fr[0].oddsYes2 = runner.oddsYes2;
                  fr[0].oddsNo2 = runner.oddsNo2;
                  fr[0].statusName2 = runner.statusName2;

                } else {
                  this.fancyData.fancy = [...this.fancyData.fancy, runner];
                }
              });

              // remove old markets of fancy
              let NewMarketList = fancyData.map((x: any) => x.marketId);
              let ExistingMarketList = this.fancyData.fancy.map(
                (x: any) => x.marketId
              );
              let finding = ExistingMarketList.filter(
                (x: any) => !NewMarketList.includes(x)
              );
              if (finding && finding?.length > 0) {
                finding?.forEach((el: any) => {
                  this.fancyData.fancy = this.fancyData.fancy.filter(
                    (x: any) => x.marketId != el
                  );
                });
              }

              //remove closed Categories

              let catFound = this.fancyDataFilters.filter(
                (ff: any) => !filteredCategory.includes(ff)
              );
              if (catFound && catFound?.length > 0) {
                catFound?.forEach((el: any) => {
                  if (el !== 'ALL') {
                    this.fancyDataFilters = this.fancyDataFilters.filter(
                      (x: any) => x != el
                    );
                  }
                });
              }
            } else {
              this.fancyData.fancy = fancyData;
            }
          } else {
            this.fancyData.fancy = [];
          }
        }
        if (this.callFirstTime) {
          this.GetFancyMarketLiability()
        }
        this.callFirstTime = false
      }

    } catch (error) {
      console.error(error);
    }
  }


  GetFancyMarketLiability() {
    if (this.checkauthservice.IsLogin()) {
      this.sportService
        .FancyMarketsLiability(this.eventId, 'FancyDataComponent')
        .then((x: any) => {
          if (x && x.length > 0) {
            x.forEach((e: any) => {
              if (this.fancyData.fancy && this.fancyData.fancy.length > 0) {
                let f = this.fancyData.fancy.filter(
                  (a: any) => a.marketId == e.marketId.split('.')[1]
                );
                if (f && f.length > 0) {
                  f[0].position = parseFloat(e.position);
                  f[0].position2 = parseFloat(e.position2);
                }
              }
            });
          }
        })
        .catch((err) => {
          this.catchError(err)
        });
    }
  }
  ngOnDestroy(): void {
    this.fancyTimerService.clearTimer();
    this.timerService.clearTimer();
  }
}
