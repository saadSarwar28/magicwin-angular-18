import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  BackendService,
  CasinoRequest,
  _window,
} from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ToastService } from '../../services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { casinoRoutes, otherCasinoRoutes } from "../casino-routes";
import { UtillsService } from "../../services/utills.service";
import { GenericService } from "../../services/generic.service";
import { CustomMessageModalComponent } from "../custom-message-modal/custom-message-modal.component";
import { ProviderModalComponent } from "../../shared/provider-modal/provider-modal.component";

@Component({
  selector: 'app-casino-twenty-four-seven',
  templateUrl: './casino-twenty-four-seven.component.html',
  styleUrls: ['./casino-twenty-four-seven.component.scss', './../casino-footer.component.scss'],
  animations: [
    trigger('rotateArrow', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', animate('400ms ease-in-out')),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('400ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CasinoTwentyFourSevenComponent implements OnInit, AfterViewInit {
  showVS: any = false;
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);
  evoProvider: any = 'EZ';
  ezProvider: any = 'EZ';
  tempGameDetail: any = {};
  isMobileView: boolean = false;
  providerModalArr: string[] = [];
  @ViewChild('contentQtc', { static: true }) contentQtc: ElementRef | undefined;
  isLobby!: boolean;
  isAuraShow: boolean = false;
  updateSearchResult$!: any;
  scrollAndSearch$: any;
  cdnSportsLanding: any
  isIndianGames: boolean = false
  isDragonTiger: boolean = false
  isLightening: boolean = false
  gameLoader: any;
  footers: any
  isAllGames: boolean = true;
  casinosArr: any[] = [];
  isShowFavourite: boolean = false;

  data: any;
  loading = true;
  iframurl: any;
  interval: any;
  imgUrl: any;
  isLoggedIn = false;
  deviceInfo: any;
  toasterMessage: any;
  selectedIndex = 0;
  dataIndex: any;
  gameNameData: string = '';
  totalNumberofGames: Number = 0;
  defaultImage: string =
    ' https://iriscdn.b-cdn.net/CasinoImages/preloader.svg';
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  catagorys = [
    'KENO',
    'VIRTUAL_CASINO',
    'LIVECASINO',
    'LOTTERY',
    'SLOT',
    'SCRATCHCARD',
    'TABLEGAME',
    'VIDEOPOKER',
    'VIRTUAL_SPORTS',
    'INSTANTWIN',
    'SHOOTING',
  ];
  toggleGamePro: boolean[] = [];
  toggleFooter: boolean[] = [];
  visibleImages: any[] = [];
  myScrollContainer!: HTMLElement;
  bannerCdn = ''

  constructor(
    private sportservice: BackendService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    // private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private toasterService: ToastService,
    public modalService: ModalService,
    private genericService: GenericService,
    private elmRef: ElementRef,
    private utillsService: UtillsService
  ) {
    this.myScrollContainer = this.elmRef.nativeElement.querySelector(
      '#my-scroll-container'
    );
    if (_window().gameLoader) {
      this.gameLoader = _window().gameLoader;
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().bannercdnLanding) {
      this.bannerCdn = _window().bannercdnLanding
    }
    if (_window().isAuraShow) {
      this.isAuraShow = _window().isAuraShow;
    }
    if (_window().isShowFavourites) {
      this.isShowFavourite = _window().isShowFavourites;
    }
    if (_window().EVOprovider) {
      this.evoProvider = _window().EVOprovider;
    }
    if (_window().EZprovider) {
      this.ezProvider = _window().EZprovider;
    }
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    // this.loading = false;
    this.isLoggedIn = this.checkauthservice.IsLogin();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.router.events.subscribe((event: any) => {
      if (event.urlAfterRedirects) {
        this.modalService.close()
        this.isAllGames = event.urlAfterRedirects.includes('all')
        this.isIndianGames = event.urlAfterRedirects.includes('IND') || event.urlAfterRedirects.includes('indian')
        this.isDragonTiger = event.urlAfterRedirects.toLowerCase().includes('dragon')
        this.isLightening = event.urlAfterRedirects.toLowerCase().includes('lightning')
      }
    })
  }

  toggleImages(index: number): void {
    // Toggle the state of the clicked group
    this.toggleGamePro[index] = !this.toggleGamePro[index];

    // Collapse all other groups
    for (let i = 0; i < this.toggleGamePro.length; i++) {
      if (i !== index) {
        this.toggleGamePro[i] = false;
      }
    }
  }

  setGameName(item: any) {
    if (item === 'Aabbcc') {
      return 'Exclusive';
    }
    if (item === 'Instantwin') {
      return 'Crash Games';
    }
    if (item === 'Mp') {
      return 'Multiplayer';
    }
    if (item === 'Inggames') {
      return 'Indian Casino';
    }
    if (item === 'Livecasino') {
      return 'Live Casino';
    }
    if (item === 'Andar_bahar') {
      return 'Andar Bahar';
    }
    if (item === 'Tablegame') {
      return 'Table Games';
    }
    if (item === 'All') {
      return 'All Casinos';
    }

    return item;
  }

  favouriteGames = new Set<any>();

  toggleFavourite(subitem: any) {
    if (this.favouriteGames.has(subitem.GameCode)) {
      let gameCode = subitem?.GameCode?.split('?')[0];
      this.setfavouiteCasino(0, gameCode);
      this.favouriteGames.delete(subitem?.GameCode);
    } else {
      let gameCode = subitem?.GameCode?.split('?')[0];
      this.setfavouiteCasino(1, gameCode);
    }
  }

  isFavorite(GameCode: string): boolean {
    return this.favouriteGames.has(GameCode);
  }

  setProperName(item: any) {
    if (item === 'Instantwin') {
      return 'Crash Games';
    }
    if (item === 'Mp') {
      return 'Multiplayer';
    }
    if (item === 'Inggames') {
      return 'Indian Casino';
    }
    if (item === 'Livecasino') {
      return 'Live Casino';
    }
    if (item === 'Andar_bahar') {
      return 'Andar Bahar';
    }
    if (item === 'Tablegame') {
      return 'Table Games';
    }
    if (item === 'All') {
      return 'All Casinos';
    }
    return item;
  }

  routeToLink(link: string) {
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate([link])
    } else {
      this.genericService.openLoginModal()
    }
  }

  routeCustomLink(type: any) {
    // console.log(type, ' <<<<<<<< game type')
    let typeGame = type.data[0].gameType;
    if (typeGame == 'Indian Casino') {
      this.router.navigate([`/casino/indian-games`]);
      return;
    }
    if (typeGame == 'Popular Games') {
      this.router.navigate([`/casino/catagory/popular`]);
      return;
    }
    if (typeGame == 'Multiplayer Games') {
      this.router.navigate([`/casino/catagory/multiplayer`]);
      return;
    }
    if (typeGame == 'Live Casino') {
      this.router.navigate([`/casino/catagory/live-casino`]);
      return;
    }
    if (typeGame == 'Shooting Games') {
      this.router.navigate([`/casino/catagory/shooting-games`]);
      return;
    }
    if (typeGame == 'Scratch Games') {
      this.router.navigate([`/casino/catagory/scratch`]);
      return;
    }
    // console.log(typeGame, ' <<<<<<<<<<<<<<<<<<<<<<<<< TYPE OF GAME +++++++++++++++++++++ ')
    casinoRoutes.forEach((route: any) => {
      if (route.arg == typeGame) {
        typeGame = route.route.split('/')[route.route.split('/').length - 1]
      }
    })
    otherCasinoRoutes.forEach((route: any) => {
      if (route.arg == typeGame) {
        typeGame = route.route.split('/')[route.route.split('/').length - 1]
      }
    })
    // console.log(typeGame,' <<<<<<<<<<<<<<<<<<<<<<<<<<< GAME NAME +++++++++++++++++++++++++++')
    this.router.navigate([`/casino/catagory/${typeGame.toLowerCase().split(' ').join('-')}`]);
  }

  openDivs: number[] = []

  routeCustomLinkMobile(type: any, index: any) {
    let typeGame = type.data[0].gameType;
    if (this.isIndianGames) {
      // console.log(typeGame, index, ' <<<<<<<< game type')
      if (this.openDivs.includes(index)) {
        this.openDivs = this.openDivs.filter((val: any) => val !== index)

      } else {
        this.openDivs.push(index)
      }
      // console.log(this.openDivs, ' <<<<<<<< game type')
      return
    }
    if (typeGame == 'Indian Casino') {
      this.router.navigate([`/casino/indian-games`]);
      return;
    }
    if (typeGame == 'Popular Games') {
      this.router.navigate([`/casino/catagory/popular`]);
      return;
    }
    if (typeGame == 'Multiplayer Games') {
      this.router.navigate([`/casino/catagory/multiplayer`]);
      return;
    }
    if (typeGame == 'Live Casino') {
      this.router.navigate([`/casino/catagory/live-casino`]);
      return;
    }
    if (typeGame == 'Shooting Games') {
      this.router.navigate([`/casino/catagory/shooting-games`]);
      return;
    }
    if (typeGame == 'Scratch Games') {
      this.router.navigate([`/casino/catagory/scratch`]);
      return;
    }
    // console.log(typeGame, ' <<<<<<<<<<<<<<<<<<<<<<<<< TYPE OF GAME +++++++++++++++++++++ ')
    casinoRoutes.forEach((route: any) => {
      if (route.arg == typeGame) {
        typeGame = route.route.split('/')[route.route.split('/').length - 1]
      }
    })
    otherCasinoRoutes.forEach((route: any) => {
      if (route.arg == typeGame) {
        typeGame = route.route.split('/')[route.route.split('/').length - 1]
      }
    })
    // console.log(typeGame,' <<<<<<<<<<<<<<<<<<<<<<<<<<< GAME NAME +++++++++++++++++++++++++++')
    this.router.navigate([`/casino/catagory/${typeGame.toLowerCase().split(' ').join('-')}`]);
  }

  ngOnInit(): void {
    // this.toggleFooter = new Array(this.footerProviderData.length).fill(false);
    // this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
    //   this.isMobileView = result.matches;
    // });
    this.sportservice.gameUrl = undefined;
    if (_window().virtualSportOnOff) {
      this.showVS = _window().virtualSportOnOff;
    }
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        let arr: any = Array.from(resp).filter((x: any) => x.type === "CasinoNav")
        if (arr && arr.length > 0 && arr[0].data && arr[0].data.length > 0) {
          this.casinosArr = arr[0].data
        }

        let arr_: any = Array.from(resp).filter((x: any) => x.type === "footerLinks")
        if (arr_ && arr_.length > 0 && arr_[0].data && arr_[0].data.length > 0) {
          this.footers = arr_[0].data
        }
      }
    })
    _window().bannercdnLanding ? this.cdnSportsLanding = _window().bannercdnLanding : {};
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id != undefined) {
        this.selectedIndex = 0;
        this.totalNumberofGames = 0;
        this.games = null;
        this.gameNameData = params.id;
        casinoRoutes.forEach((route: any) => {
          if (route.route.split('/')[route.route.split('/').length - 1] == this.gameNameData) {
            this.gameNameData = route.arg
          }
        })
        otherCasinoRoutes.forEach((route: any) => {
          if (route.route.split('/')[route.route.split('/').length - 1] == this.gameNameData) {
            this.gameNameData = route.arg
          }
        })
        this.loadGames(this.gameNameData);
      }
    });
    this.router.events.subscribe((event: any) => {
      if (event.urlAfterRedirects) {
        // console.log(this.isAllGames, event.urlAfterRedirects, ' <<<<<<<<<<<<<<<<<<<<<<<<< url after redirects')
        this.isAllGames = event.urlAfterRedirects.includes('all')
        this.isIndianGames = event.urlAfterRedirects.includes('IND') || event.urlAfterRedirects.includes('indian')
        this.isDragonTiger = event.urlAfterRedirects.toLowerCase().includes('dragon')
        this.isLightening = event.urlAfterRedirects.toLowerCase().includes('lightning')
      }
    })
  }

  changeIndex(d: string) {
    //
    this.selectedIndex = this.games.findIndex((x: any) => x.group == d);
    this.dataIndex = d;
    setTimeout(() => {
      this.updateSearchResult$.next();
    }, 500);
  }

  loadImage(items: any) {
    items.imgLoad = true;
  }

  games: any;

  loadGames(game: string): void {
    this.loading = true;
    if (this.catagorys.includes(game)) {
      this.sportservice
        .casinoCatagory(game)
        .subscribe((res) => {
          this.games = res;
          // this.isAllGames = this.games.length > 1
          this.openDivs = []
          this.games.forEach((group: any, index: number) => {
            this.totalNumberofGames += group.data.length;
            this.openDivs.push(index)
            // console.log(this.openDivs, ' <<<<<<<<<< open divs')
          });
          // if (this.games.length == 1) {
          //   this.openDivs.push(0)
          // }
          this.loading = false;
        })

    } else {
      this.sportservice
        .casnioGametype(game)
        .subscribe((res) => {
          this.games = res;
          this.openDivs = []
          this.loading = false;

          this.toggleGamePro = new Array(this.games.length).fill(false);
          this.games.forEach((group: any, index: number) => {
            this.totalNumberofGames += group.data.length;
            if (!this.isAllGames && !this.isIndianGames) {
              this.openDivs.push(index)
            }
          });
          if (this.games.length == 1) {
            this.openDivs.push(0)
          }
          // console.log(this.openDivs, ' <<<<<<<<<< open divs')
          // this.isAllGames = this.games.length > 1
          this.loading = false;
        })

    }
    this.loadFav()
  }

  favdata: any;

  loadFav(): void {
    // this.loading = false;
    this.sportservice
      .getFavorite()
      .subscribe((res) => {
        this.favdata = res;
        this.loading = false;
        this.favdata.forEach((group: any) => {
          group.data.forEach((game: any) => {

            this.favouriteGames.add(game.GameCode);
          });
        });
      })

  }

  navigateToGame() {
    this.router.navigateByUrl(
      '/casino/detail/' +
      this.tempGameDetail.providerCode +
      '/' +
      this.tempGameDetail.GameCode
    );
  }

  routeToGame(gameDetail: any) {
    this.sportservice.gameUrl = undefined;
    this.tempGameDetail = gameDetail;
    this.isLobby = false;
    if (!gameDetail.haveDemo && !this.isLoggedIn) {
      // this.toastService.show('Login to view games.', {
      //   classname: 'bg-danger text-light',
      //   delay: 1500,
      // });
      this.openLoginModal();
      if (gameDetail.providerCode == 'GAPP') {
        this.genericService.setRouteBeforeLogin(
          gameDetail.providerCode,
          gameDetail.GameCode,
          '',
          '',
          '',
          false,
          true
        );
      } else {
        this.setRouteBeforeLogin(
          gameDetail.providerCode,
          gameDetail.GameCode,
          '',
          '',
          ''
        );
      }
    } else {
      if (gameDetail.providerCode == 'GAPP') {
        let gameId = gameDetail.GameCode;
        let tableId;
        if (gameDetail.GameCode.includes('?')) {
          gameId = gameDetail.GameCode.split('?')?.[0];
          tableId = this.getParameterByName('tableid', gameDetail.GameCode);
        }
        this.openGame(gameDetail.providerCode, gameId, false, tableId);
      } else if (this.providerModalArr.includes(gameDetail.providerCode)) {
        this.openProviderModal();
      } else {
        // this.navigateToGame();
        let gameId = this.tempGameDetail.GameCode;
        let tableId;
        if (this.tempGameDetail.GameCode.includes('?')) {
          gameId = this.tempGameDetail.GameCode.split('?')?.[0];
          tableId = this.getParameterByName(
            'tableid',
            this.tempGameDetail.GameCode
          );
        }
        // this.loadCasino(this.tempGameDetail.providerCode, gameId, tableId);
        this.navigateToGame()
      }
    }
  }

  openProviderModal() {
    this.genericService.openPopup(
      ProviderModalComponent,
      { marketId: null, marketName: null },
      'medium-popup',
      (value: any) => this.handleProviderModal(value)
    )
  }

  handleProviderModal(value: boolean) {
    if (this.isLobby) {
      this.navigateToLobby(
        this.tempGameDetail.GameCode,
        this.tempGameDetail.providerCode
      );
      return;
    }
    if (value) {
      let gameId = this.tempGameDetail.GameCode;
      let tableId: any;
      if (this.tempGameDetail.GameCode.includes('?')) {
        gameId = this.tempGameDetail.GameCode.split('?')?.[0];
        tableId = this.getParameterByName(
          'tableid',
          this.tempGameDetail.GameCode
        );
      }
      this.loadCasino(this.tempGameDetail.providerCode, gameId, tableId);
    }
  }

  ngAfterViewInit(): void {
    const storedData = localStorage.getItem('routeCasino');
    if (this.isLoggedIn) {
      if (storedData !== null) {
        const parsedObject = JSON.parse(storedData);
        setTimeout(() => {
          this.tempGameDetail.providerCode = parsedObject.provider;
          this.tempGameDetail.GameCode = parsedObject.gameId;
          //  this.tempGameDetail =parsedObject.tableId
          //  this.tempGameDetail = parsedObject.isCheckUrl
          if (parsedObject.routerLink.length != 0) {
            this.router.navigate([parsedObject.routerLink]);
          } else if (parsedObject?.rummy) {
            this.openGame(
              parsedObject.provider,
              parsedObject.gameId,
              parsedObject.isCheckUrl,
              parsedObject.tableId
            );
          } else {
            if (this.providerModalArr.includes(parsedObject.provider)) {
              this.openMyModal();
              return;
            }
            this.loadCasino(
              parsedObject.provider,
              parsedObject.gameId,
              parsedObject.tableId
            );
          }
          localStorage.removeItem('routeCasino');
        }, 0);
      }
    } else {
      localStorage.removeItem('routeCasino');
    }
    window.scrollTo(0, 0);
  }

  openMyModal() {

  }

  routeToLobby(provider: string, gameid?: string) {
    // if (this.isAuraShow) {
    //   provider = 'IC';
    //   gameid = ''
    // }
    this.tempGameDetail.providerCode = provider;
    this.tempGameDetail.GameCode = gameid;
    this.isLobby = true;
    if (!this.isLoggedIn) {
      this.setRouteBeforeLogin(provider, gameid, '', '', '');
      this.openLoginModal();
      return;
    }
    if (this.providerModalArr.includes(provider)) {
      this.openProviderModal();
      return;
    } else {
      this.navigateToLobby(gameid, provider);
    }
  }

  navigateToLobby(gameid: any, provider: any) {
    this.isLobby = false;
    if (gameid) {
      this.tempGameDetail.providerCode = provider;
      this.tempGameDetail.GameCode = gameid;
      this.loadCasino(provider, gameid);
    } else {
      this.router.navigate(['/casino/detail/' + provider + '/lobby']);
    }
  }

  openLoginModal() {
    this.genericService.openLoginModal();
  }

  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
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

  navigateToVirtualSports() {
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate(['/casino/detail/BR/lobby']);
    } else {
      this.toastService.show('Please Login to play.', {
        classname: 'bg-danger text-light',
        delay: 2000,
      });
      this.genericService.openLoginModal();

    }
  }

  loadCasino(
    providerCode: string,
    gameId: string | undefined,
    tableId?: string | undefined
  ) {
    this.sportservice.gameUrl = undefined;
    this.sportservice
      .sSCasino_POST(
        new CasinoRequest(
          providerCode,
          undefined,
          gameId,
          !this.isLoggedIn,
          this.deviceInfo.deviceType,
          undefined,
          tableId
        ),
      )
      .subscribe((x) => {
        if (x.url) {
          this.loading = true;
          this.sportservice.gameUrl = x.url;
          this.navigateToGame();
        } else {
          let err =
            Object.keys(x.msg).length > 0
              ? x.msg.message || x.msg
              : x.msg || x.message;
          this.openMsgModal(err);
        }
      })

  }

  setfavouiteCasino(id: any, gameId: any | undefined) {
    this.sportservice.gameUrl = undefined;
    if (true) {
      this.sportservice
        .setFavourite(id, gameId).subscribe((x) => {
          if (x) {
            // this.loading = true;
            if (id == 1) {
              this.toasterService.show('Added to Favorites', {
                classname: 'bg-success text-light',
                delay: 10000,
              });
            }
            if (id == 0) {
              this.toasterService.show('Removed From Favorites', {
                classname: 'bg-success text-light',
                delay: 10000,
              });
            }
          } else {
            let err = 'Favorites not added';
            this.openMsgModal(err);
          }
          this.loadFav()
        })

    }
  }

  openMsgModal(error: any) {
    this.genericService.openPopup(CustomMessageModalComponent)
  }

  getParameterByName(name: any, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  setRouteBeforeLogin(provider: any, gameId: any, tableId: any, isCheckUrl: any, routerLink: any) {
    let routeObj = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
      routerLink,
    };
    localStorage.setItem('routeCasino', JSON.stringify(routeObj));
  }

  openGame(
    provider: any,
    gameId?: any,
    isCheckUrl: boolean = false,
    tableId?: any
  ) {
    let data = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
    };

    this.modalService.open(data);
  }
}
