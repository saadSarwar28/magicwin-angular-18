import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BookMaker, ClientParameters, ClientPosition } from '../../models/models';
import { _window, BackendService } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { StorageService } from '../../services/storage.service';
import { FancytimerService, TimerService } from '../../services/timer.service';
import { ToastService } from '../../services/toast.service';
import { UtillsService } from '../../services/utills.service';
import { BookpositionComponent } from '../../shared/bookposition/bookposition.component';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-fancy-bookmaker',
  templateUrl: './fancy-bookmaker.component.html',
  styleUrls: []
})
export class FancyBookmakerComponent implements OnInit, OnDestroy {

  fancyData: any = {};
  @Input() eventId: any;
  @Input() fancyVersion: any;
  @Input() lineData?: any;
  @Input() localMarketRate?: any
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
    private platformService: PlatformService
  ) { }

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

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
      this.GetClientParameters()
      this.loadFancyData()

    }
  }
  isLoggedIn: any = false;
  bookMakerRate: number = 1;
  fancyRate: number = 1;
  GetClientParameters() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.isLoggedIn) {
        let clientParams = this.storageService.getItem('clientParams');
        if (clientParams != null) {
          this.bookMakerRate = clientParams.bookMakerRate;
          this.fancyRate = clientParams.fancyRate;
          this.localMarketRate = clientParams.localMarketRate;
        }
      } else {
        let bookmakerRate = _window()?.bookmakerMarketRate;
        let fancymarketRate = _window()?.fanceMarketRate;
        this.bookMakerRate = bookmakerRate;
        this.fancyRate = fancymarketRate;
      }
    }
  }



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
      if (betslip.bettingOn == 'bm') {
        this.callBookmakerPosLib('6.' + betslip.marketId)
      } else {
        this.FancyBetStatus({
          success: true,
          marketId: betslip.marketId
        })
      }
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
    let marketId: any = '4.' + m
    let data = { marketId: marketId, marketName: n }
    this.genericService.openPopup(BookpositionComponent, data)
  }

  calculateWhatIf($event: any) {
    //console.warn($event);
    //console.log(this.completedMatch)
    const updateRunner = (r: any, isBack: boolean, isSelected: boolean, pl: number, stake: number) => {
      if (r.position !== null && r.position !== undefined) {
        r.whatIf = isSelected
          ? (r.position + (isBack ? pl : -pl))
          : (r.position + (isBack ? -stake : stake));
      } else {
        r.whatIf = isSelected
          ? (isBack ? pl : -pl)
          : (isBack ? -stake : stake);
      }
    };

    if ($event.selectionID !== null) {
      const isBack = $event.bType === 'back';
      const pl = $event.pl;
      const stake = $event.stake;

      const updateRunners = (runners: any[], marketId?: string) => {
        runners.forEach((r: any) => {
          if (!marketId || r.marketId === marketId) {
            const isSelected = r.selectionId === $event.selectionID;
            updateRunner(r, isBack, isSelected, pl, stake);
          }
        });
      };

      if ($event.bettingOn === 'bm') {
        const bmMarket = this.fancyData.bookMaker.find((x: any) => x.marketId === $event.marketId);
        if (bmMarket) {
          updateRunners(bmMarket.runners);
        }
      }
    } else {
      this.fancyData.bookMaker.forEach((l: any) => {
        l.runners.forEach((r: any) => {
          r.whatIf = null;
        })
      });
    }
  }

  private GetMarketPosition(mkts: any) {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.checkauthservice.IsLogin()) {
        if (this.fancyData && this.fancyData.bookMaker && this.fancyData.bookMaker.length > 0) {
          this.sportService
            .clientpositionsports(mkts)
            .subscribe(
              {
                next: (value) => (resp: ClientPosition[]) => this.HandleRunnerPosition(resp),
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
  bookMakerMarketName: String = 'bookmaker';
  bookMakerMarkets: string[] = [];

  callFirstTime: boolean = true
  loadFancyData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportService
        .FancyMarketsAny(
          this.fancyVersion,
          this.eventId
        )
        .subscribe(
          {
            next: (resp) => {
              if (resp) {
                this.fancyHandling(resp);
                if (this.callFirstTime) {
                  let ids = this.fancyData.bookMaker.map((x: any) => '6.' + x.marketId).join(',')
                  this.getSportsbookLiability(ids)

                  this.GetMarketPosition(ids);
                  this.GetFancyMarketLiability()
                }
                this.callFirstTime = false
              }
            },
            error: (error) => this.catchError(error),
          }
        )

    }
    this.fancyTimerService.SetTimer(
      setInterval(() => {
        this.loadFancyData();
      }, this.fInterval)
    );
  }

  reorderArrayBySequence(array: any, sequence: any) {
    let remainingItems = array.filter((item: any) => !sequence.includes(item));
    return sequence.concat(remainingItems);
  }
  fancyHandling(d: any) {
    try {
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
          .subscribe(
            {
              next: (resp: any) => {
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
              error: (error) => this.catchError(error),
            }
          )

      }
    }
  }
  GetFancyMarketLiability() {
    if (this.checkauthservice.IsLogin()) {
      this.sportService
        .FancyMarketsLiability(this.eventId)
        .subscribe(
          {
            next: (x: any) => {
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
            },
            error: (error) => this.catchError(error),
          }
        )

    }
  }
  ngOnDestroy(): void {
    this.fancyTimerService.clearTimer();
    this.timerService.clearTimer();
  }
}
