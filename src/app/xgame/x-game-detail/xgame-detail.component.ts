// import { ClientWallet } from './../../services/sports.service';
import { ToastService } from './../../services/toaster.service';
import { ClientPosXgameInput, UserPosition, CurrentBetsGame, IOrderPlaceModel, OrderPlaceModel, Results, XGameCurrentBetsInput, XGameOrderCancelModel, XgameService, XgameInputModel } from './../../services/xgame.service';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Channel } from '../dataModel/channel';
// import { ClientParameters, SportsService } from '../../services/sports.service';
import { StorageService } from '../../services/storage.service';
import { MytimerService } from '../../services/mytimer.service';
import { LoginModalComponent } from '../../shared/login-modal/login-modal.component'
// import { CheckauthService } from '../../services/checkauth.service';
import { TranslateService } from '@ngx-translate/core';
import { CheckAuthService } from "../../services/check-auth.service";
import { _window } from "../../services/backend.service";
import { ClientWallet } from "../../models/models";
import { GenericService } from 'src/app/services/generic.service';
import { UtillsService } from 'src/app/services/utills.service';
import { WalletService } from 'src/app/services/wallet.service';
// import { _window } from '../../services/backend.service';

@Component({
  selector: 'app-xgame-detail',
  templateUrl: './xgame-detail.component.html',
  styleUrls: ['./xgame-detail.component.scss']
})
export class XGameDetailComponent implements OnInit, OnDestroy {
  sendingrequest: any = false;
  id: string | null;
  gameId: number = 0;
  marketid: number = 0;
  roundNo: number = 0;
  channelData: any;
  resultData: any;
  count: number = 0;
  showTable: boolean = false;

  currentBets: CurrentBetsGame[] = [];
  haveUnmatched = false;
  haveMatched = false;
  gameResult: any;
  marketLiab: any = 0;
  clientMatchSize: any;
  clientUnmatchSize: any;
  marketType = "";
  selectionType = "";
  readOnly: any;
  currencyCode = "";
  cBuyRate = 1;
  cTotalShare = 0;
  routersub: any;
  toasterMessage = '';
  interval: any;
  cancellingBet: any = false;
  ocb: any;
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private gameservice: XgameService,
    private toastService: ToastService,
    public router: Router,
    private utilsSerive: UtillsService,
    private storageService: StorageService,
    private elementRef: ElementRef,
    private timerservice: MytimerService,
    private checkauthservice: CheckAuthService,
    private genericService: GenericService,
    private walletService: WalletService

  ) {
    this.id = "";
    if (_window().xgtimer) {
      this.interval = _window().xgtimer;
    }
    if (this.checkauthservice.HaveStakes()) {
      this.cBuyRate = this.checkauthservice.cBuyRate;
      this.cTotalShare = this.checkauthservice.cTotalShare;
      this.currencyCode = this.checkauthservice.currencyCode;
    }





  }
  shortenLargeNumber(num: number, digits = 2) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
      decimal;

    for (var i = units.length - 1; i >= 0; i--) {
      decimal = Math.pow(1000, i + 1);

      if (num <= -decimal || num >= decimal) {
        return +(num / decimal).toFixed(digits) + units[i];
      }
    }
    if (num === 0) {
      return "";
    }
    return num;
  }

  otherGames: boolean = false
  bookApiCall: boolean = false;
  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.channelData = null
      this.timerservice.clearTimer();
      this.id = null;
      this.gameParams.gameId = 0;
      this.gameParams = {}
      this.gameParams.roundNo = 0;
      this.resultData = null;
      this.count = 0;
      this.showTable = false;
      this.currentBets = [];
      this.haveUnmatched = false;
      this.haveMatched = false;
      this.gameResult = null;
      this.marketLiab = null;
      this.clientMatchSize = null;
      this.clientUnmatchSize = null;
      this.marketType = "";
      this.selectionType = "";
      this.id = params.get('id');
      let id: any = this.id;
      this.otherGames = false
      this.bookApiCall = true
      if (this.gameIds.includes(id)) {
        this.otherGames = true
      }
      this.loading = true
      this.getDetail()
    });

  }

  loading: boolean = false;
  gameDetail: any = [];
  gameIds: string[] = ["1444086", "1444089", "1444116", "1444126", '1444093', '1444096']
  getDetail() {

    // if (navigator.onLine == true && document.hidden == false) {
    this.gameservice.gamedetail(parseInt(this.id || "")).then(resp => {
      // console.log("res",resp)
      this.gameDetail = resp
      if (resp && resp.length > 0) {
        this.loading = false
        if (resp[0].selectionType) {
          this.marketType = resp[0].selectionType;
          this.selectionType = resp[0].selectionType;
          this.GetBookData();
        }
      }
      this.loading = false
    }
    ).catch(err => {
      if (err.status == 401) {
        this.timerservice.clearTimer();

      } else {
        console.error(err);
      }
      this.loading = false
    });
    // }


  }

  gameParams: any = {}

  loadBets: boolean = false
  GetBookData() {
    this.timerservice.SetTimer(setInterval(() => {
      if (navigator.onLine == true && document.hidden == false) {
        this.CallMatchUnmatch();
        let body = {
          channelId: this.id,
          selectionType: this.gameDetail[0].selectionType
        }
        this.gameservice.book(body).then((resp) => {
          this.loading = false
          if (this.channelData) {
            if (this.bookApiCall) {
              this.channelData = null
              this.bookApiCall = false
            } else {
              this.channelData.update(resp.channel?.status.replace(/\s/g, "").toLowerCase(), resp.channel?.game, resp.channel?.id, resp.channel?.name.replace(/\s/g, "").toLowerCase(), resp.channel?.gameType);
            }
          } else {
            this.channelData = new Channel(resp.channel?.status.replace(/\s/g, "").toLowerCase(), resp.channel?.game, resp.channel?.id, resp.channel?.name.replace(/\s/g, "").toLowerCase(), resp.channel?.gameType);
          }

          if (this.channelData) {
            this.gameParams = {
              id: this.channelData.id,
              roundNo: this.channelData.game.round,
              marketsIds: this.channelData.game.markets.markets.map((market: any) => market.id),
              gameId: this.channelData.game.id
            }
            // console.log("chnanel data ",this.channelData)
            if (!this.loadBets) {
              this.loadBets = true;
              this.channelData.game.markets.markets.forEach((market: any) => {
                this.GetcurrentBets(this.gameParams.gameId, parseInt(this.id || ""), market.id, this.gameParams.roundNo);
              })
            }
          }

        }).catch(er => {
          console.log("err=>>>>>>>>>>>>", er)
          this.toastService.show(er.message.replace("_", " "), { classname: 'bg-danger text-light', delay: 15000 });
        }).catch((err) => {
          if (err.status == 401) {
            this.timerservice.clearTimer();


          } else {
            console.error(err);
          }
        });;
      }
    }, this.interval));
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
    this.timerservice.clearTimer();
  }
  currentBetsFun() {
    if (this.channelData && this.channelData.game) {
      this.channelData.game.markets.markets.forEach((market: any) => {
        this.GetcurrentBets(this.gameParams.gameId, parseInt(this.id || ""), market.id, this.gameParams.roundNo);
      })
    }
  }

  CancelSingleBet(marketid: string, roundNo: number, betid: string, currencyCode: string) {
    // if (navigator.onLine == true && document.hidden == false) {
    this.cancellingBet = true;
    let b = this.currentBets.filter(x => x.betId == betid);
    if (b && b.length == 1) {
      b[0].pending = true;
    }
    let m = new XGameOrderCancelModel(marketid, roundNo, currencyCode, Array(1).fill(betid))
    this.gameservice.CancelOrdersXgame(m).then(resp => {
      if (resp.status) {
        // const translatedResponse = this.toasterTranslationMethod(resp.message);
        this.toastService.show(resp.message.replace("_", " "), 'bg-success text-light');
        this.currentBetsFun();
      } else {
        // const translatedResponse = this.toasterTranslationMethod(resp.message);
        this.toastService.show(resp.message.replace("_", " "), 'bg-danger text-light');
      }
      this.cancellingBet = false;
    }).catch(
      err => {
        if (err.status == 401) {
          this.timerservice.clearTimer();


        } else {
          console.log(err)
          this.toastService.show(err, { classname: 'bg-danger text-light' });
        }
      }
    ).finally(() => this.cancellingBet = false);
    // }
  }


  GetcurrentBets(GameId: number, ChannelId: number, MarketId: number, RoundNo: number) {
    // if (navigator.onLine == true && document.hidden == false) {
    if (this.checkauthservice.IsLogin()) {
      this.sendingrequest = true;
      let m: XGameCurrentBetsInput = new XGameCurrentBetsInput(GameId, MarketId, ChannelId, RoundNo);
      this.gameservice.CurrentbetsXGame(m).then((resp: CurrentBetsGame[]) => {
        this.currentBets = resp;
        if (resp.some(x => x.betStatus == "Un-Matched Bets")) {
          this.haveUnmatched = true;
        }
        if (resp.some(x => x.betStatus == "Matched Bets")) {
          this.haveMatched = true;
        }
        this.GetWalletXgame();
        this.GetXgameUserPosition();
      }).catch(
        err => {
          if (err.status == 401) {
            this.timerservice.clearTimer();

          } else {
            console.error(err);
            this.toastService.show(err, { classname: 'bg-danger text-light' });
          }
        }
      ).finally(() => {
        this.sendingrequest = false;
      });
    }
    // }
  }

  CallMatchUnmatch() {
    // if (navigator.onLine == true && document.hidden == false) {

    if (this.checkauthservice.IsLogin()) {
      if (this.channelData && this.channelData.game) {
        this.channelData.game.markets.markets.forEach((market: any) => {

          this.gameservice.MatchUnmatchXG(new XgameInputModel(this.channelData.game.id, market.id, this.channelData.id))
            .then(resp => {

              if (
                this.clientMatchSize !== resp.matchedSize ||
                this.clientUnmatchSize !== resp.unMatchedSize
              ) {
                this.GetWalletXgame();
                this.GetXgameUserPosition();
                this.currentBetsFun();

                this.clientMatchSize = resp.matchedSize;
                this.clientUnmatchSize = resp.unMatchedSize;
              }

            })
            .catch(err => {
              if (err.status == 401) {
                this.timerservice.clearTimer();


              } else {
                console.error(err);
              }
            });

        });
      }
    }
    // }
  }

  GetWalletXgame() {
    // if (navigator.onLine == true && document.hidden == false) {
    if (this.channelData && this.channelData.game) {
      this.channelData.game.markets.markets.forEach((market: any) => {
        this.gameservice.walletXgame(market.id).then((resp: ClientWallet) => this.HandleWallet(resp))
          .catch(err => {
            if (err.status == 401) {
              this.timerservice.clearTimer();


            } else {
              console.error(err);
            }
          });
      })
    }
  }
  HandleWallet(resp: ClientWallet): any {
    this.walletService.walletDetail.next(resp)
    if (resp) {
      if (this.channelData && this.channelData.game) {
        this.channelData.game.markets.markets.forEach((market: any) => {
          market.liability = resp.marketLiability;

        })
      }
    }
  }
  GetXgameUserPosition() {
    // if (navigator.onLine == true && document.hidden == false) {
    if (this.channelData && this.channelData.game) {
      this.channelData.game.markets.markets.forEach((market: any) => {
        this.gameservice.ClientPositionXgame(new ClientPosXgameInput(this.channelData.game.id, this.channelData.id, market.id))
          .then((resp: UserPosition[]) => this.HandleUserPosition(resp))
          .catch(err => {
            if (err.status == 401) {
              this.timerservice.clearTimer();


            } else {
              console.error(err);
            }
          });
      });

    }
  }

  HandleUserPosition(resp: UserPosition[]): any {
    if (this.channelData && this.channelData.game) {
      if (resp && resp.length > 0) {
        resp.forEach((r: UserPosition) => {
          let mkt = this.channelData.game.markets.markets.filter((m: any) => m.id == r.marketId);
          if (mkt && mkt.length > 0) {
            let f = mkt[0].selections.selections.filter((x: any) => x.id == r.runnerId);
            if (f && f.length > 0) {
              f[0].position = r.position == 0 ? undefined : r.position;
              f[0].rPosition = r.rPosition == 0 ? undefined : r.rPosition;
            }
          }

        });
      } else {
        if (this.channelData && this.channelData.game) {
          this.channelData.game.markets.markets.forEach((market: any) => {
            market.liability = 0;
            market.selections.selections.forEach((sel: any) => {
              sel.position = undefined;
              sel.rPosition = undefined;
            });
          });
        }
      }
    }
  }


  openScrollableContent(longContent: any) {
    // this.modalService.open(longContent, { size: 'xl', backdropClass: 'light-blue-backdrop' });
  }
  GetResult(result: any) {
    // if (navigator.onLine == true && document.hidden == false) {
    this.gameservice.result(new Results(parseInt(this.id || ""), 0, 5)).then(resp => {

      if (resp.channel) {
        this.gameResult = resp.channel;
        // this.modalService.open(result, { size: 'xl', backdropClass: 'light-blue-backdrop' });
      } else {
        this.toastService.show(JSON.stringify(resp));
      }
    }).catch((err) => {
      console.log(err)
    });
    // }
  }
  createBet(id: number, c: string, p: number, s: any, type: string, r: number, comm: number, gameid: number, stype: string, selectionType: string) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
      return;
    }
    if (this.channelData && this.channelData.game && this.channelData.game.markets && this.channelData.game.markets.markets) {
      let filters = this.channelData.game.markets.markets.filter((a: any) => a.id == id);
      if (filters && filters.length > 0) {
        filters[0].selections.selections.forEach((element: any) => {
          element.betslip = null;
        });
      }
    }
    let btn = this.checkauthservice.getstaks()
    s.betslip = { selectionid: s.id, marketId: id, marketType: stype, currency: c, price: p, size: btn.stakeVal2, bType: type, roundNo: r, commission: comm, gameId: gameid, stakeButtons: btn, selectionType: selectionType };

    //#region One Click Bet

    this.ocb = this.storageService.secureStorage.getItem('OCB');
    if (this.ocb) {
      s.betslip.size = this.storageService.secureStorage.getItem('OCBSelectedVal');
      this.pb(s);
    }

    //#endregion

  }
  pbpl: boolean = false;
  pb(s: any) {
    // if (navigator.onLine == true && document.hidden == false) {
    this.pbpl = true;
    let marketId = s.betslip.marketId
    if (s.betslip) {
      let m: IOrderPlaceModel = {
        selectionId: s.betslip.selectionid,
        channelId: parseInt(this.id || ""),
        roundNo: s.betslip.roundNo,
        marketId: s.betslip.marketId,
        price: parseFloat(s.betslip.price),
        size: s.betslip.size,
        betType: s.betslip.bType.toUpperCase(),
        currency: s.betslip.currency,
        keepAlive: false,
        gameId: s.betslip.gameId,
        selectionType: s.betslip.selectionType,
        commissionRate: s.betslip.comm,
        marketType: s.betslip.marketType
      };
      this.gameservice.ordersplacedPost(new OrderPlaceModel(m)).then(resp => {
        s.betslip = null;
        this.pbpl = false;

        this.GetcurrentBets(this.gameParams.gameId, parseInt(this.id || ""), marketId, this.gameParams.roundNo);
        const translatedResponse = this.toasterTranslationMethod(resp.message);
        this.toastService.show(translatedResponse, { classname: 'bg-success text-light', delay: 10000 });

      }).catch((err) => {

        if (err.response.message) {
          this.toastService.show(err.response.message, { classname: 'bg-danger text-light', delay: 1500 });
        }

        if (err.status == 401) {
          this.timerservice.clearTimer();



        } else {
          const translatedResponse = this.toasterTranslationMethod(err);
          console.error(err)
          this.toastService.show(translatedResponse, {
            classname: 'bg-danger text-light',
            delay: 1500,
          });
        }
      });
    }
    // }
  }

  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    // resp = 'Only 0.20 decrement is allowed for unmatch in (LAY).';
    if (resp.substring('</br>')) {
      resp = resp.replace(' </br>', '');
    }
    resp = resp.split(/(\d+)/);
    if (resp.length) {
      for (let i = 0; i < resp.length; i++) {
        if (isNaN(resp[i])) {
          this.translate.get(resp[i]).subscribe((res: string) => {
            this.toasterMessage = this.toasterMessage + res;
          });
        } else {
          this.toasterMessage = this.toasterMessage + resp[i];
        }
      }
    } else {
      this.translate.get(resp).subscribe((res: string) => {
        this.toasterMessage = res;
      });
    }
    return this.toasterMessage;
  }

}


