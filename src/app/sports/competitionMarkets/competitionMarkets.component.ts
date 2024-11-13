import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import {
  DirectCopetitionMarket,
  MarketCatalogueSS,
  MarketRunners,
} from '../../models/models';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ScoreTimerService, TimerService } from '../../services/timer.service';
import { _window, BackendService } from 'src/app/services/backend.service';
import { ToastService } from 'src/app/services/toast.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { UtillsService } from 'src/app/services/utills.service';
import { GenericService } from 'src/app/services/generic.service';
import { WalletService } from 'src/app/services/wallet.service';
import { SportsIdMapperService } from "../../services/sportsIdMapper.service";
@Component({
  selector: 'app-competitionMarkets',
  templateUrl: './competitionMarkets.component.html',
  styleUrls: ['./competitionMarkets.component.scss'],
})
export class CompetitionMarketsComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  noContentFound: boolean = false;
  isOneClickBetGlobal: boolean = false;
  sportsId: string = '';
  data: any;
  source: any;
  marketIds: any[] = [];
  eventIds: any[] = [];
  currencyCode = '';
  cBuyRate = 1;
  cTotalShare = 0;
  siteLoader: string = ""
  constructor(
    private checkauthservice: CheckAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sportsService: BackendService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private elementRef: ElementRef,
    private timerService: TimerService,
    private scoreTimerService: ScoreTimerService,
    private utilsService: UtillsService,
    private genericService: GenericService,
    private walletService: WalletService,
    private sportsMapperService: SportsIdMapperService
  ) {
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // had to refresh browser because angular not detecting route change when back button from browser is pressed on web
        if (this.sportsMapperService.getSportByName(event.url.split('/')[event.url.split('/').length - 1].toLowerCase()) !== '') {
          // check if the back button is pressed only then navigate
          if (event.navigationTrigger == 'popstate') {
            window.location = window.location
          }
        }
      }
    })


    this.route.params.subscribe((p) => {
      this.sportsId = p.id;
      this.sportsId = this.sportsId.split('-')[this.sportsId.split('-').length - 1]
      this.checkPathandLoaddata();
    });
    if (this.checkauthservice.HaveStakes()) {
      this.cBuyRate = this.checkauthservice.cBuyRate;
      this.cTotalShare = this.checkauthservice.cTotalShare;
      this.currencyCode = this.checkauthservice.currencyCode;
    }
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }
  routeToMarket(link) {
    link ? this.router.navigate([link]) : {};
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.sportsId = this.route.snapshot.paramMap.get('id') || '';
    this.route.params.subscribe((p) => {
      this.sportsId = p.id;
      // console.log(" p.id", p.id)
    })
  }



  checkPathandLoaddata() {
    if (parseInt(this.sportsId) > 0) {
      this.LoadData();
    } else {
      this.router.navigate(['/sports/notfound']);
    }
  }

  inPlayMarketIds: string[] = []
  isLoading: boolean = true
  LoadData() {
    this.isLoading = true
    this.sportsService
      .getcompetitionmarkets(
        parseInt(this.sportsId),
        'CompetitionMarketsComponent'
      )
      .then((resp) => {
        this.data = resp;
        this.isLoading = false
        resp.competitions?.forEach((x: any) => {
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
          }, 1000)
        );

        this.scoreTimerService.SetTimer(
          setInterval(() => {
            this.GetScore();
          }, 1000)
        );
      })
      .catch((err) => {
        this.isLoading = false
        this.catchError(err)
      });
  }

  GetSportMarketLiability(marketIds: string) {
    if (this.checkauthservice.IsLogin()) {
      if (marketIds != "") {
        this.sportsService
          .SportsMarketliability(marketIds, 'CompetitionMarketsComponent')
          .then((resp) => {
            if (resp && resp.length > 0) {
              resp.forEach((x: any) => {
                this.data?.competitions?.forEach((event: any) => {
                  let l = event.markets.filter(
                    (lm: any) => lm.marketId == x.marketId
                  );
                  if (l && l.length > 0) {
                    l[0].marketLiability = x.libility;
                  }
                })
              })
            }
          })
          .catch((err) => {
            this.catchError(err)
          });
      }
    }
  }


  GetWalllet() {
    this.walletService.loadBalance()
  }
  oneClickBetObj = {}
  async placeOneClickBet(betslip) {
    let betSize = this.storageService.secureStorage.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.oneClickBetObj[betslip.oneClickType] = true
      let response: any = await this.utilsService.placeBet(betslip)
      this.betStatus(response, betslip.marketId)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.oneClickBetObj[betslip.oneClickType] = false

  }
  BetPlacedStatus(status: any) {
    if (status.success) {
      this.market = null
      this.GetWalllet();
      this.GetSportMarketLiability(status.marketId);
    }
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
    let price = type == 'back' ? r.back[0].price : r.lay[0].price;
    if (price == '' ||
      price == '0'
      || price == undefined || price == null) {
      return
    }
    this.market.betslip = null
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

  get isOneClickOn() {
    return this.storageService.secureStorage.getItem('OCB') && this.isOneClickBetGlobal
  }
  catchError(err) {
    if (err.status && err.status == 401) {
      this.timerService.clearTimer();
      this.scoreTimerService.clearTimer();
      this.storageService.secureStorage.removeItem('token');
      this.genericService.openLoginModal()


    } else {
      console.error(err);
    }
  }

  betStatus(resp, marketId) {
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


  GetMarketRates() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.marketIds.length > 0) {
        this.sportsService
          .marketsbook(this.marketIds.join(','), 'CompetitionMarketsComponent')
          .then((resp) => {
            if (resp && resp.length > 0) {
              resp.forEach((rate) => {
                let market = this.data?.competitions?.forEach((sports: any, indexx: any) => {
                  let m = sports.markets.filter(
                    (x: any) => x.marketId == rate.marketId
                  );
                  if (m && m.length > 0) {
                    // m[0].inplay = rate.inplay;
                    if (rate.inplay != undefined) {
                      m[0].inplay = rate.inplay;
                    }
                    if (rate.status == 'CLOSED') {
                      let indexToRemove = sports.markets.findIndex((obj: any) => obj.marketId == rate.marketId);
                      if (indexToRemove !== -1) {
                        let indexToRemoveID = this.marketIds.findIndex((id: any) => id == rate.marketId);
                        sports.markets.splice(indexToRemove, 1);
                        this.marketIds.splice(indexToRemoveID, 1);
                        if (sports.markets.length == 0) {
                          this.data.competitions.splice(indexx, 1)
                        }
                        sports.markets = [...sports.markets]
                      }
                    }
                    // m[0].totalMatched = SetAmount(rate.totalMatched, this.cTotalShare, this.cBuyRate);
                    // m[0].totalAvailable = SetAmount(rate.totalAvailable, this.cTotalShare, this.cBuyRate);
                    rate.runners?.forEach((runner: any) => {
                      let r = m[0].runners.filter(
                        (run: any) => run.selectionId == runner.selectionId
                      );
                      if (r && r.length > 0) {
                        if (
                          runner.ex.availableToBack &&
                          runner.ex.availableToBack.length > 0
                        ) {
                          r[0].back[0].price = runner.ex.availableToBack[0].price;
                          // r[0].back[0].size = SetAmount(runner.ex.availableToBack[0].size, this.cTotalShare, this.cBuyRate);
                        } else {
                          r[0].back[0].price = '';
                          r[0].back[0].size = '';
                        }
                        if (
                          runner.ex.availableToLay &&
                          runner.ex.availableToLay.length > 0
                        ) {
                          r[0].lay[0].price = runner.ex.availableToLay[0].price;
                          // r[0].lay[0].size = SetAmount(runner.ex.availableToLay[0].size, this.cTotalShare, this.cBuyRate);
                        } else {
                          r[0].lay[0].price = '';
                          r[0].lay[0].size = '';
                        }
                      }
                    });
                  }
                });
              });
            }
          })
          .catch((err) => {
            this.catchError(err)
          });
      }

    }
  }


  scoreData: any
  async GetScore() {
    if (navigator.onLine == true && document.hidden == false) {

      if (this.eventIds && this.eventIds.length > 0) {
        let eventIds = [...new Set(this.eventIds)];
        let scoreData = await this.utilsService.getScore(eventIds)
        if (scoreData && scoreData.length > 0) {
          this.scoreData = scoreData
          scoreData.forEach((s) => {
            this.data.competitions?.forEach((sp: DirectCopetitionMarket) => {
              let m = sp.markets?.filter((a: any) => a.version == s.eventId);
              if (m && m.length > 0) {
                m[0].score = s.score;
              }
            });
          });
        }
      }
    }
  }


}
