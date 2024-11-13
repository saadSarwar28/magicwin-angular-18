import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  BettingResponse,
  ClientPosition,
  CurrentBetsInput,
  LocalMarketBet,
  MarketCatalogueSS,
  MarketRunners,
  SportsBettingModel,
} from 'src/app/models/models';
import { _window, BackendService } from 'src/app/services/backend.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import {
  SetAmount,
  shortenLargeNumber,
} from 'src/app/services/shortenLargeNumber';
import { SportService } from 'src/app/services/sport.service';
import { StorageService } from 'src/app/services/storage.service';
import { TimerService } from 'src/app/services/timer.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtillsService } from 'src/app/services/utills.service';
import { iFrameResizer } from 'src/assets/lmtScore/sports-radar';

@Component({
  selector: 'app-current-sports',
  templateUrl: './current-sports.component.html',
  styleUrls: ['./current-sports.component.scss'],
})
export class CurrentSportsComponent implements OnInit {
  sportList: any;
  tmpSportList: any;
  marketIds: any;
  cBuyRate: any;
  lineData: any;
  loadingData: boolean = false;
  //#region oneclickbet
  isOneClickBetGlobal: boolean = false;
  //#endregion
  localMarketRate: number = 1;

  intervalTimer: any;

  IPAddress: string = '';
  liveTvUrl: any = '';
  constructor(
    private sportsService: SportService,
    private sportService: BackendService,
    private checkauthservice: CheckAuthService,
    private timerService: TimerService,
    private router: Router,
    private storageService: StorageService,
    private utillsService: UtillsService,
    private sanitizer: DomSanitizer,
    private toasterService: ToastService
  ) {
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
  }

  ngOnInit(): void {
    if (_window().crickettimer) {
      this.intervalTimer = _window().crickettimer;
    }
    this.localMarketRate = _window().locMarketRates
      ? _window().locMarketRates
      : 1;
    this.getMySports();
    this.getIpAddress();
  }

  getMySports() {
    if (this.checkauthservice.IsLogin()) {
      this.loadingData = true;
      this.sportsService
        .getMySports()
        .then((res) => {
          if (res && res.length > 0) {
            this.tmpSportList = res;
            this.sportList = this.getSportListGroupByVersionId();
            this.marketIds = res?.map((item) => item.marketId);
            this.GetMarketRates();
            this.timerService.SetTimer(
              setInterval(() => {
                this.GetMarketRates();
              }, this.intervalTimer)
            );
          }
        })
        .catch((err) => {
          if (err.status == 401) {
            this.router.navigate(['/']);
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          this.loadingData = false;
        });
    } else {
      this.router.navigate(['home']);
    }
  }

  GetMarketRates() {
    if (this.marketIds?.length <= 0) return;
    let uniq: any = [...new Set(this.marketIds)];
    this.sportService
      .directMarketsbook(uniq.join(','), 'CricketComponent')
      .then((resp) => {
        resp?.forEach((md: any) => {
          // let totalshare = this.GetClientParams(md.marketId);
          let totalshare = 1;
          try {
            md?.runners?.forEach((runner: any) => {
              let currentSport;
              let currentSports = this.sportList?.filter((x) =>
                x.details?.find((x) => x.marketId == md?.marketId)
              );
              if (currentSports?.length > 0) {
                currentSport = currentSports[0];
                currentSport.inplay = md.inplay;
                currentSport.status = md.status;
                currentSport.totalMatched = md.totalMatched;
                // if (md.status == 'CLOSED') {
                //    clearInterval(this.source);
                // }

                let selectionRunnerList = this.getRunnersBySelectionId(
                  currentSport,
                  runner.selectionId
                );
                let r = selectionRunnerList?.filter(
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
                    SetAmount(runner.totalMatched, totalshare, this.cBuyRate)
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
              }
            });

            if (this.lineData) {
              let m = this.lineData.filter(
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
          } catch (error) {
            console.error(error);
          }
        });
      })
      .catch((err) => {
        if (err.status == 401) {
          this.timerService.clearTimer();
          this.storageService.secureStorage.removeItem('token');
          window.location.href = window.location.href;

        } else {
          console.log(err);
        }
      })
      .finally(() => { });
  }

  getRunnersBySelectionId(data, targetSelectionId) {
    for (let detail of data?.details) {
      // console.log(`Checking detail: ${detail.marketType}`);
      for (let runner of detail.runners) {
        // console.log(`Checking runner with selectionId: ${runner.selectionId}`);
        if (runner.selectionId === targetSelectionId) {
          // console.log('Match found!');
          return detail.runners;
        }
      }
    }
    return null; // If no matching runner is found
  }

  LoadCurrentBets(sport) {
    if (this.checkauthservice.IsLogin()) {
      // this.sportList?.forEach((sport) => {
      this.loadingData = true;
      this.sportService
        .SportsCurrentbets(
          new CurrentBetsInput(
            sport?.isLocalMarket
              ? sport?.marketId.replace('1.', '10.')
              : sport?.marketId,
            sport.version,
            false
          ),
          'CricketComponent'
        )
        .then((resp) => {
          // this.haveUnmatched = false;
          // this.utillsService.currentBets.next({
          //   bets: resp,
          //   eventId: this.eventId,
          // });

          // if (resp && resp.length > 0) {
          //   this.currentBets = resp;
          //   if (resp.some((x) => x.betStatus == 'Un-Matched Bets')) {
          //     this.haveUnmatched = true;
          //   }
          //   if (resp.some((x) => x.betStatus == 'Matched Bets')) {
          //     this.haveMatched = true;
          //   }
          // }
          // this.currentBets = resp;
          sport.myMatchBets = resp?.filter(
            (x) => x.betStatus == 'Matched Bets'
          );
          sport.myUnMatchBets = resp?.filter(
            (x) => x.betStatus == 'Un-Matched Bets'
          );
        })
        .catch((err) => {
          if (err.status == 401) {
            this.router.navigate(['/']);
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          this.loadingData = false;
        });
      // });
    } else {
      this.router.navigate(['home']);
    }
  }

  clickToMarket(sport) {
    this.router.navigate([sport?.routerLink]);
  }

  //#region for betplace
  betPlace(
    sport: any,
    r: MarketRunners,
    type: string,
    index: number,
    isLocalMarket = false,
    detailSport: any
  ) {
    if (!this.checkauthservice.IsLogin()) {
      this.router.navigate(['/']);
      return;
    }
    if (
      this.storageService.secureStorage.getItem('OCB') &&
      this.isOneClickBetGlobal
    ) {
      let betSize = this.storageService.secureStorage.getItem('OCBSelectedVal');
      this.oneClickpb(
        sport?.marketId,
        r.selectionId,
        r.handicap,
        type,
        type == 'back' ? r.back[index].price : r.lay[index].price,
        betSize,
        detailSport?.marketType,
        sport?.description?.bettingType,
        isLocalMarket ? 'local' : 'bf',
        sport
      );
    } else {
      sport.cashout = false;
      sport.betslip = null;
      this.clearPreviousBetSlip(sport);
      let btn = this.checkauthservice.getstaks();
      r.betslip = {
        eventId: sport?.version,
        marketId: sport?.marketId,
        selectionid: r.selectionId,
        name: r.runnerName,
        handicap: r.handicap,
        price: type == 'back' ? r.back[index].price : r.lay[index].price,
        size: btn.stakeVal2,
        bType: type,
        stakeButtons: btn,
        bettingOn: isLocalMarket ? 'local' : 'bf',
        bettingType: sport?.description?.bettingType,
        marketType: detailSport?.marketType,
        linerange: sport?.description?.lineRangeInfo,
        minBet: sport?.minSettings,
        maxBet: sport?.maxSettings * this.localMarketRate,
      };
    }
  }

  oneClickpb(
    mktId: any,
    selectionId: any,
    handicap: any,
    bType: string,
    price: any,
    size: any,
    mktType: any,
    bettingType: any,
    betOn: string,
    sport: any
  ) {
    if (price == null || price == 0 || price == '') {
      this.toasterService.show('Please enter the odds value', {
        classname: 'red accent-3 text-light',
        delay: 3000,
        sound: true,
      });
      return;
    }
    // this.startBetting(bettingType);
    let betstatus = false;

    switch (betOn) {
      case 'local':
        let modellocal;
        if (mktType === 'LINE' || bettingType === 'LINE') {
          price = price ? parseInt(price) - 0.5 : price;
          modellocal = new SportsBettingModel(
            Number(sport?.version),
            mktId || '',
            selectionId,
            handicap,
            bType === 'back' ? 'lay' : 'back',
            price,
            Number(size),
            false,
            0
          );
          modellocal.side = bType === 'back' ? 'LAY' : 'BACK';
          modellocal.keepAlive = `${false}`;
        } else {
          modellocal = new LocalMarketBet(
            Number(sport?.version),
            mktId || '',
            selectionId,
            handicap,
            bType,
            price,
            Number(size),
            false
          );
        }
        this.loadingData = true;
        this.sportService
          .LocalMarketOrdersplaced(modellocal, 'PartialBetslipComponent')
          .then((resp: BettingResponse) => {
            betstatus = resp.status;
            const translatedResponse = resp.message;
            if (betstatus) {
              this.toasterService.show(translatedResponse, {
                classname: 'bg-success text-light',
                delay: 4000,
                sound: true,
              });
              this.LoadCurrentBets(sport);
            } else {
              this.toasterService.show(translatedResponse, {
                classname: 'red darken-1 text-light',
                delay: 4000,
                sound: true,
              });
            }
            // this.stopBetting(bettingType);
            let overly = document.getElementById('overlay');
            if (overly?.style.display === 'block') {
              overly.style.display = 'none';
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              this.router.navigate(['/']);
              this.storageService.secureStorage.removeItem('token');
              window.location.href = window.location.origin;
            } else {
              console.log(err);
              this.toasterService.show(err, {
                classname: 'red darken-1 text-light',
                delay: 1500,
                sound: true,
              });
            }
            // this.stopBetting(bettingType);
          })
          .finally(() => {
            this.loadingData = false;
            this.betPlacedStatus('yes', sport);
            // this.stopBetting(bettingType);
          });
        break;
      case 'bf':
        let model;
        if (mktType === 'LINE' || bettingType === 'LINE') {
          price = price ? parseInt(price) - 0.5 : price;
          model = new SportsBettingModel(
            Number(sport?.version),
            mktId || '',
            selectionId,
            handicap,
            bType === 'back' ? 'lay' : 'back',
            price,
            Number(size),
            false,
            0
          );
          model.side = bType === 'back' ? 'LAY' : 'BACK';
          model.keepAlive = `${false}`;
        } else {
          model = new SportsBettingModel(
            Number(sport?.version),
            mktId || '',
            selectionId,
            handicap,
            bType,
            price,
            Number(size),
            false,
            0
          );
          model.side = bType;
          model.keepAlive = `${false}`;
        }
        this.loadingData = true;
        this.sportService
          .SportsOrdersplaced(model, 'PartialBetslipComponent')
          .then((resp: BettingResponse) => {
            betstatus = resp.status;
            // this.stopBetting(bettingType);
            const translatedResponse = resp.message;
            if (betstatus) {
              this.toasterService.show(translatedResponse, {
                classname: 'bg-success text-light',
                delay: 4000,
                sound: true,
              });
              this.LoadCurrentBets(sport);
            } else {
              this.toasterService.show(translatedResponse, {
                classname: 'red darken-1 text-light',
                delay: 4000,
                sound: true,
              });
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              this.router.navigate(['/']);
            } else {
              console.log(err);
              this.toasterService.show(err, {
                classname: 'red darken-1 text-light',
                delay: 1500,
                sound: true,
              });
            }
            // this.stopBetting(bettingType);
          })
          .finally(() => {
            this.loadingData = false;
            this.betPlacedStatus('yes', sport);
            // this.stopBetting(bettingType);
          });
        break;
    }
  }

  betPlacedStatus(event, sport) {
    if (event == 'yes') {
      this.clearPreviousBetSlip(sport);
      this.getClientPosition(sport);
      this.reloadMyBet(sport);
    }
  }

  reloadMyBet(sport) {
    this.LoadCurrentBets(sport);
  }
  clearPreviousBetSlip(sport) {
    sport?.details?.forEach((detail) => {
      detail?.runners?.forEach((r: any) => (r.betslip = null));
    });
  }
  //#endregion

  getClientPosition(sport) {
    const marketIds = sport?.details?.map((item) => item.marketId);

    this.sportService
      .clientpositionsports(marketIds.toString(), 'CricketComponent')
      .then((resp: ClientPosition[]) => {
        resp?.forEach((p: any) => {
          let runners = sport?.details?.find((x) => x.marketId == p.marketId);

          let currentRunner = runners?.runners?.find(
            (x) => x.selectionId == p.runnerId
          );

          if (currentRunner && p.position) {
            currentRunner.position = p.position;
          }
        });
      })
      .catch((err) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        } else {
          console.log(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
  }

  getSportListGroupByVersionId() {
    const groupedMarkets: any[] = [];
    const versionMap: Map<number, any> = new Map();

    this.tmpSportList?.forEach((market: any) => {
      if (!versionMap.has(market.version)) {
        const newGroup = {
          status: market.status,
          marketName: market.marketName,
          numberOfWinner: market.numberOfWinner,
          inplay: market.inplay,
          stopBet: market.stopBet,
          marketStartTime: market.marketStartTime,
          version: market.version,
          minSettings: market.minSettings,
          maxSettings: market.maxSettings,
          maxMarketSettings: market.maxMarketSettings,
          routerLink: market.routerLink,
          channelId: market.channelId,
          marketId: market.marketId,
          details: [],
        };
        versionMap.set(market.version, newGroup);
        groupedMarkets.push(newGroup);
      }

      const currentGroup = versionMap.get(market.version);
      currentGroup.details.push({
        marketId: market.marketId,
        runners: market.runners,
        marketType: market.marketType,
      });
    });

    return groupedMarkets;
  }

  GetMarketDetail(sport) {
    if (sport?.marketId)
      this.sportService
        .marketdetail(sport?.marketId, 'CricketComponent')
        .then((resp) => {
          if (resp) {
            if (resp?.event?.matchId) {
              this.GetLMT(resp.event.matchId, sport);
            }
          }
        })
        .catch((err) => {
          if (err.status == 401) {
            this.storageService.secureStorage.removeItem('token');
            window.location.href = window.location.href;
          } else {
            console.log(err);
          }
        })
        .finally(() => { });
  }

  getStream(sport) {
    if (sport?.channelId && this.IPAddress) {
      let liveTvUrl =
        _window().streamurl + `?chid=${sport.channelId}&ip=${this.IPAddress}`;
      sport.liveTvUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(liveTvUrl);
    }
  }

  getIpAddress() {
    this.utillsService.ipaddress.subscribe((data) => {
      if (data) {
        this.IPAddress = data;
      }
    });
  }

  GetLMT(id: any, sport) {
    if (id && id > 0) {
      let themeMode;
      themeMode =
        this.storageService.secureStorage.getItem('theme') === 'darker_theme'
          ? 'd'
          : 'l';
      let lmtUrl = _window().lmtscorecard + `Id=${id}&t=${themeMode}`;
      sport.lmtUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lmtUrl);
    }

    iFrameResizer('stats');
  }
}
