import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StorageService } from './storage.service';
import { BackendService, CasinoRequest } from './backend.service';
import { ClientParameters, ClientStake } from '../models/models';
import { ToastService } from './toast.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CheckAuthService } from './check-auth.service';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';
import { ModalService } from './model.service';

import {
  FancyModel,
  LocalMarketBet,
  SportsBettingModel, SportsBookModelSingle,
} from '../models/models';
import { MatDialog } from '@angular/material/dialog';
// import { MymarketsComponent } from '../sports/mymarkets/mymarkets.component';
import { WalletTimerService } from './timer.service';
import { BrowserService } from './browser.service';
import { PlatformService } from './platform.service';
@Injectable({
  providedIn: 'root'
})
export class UtillsService {
  bannerData: any = new BehaviorSubject(null);
  bankDetails: any = new BehaviorSubject(null);
  stakesValues: any = new BehaviorSubject(null);
  configData: any = new BehaviorSubject(null);
  currentBets: any = new BehaviorSubject(null);
  openBetModal: any = new BehaviorSubject(true);
  OCBEnabled: any = new BehaviorSubject(null);
  skeltonLoaderForMobi: any = new BehaviorSubject(true);
  bannerArray: any
  configArray: any
  depositLink: string = ''
  password: any = '';
  checkPin: number = 2;
  clientPhone: any = '';
  ipaddress: any = new BehaviorSubject(null);
  deviceInfo: any;
  providerModalArr: any;
  constructor(
    private deviceService: DeviceDetectorService,
    private storageService: StorageService,
    private sportsService: BackendService,
    private toasterService: ToastService,
    private genericService: GenericService,
    private router: Router,
    private modalService: ModalService,
    private bettingservice: BackendService,
    private dialogRef: MatDialog,
    private checkauthservice: CheckAuthService,
    private browserService: BrowserService,
    private platformService: PlatformService,

  ) {
    // console.log(' utills service constructor called ..........')
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (this.platformService.isBrowser()) {
      if (this.browserService.getWindow().providerModalArr) {
        this.providerModalArr =
          typeof this.browserService.getWindow().providerModalArr == 'string'
            ? JSON.parse(this.browserService.getWindow().providerModalArr)
            : this.browserService.getWindow().providerModalArr;
      }
    }
  }

  // // Don't Touch    ///////


  // ==================================Start Betting Methods ====================================================


  placeBet(r: any, looksabha?: boolean) {
    let keepAlive =
      this.storageService.getItem('keepAlive') == null
        ? false
        : this.storageService.getItem('keepAlive');
    let modellocal;
    if (r.bettingOn === 'Otherraces') {
      modellocal = {
        marketId: r.marketId,
        selectionId: r.selectionid,
        betType: r.betType,
        handicap: '0',
        price: r.price,
        size: r.size,
        keepAliveOn: false,
        version: 1,
      };
      return this.bettingservice
        .otherRacesPost(modellocal)

    }
    else if (r.bettingOn === 'LINE') {
      let price = parseInt(r.price) - 0.5
      modellocal = new SportsBettingModel(
        Number(r.eventId),
        r.marketId || '',
        r.selectionid,
        r.handicap,
        r.bType === 'back' ? 'lay' : 'back',
        price,
        r.size,
        keepAlive,
        0
      );
      modellocal.side = r.bType === 'back' ? 'LAY' : 'BACK';
      modellocal.keepAlive = keepAlive;
      return this.bettingservice
        .LocalMarketOrdersplaced(modellocal, 'PartialBetslipComponent')
    } else if (r.bettingOn === 'bm') {
      modellocal = new FancyModel(
        Number(r.eventId),
        r.marketId,
        r.selectionid,
        r.price,
        r.size,
        r.bType
      );
      return this.bettingservice
        .BookMakerOrdersplaced(looksabha, modellocal, 'PartialBetslipComponent')

    }

    else if (r.bettingOn === 'lotm') {
      modellocal = new FancyModel(
        Number(r.eventId),
        r.marketId,
        r.selectionid,
        r.price,
        r.size,
        r.bType
      );
      return this.bettingservice
        .LotteryOrdersplaced(modellocal, 'PartialBetslipComponent')

    }
    else if (r.bettingOn === 'fn') {
      modellocal = new FancyModel(
        Number(r.eventId),
        r.marketId,
        r.price,
        r.selectionid,
        r.size,
        r.bType
      );
      return this.bettingservice
        .FancyOrdersplaced(looksabha, modellocal, 'PartialBetslipComponent')
    }
    else if (r.bettingOn === 'sb') {
      modellocal = new SportsBookModelSingle(
        Number(r.eventId),
        r.marketId,
        Number(r.selectionid),
        Number(r.price),
        r.size,
        'BACK'
      );
      return this.bettingservice.SportsBookOrdersplacedSingle(modellocal)
    } else {
      modellocal = new LocalMarketBet(
        Number(r.eventId),
        r.marketId || '',
        r.selectionid,
        r.handicap,
        r.bType,
        r.price,
        r.size,
        keepAlive
      );
      return this.bettingservice
        .LocalMarketOrdersplaced(modellocal, 'PartialBetslipComponent')
    }
  }



  // ==================================End Betting Methods ====================================================



  // ==================================Calculate Whatif Start ====================================================


  calWhatIf(runners: any[], event: any) {
    const updateRunner = (
      r: any,
      isBack: boolean,
      isSelected: boolean,
      pl: number,
      stake: number
    ) => {
      if (r.position !== null && r.position !== undefined) {
        r.whatIf = isSelected
          ? r.position + (isBack ? pl : -pl)
          : r.position + (isBack ? -stake : stake);
      } else {
        r.whatIf = isSelected ? (isBack ? pl : -pl) : isBack ? -stake : stake;
      }
    };
    if (event.selectionID !== null) {
      const isBack = event.bType === 'back';
      const pl = event.pl;
      const stake = event.stake;
      const updateRunners = () => {
        runners.forEach((r: any) => {
          const isSelected = r.selectionId === event.selectionID;
          updateRunner(r, isBack, isSelected, pl, stake);

        });
      };
      updateRunners();
    } else {
      const clearWhatIf = () => {
        runners.forEach((r: any) => {
          r.whatIf = null;
        });
      };
      clearWhatIf();
    }
  }


  // ==================================Calculate Whatif End ====================================================



  /////// Wallet Call =====================//////




  /////// Wallet Call End =====================//////







  getBanners() {
    this.sportsService.GetBanners('darker_theme').subscribe(
      {
        next: d => {
          if (d) {
            if (Array.isArray(d)) {
              d.forEach((banner: any) => {
                if (Array.isArray(banner.data)) {
                  banner.data.forEach((bannerDetail: any) => {
                    if (bannerDetail.link.includes('casinos')) {
                      bannerDetail.link = bannerDetail.link.replace('casinos', 'casino')
                    }
                  })
                }
              })
            }
              this.skeltonLoaderForMobi.next(false)
            this.bannerData.next(Array.from(d));
            this.bannerArray = Array.from(d)
          }
        },
       error: (error) => this.skeltonLoaderForMobi.next(false),
      }
      )

    // }

  }

  errorMessage: boolean = false
  getDepositDetails() {
    this.sportsService
      .getDepositDetails('upi')
      .subscribe(
        {
          next: (data) => {
            this.bankDetails.next(Array.from(data))
            this.errorMessage = true
          },
           error: (error) =>  this.errorMessage = true
        }
        )
  }

  getConfig() {
    this.sportsService.getGetConfig().subscribe(data => {
      if (data) {
        let data2 = [
          {
            type: "PG",
            data: [
              {
                id: 3,
                link: 'deposit/instant'
              }
            ]

          }
        ]
        let pin: any = data.find((item) => item.type === 'WPIN');
        if (pin && pin.data && pin.data.length > 0) {
          this.checkPin = pin.data[0].id;
          this.clientPhone = pin.data[0].link;
        }
        let PGData: any = data.find((item) => item.type === 'PG');
        let id = PGData.data[0].id;
        let link = PGData.data[0].link;
        this.depositLink = link;
        if (id > 2) {
          this.depositLink = 'deposit/instant';
        }
        this.configData.next(Array.from(data));
        this.configArray = Array.from(data)
      }
    })

  }





  getIPAddress() {
    fetch('https://ipecho.net/plain')
      .then(response => response.text())
      .then(data => {
        this.ipaddress.next(data)
      })
      .catch(error => console.error('Error fetching IP address:', error));

  }
  getCurrentCountry() {
    const cookies = document.cookie;
    const cookieObj = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    let specificCookieValue = cookieObj["cf-ipcountry"];
    return specificCookieValue
  }


  getStackButtons() {
    this.sportsService.stakesGet("StakeButtonsComponent").subscribe((response: ClientStake) => {
      if (response) {
        this.stakesValues.next(response);
      }
    })
  }



  posterData: any

  whatsappForWithDrawOrDeposit(type: string) {

    let whatsAppPhoneNumber = this.configArray.find((item: any) => item.type == type);
    if (whatsAppPhoneNumber) {
      whatsAppPhoneNumber = whatsAppPhoneNumber.data[0].link.replace(/\s/g, "");
      if (whatsAppPhoneNumber.includes('http') || whatsAppPhoneNumber.includes('.t.me')) {
        window.open(whatsAppPhoneNumber.startsWith('http') ? whatsAppPhoneNumber : 'http://' + whatsAppPhoneNumber, "_blank");
      } else if (whatsAppPhoneNumber.startsWith('+')) {
        window.open('https://wa.me/' + whatsAppPhoneNumber, "_blank");
      }
    }
  }


  whatsappForCutomerSupprtOrId(type: string) {
    let whatsAppPhoneNumber = this.bannerArray.find((item: any) => item.type == type);
    if (whatsAppPhoneNumber) {
      whatsAppPhoneNumber = whatsAppPhoneNumber.data[0].link.replace(/\s/g, "")
      if (whatsAppPhoneNumber.includes('http') || whatsAppPhoneNumber.includes('.t.me')) {
        window.open(whatsAppPhoneNumber.startsWith('http') ? whatsAppPhoneNumber : 'http://' + whatsAppPhoneNumber, "_blank");
      } else if (whatsAppPhoneNumber.startsWith('+')) {
        window.open('https://wa.me/' + whatsAppPhoneNumber, "_blank");
      }
    }
  }

  socialLink(type: string, media: any) {
    let links = this.bannerArray.find((item: any) => item.type === type);
    if (links) {
      const item = links.data.find((items: any) => items.text == media)?.link;
      window.open(item, "_blank")
    }


  }
  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      return true;
    }
    else {
      return false
    }
  }


  returnFormatedData(data: any, type: string) {
    let findData = data.find((item: any) => item.type.replace(/\s+/g, '').toLowerCase() === type.replace(/\s+/g, '').toLowerCase());
    if (findData && findData.data.length && findData.data.length > 0) {
      return findData.data
    }
  }


  async getScore(allEventIds: any[]): Promise<any> {
    let response;
    try {
      let eventIds = [...new Set(allEventIds)];
      response = await this.sportsService.MultipleScore(eventIds.join(','), 'UpcomingComponent');
      return response; // Return the response
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }
  }

  getVirtualScoreFormatedWay(m) {
    // Step 1: Parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(m, 'text/html');
    const scoreElement: any = doc.querySelectorAll('.score');
    return scoreElement[0].innerHTML
  }

  openLoginModal() {
    this.genericService.openLoginModal();
  }

  openMyMartkesModal() {
    if (this.checkauthservice.IsLogin()) {
      // this.dialogRef.open(MymarketsComponent, {
      //   width: '700px',
      //   maxHeight: '70vh',
      //   maxWidth: '95vw',
      //   panelClass: 'my-markets-dialog',
      // });
    } else {
      this.openLoginModal()
    }
  }

  //   ===================>  code for run Games  <=============================





  routeToLink(item: any) {
    this.sportsService.gameUrl = undefined;
    if (item.text == 'My Market') {
      this.openMyMartkesModal()
    }
    else if (item.text == 'Sports Book') {
      if (this.checkauthservice.IsLogin()) {
        this.router.navigate([item.link]);
      } else {
        this.openLoginModal();
      }
    }
    else if (item.link.includes('detail')) {
      if (this.checkauthservice.IsLogin()) {
        let parts = item.link.split('/');
        let provider = parts[3];
        let gameCode = parts[4];
        let tableId = null;
        let gameId = null;
        if (gameCode.includes('?tableid=')) {
          let parts = gameCode.split('?');
          gameId = parts[0];
          tableId = parts[1].split('=')[1];
          this.routeToCasino(provider, gameId, false, tableId);
        } else {
          if (item.link.includes('/lobby')) {
            this.routeToLobby(provider);
          } else {
            this.routeToLobby(provider, gameCode);
          }
        }
      } else {
        this.openLoginModal();
      }
    } else {
      this.router.navigate([item.link]);
    }
  }

  routeToLiveCasino() {
    const queryParams = {
      type: 'live',
    };
    this.router.navigate(['/casino/detail/QTC/lobby'], { queryParams });
  }

  navigateToGame() {
    let casinoGameId: any = this.tempGameId;
    let casinoProvider: any = this.tempProvider;
    let tableId: any = this.tempTableId;
    if (casinoGameId && tableId) {
      const queryParams = {
        tableid: tableId,
      };
      this.router.navigate(
        ['/casino/detail/' + casinoProvider + '/' + casinoGameId],
        { queryParams }
      );
    } else if (casinoGameId == 'QTC') {
      this.router.navigate(['/casino/detail/' + casinoGameId + '/lobby']);
    } else if (casinoProvider == 'EZ') {
      this.router.navigate(['/casino/detail/' + casinoProvider + '/lobby']);
      return;
    } else if (casinoGameId) {
      this.router.navigate([
        '/casino/detail/' + casinoProvider + '/' + casinoGameId,
      ]);
    } else {
      this.router.navigate(['/casino/casino-games/' + casinoGameId]);
    }
  }

  routeToLobby(provider: string, gameid?: string) {
    //
    if (this.checkauthservice.IsLogin()) {
      if (gameid) {
        this.routeToCasino(provider, gameid, true);
        return;
      } else {
        this.router.navigate(['/casino/detail/' + provider + '/lobby']);
      }
    } else {
      let routerLink = '';
      if (gameid) {
        this.setRouteBeforeLogin(provider, gameid, '', '', routerLink);
      } else {
        routerLink = '/casino/detail/' + provider + '/lobby';
        this.setRouteBeforeLogin(provider, '', '', '', routerLink);
      }
      this.openLoginModal();
    }
  }



  isLiveCasino: boolean = false
  isCheckUrl: boolean = false
  tempProvider;
  tempGameId
  tempTableId
  openProviderModal(isLiveCasino?) {
    // this.isLiveCasino = isLiveCasino;
    // var elems = document.getElementById('provider-modal');

    // if (elems) {
    //   var model = M?.Modal?.init(elems);
    //   model.open();
    // }
  }
  routeToCasino(
    provider: any,
    gameId?: any,
    isCheckUrl: boolean = false,
    tableId?: any,
    menuItem = false,
    rummy = false
  ) {
    this.isCheckUrl = isCheckUrl;
    this.tempProvider = provider;
    this.tempGameId = gameId;
    this.tempTableId = tableId;
    this.isCheckUrl = isCheckUrl;
    //
    if (!this.checkauthservice.IsLogin()) {
      this.setRouteBeforeLogin(provider, gameId, tableId, isCheckUrl, '', menuItem, rummy);
      this.openLoginModal();
    } else {
      if (this.providerModalArr.includes(provider)) {
        this.openProviderModal();
        return;
      }
      this.loadCasino(provider, gameId, tableId);

    }
  }




  loadCasino(
    providerCode: string,
    gameId: string | undefined,
    tableId?: string | undefined
  ) {
    //
    this.sportsService.gameUrl = undefined;
    this.sportsService
      .sSCasino_POST(
        new CasinoRequest(
          providerCode,
          undefined,
          gameId,
          !this.checkauthservice.IsLogin(),
          this.deviceInfo.deviceType,
          undefined,
          tableId
        ),
      )
      .subscribe(
        {
          next: (x) => {
            if (x.url) {
              this.sportsService.gameUrl = x.url;
              this.navigateToGame();
            } else {
              let err =
                Object.keys(x.msg).length > 0
                  ? x.msg.message || x.msg
                  : x.msg || x.message;
              this.openMsgModal(err);
            }
          },
        error:(err) => {
          this.openMsgModal('');
          if (err.status == 401) {
            this.openLoginModal();
          } else {
            console.error(err);
          }
        }
        }


    )


  }
  openMsgModal(error) {
    this.toasterService.show(error, {
      classname: 'bg-danger text-light',
      delay: 1500,
    })
    // var elems = document.getElementById('msg-modal');
    // (document.getElementById('casinoErrorMessage') as any).innerHTML = error;
    // if (elems) {
    //   var model = M?.Modal?.init(elems);
    //   model.open();
    // }
    document.body.style.overflow = 'unset';
  }
  openGame(
    provider: any,
    gameId?: any,
    isCheckUrl: boolean = false,
    tableId?: any
  ) {
    if (!this.checkauthservice.IsLogin()) {
      this.setRouteBeforeLogin(
        provider,
        gameId,
        '',
        '',
        '',
        false,
        true
      );
      this.genericService.openLoginModal();
    } else {
      let data = {
        provider,
        gameId,
        isCheckUrl,
        tableId,
      };
      this.modalService.open(data);
    }
  }



  setRouteBeforeLogin(
    provider,
    gameId,
    tableId,
    isCheckUrl,
    routerLink,
    menuItem = false,
    rummy = false
  ) {
    let routeObj = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
      routerLink,
      menuItem: menuItem,
      rummy: rummy,
    };
    localStorage.setItem('routeCasino', JSON.stringify(routeObj));
  }

}
