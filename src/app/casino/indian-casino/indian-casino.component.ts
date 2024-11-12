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
import { ToastService } from '../../services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Subject, fromEvent, merge } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { GenericService } from '../../services/generic.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent,
  keyframes,
} from '@angular/animations';
import { casinoRoutes, otherCasinoRoutes } from "../casino-routes";

@Component({
  selector: 'app-indian-casino',
  templateUrl: './indian-casino.component.html',
  styleUrls: [
    './indian-casino.component.scss',
    '../casino-footer.component.scss',
  ],
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
export class IndianCasinoComponent implements OnInit {
  showVS: any = false;
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);
  evoProvider: any = 'EZ';
  ezProvider: any = 'EZ';
  tempGameDetail: any = {};
  providerModalArr: string[] = [];
  @ViewChild('contentQtc', { static: true }) contentQtc: ElementRef | undefined;
  isLobby!: boolean;
  isAuraShow: boolean = false;
  updateSearchResult$!: any;
  scrollAndSearch$: any;
  gameLoader: any;
  isShowFavourite: boolean = false;

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
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
  visibleImages: any[] = [];
  @ViewChild('imageContainer') imageContainer: any;
  myScrollContainer!: HTMLElement;
  constructor(
    private sportservice: BackendService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService,
    private toasterService: ToastService,
    public modalService: ModalService,
    private genericService: GenericService,
    private elmRef: ElementRef
  ) {
    this.myScrollContainer = this.elmRef.nativeElement.querySelector(
      '#my-scroll-container'
    );
    if (_window().gameLoader) {
      this.gameLoader = _window().gameLoader;
    }

    this.updateSearchResult$ = new Subject();
    this.scrollAndSearch$ = merge(
      fromEvent(window, 'scroll'),
      // fromEvent(window, 'wheel'),
      this.updateSearchResult$
    );

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().isShowFavourites) {
      this.isShowFavourite = _window().isShowFavourites;
    }
    if (_window().isAuraShow) {
      this.isAuraShow = _window().isAuraShow;
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
    this.loading = false;
    this.isLoggedIn = this.checkauthservice.IsLogin();
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  setDefaultImage() {
    this.defaultImage = this.defaultImage;
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
  scrollLeft(index: number): void {
    const container = this.imageContainer.nativeElement;
    container.scrollLeft -= 100; // Adjust the scroll amount as needed
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
  setfavouiteCasino(id: any, gameId: any | undefined) {
    this.sportservice.gameUrl = undefined;
    if (true) {
      this.sportservice
        .setFavourite(id, gameId).then((x) => {
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
        .catch((err) => {
          this.openMsgModal('');
          if (err.status == 401) {
            this.openLoginModal();
          } else {
            console.error(err);
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);

        });
    }
  }
  favdata: any;
  loadFav(): void {
    this.loading = false;
    this.sportservice
      .getFavorite()
      .then((res) => {
        this.favdata = res;

        this.favdata.forEach((group: any) => {
          group.data.forEach((game: any) => {

            this.favouriteGames.add(game.GameCode);
          });
        });
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
  scrollRight(index: number): void {
    const container = this.imageContainer.nativeElement;
    container.scrollLeft += 100; // Adjust the scroll amount as needed
  }
  setProperName(item: any) {
    console.log(item, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< item in set proper name')
    if (item === 'Instantwin') {
      return 'Crash Games';
    }
    if (item === 'Mp') {
      return 'Multiplayer';
    }
    if (item === 'Indgames') {
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
  ngOnInit(): void {
    this.sportservice.gameUrl = undefined;
    if (_window().virtualSportOnOff) {
      this.showVS = _window().virtualSportOnOff;
    }
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id != undefined) {
        this.selectedIndex = 0;
        this.totalNumberofGames = 0;
        this.data = null;
        this.gameNameData = params.id;
        // console.log(this.gameNameData,' <<<<<<<<<<<<<<<<<<<<<<<<<<< GAME NAME +++++++++++++++++++++++++++')
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
        // console.log(this.gameNameData,' <<<<<<<<<<<<<<<<<<<<<<<<<<< GAME NAME +++++++++++++++++++++++++++')
        this.loadGames(this.gameNameData);
      }
    });
  }

  changeIndex(d: string) {
    //
    this.selectedIndex = this.data.findIndex((x: any) => x.group == d);
    this.dataIndex = d;
    setTimeout(() => {
      this.updateSearchResult$.next();
    }, 500);
  }

  loadImage(items: any) {
    items.imgLoad = true;
  }
  loadGames(game: string): void {
    this.loading = true;
    if (this.catagorys.includes(game)) {
      this.sportservice
        .casinoCatagory(game)
        .then((res) => {
          // const allDataArray = res.map(item => item.data).reduce((acc, curr) => acc.concat(curr), []);
          this.data = res;
          // this.toggleImages(this.data[0].data)
          this.data.forEach((group: any) => {
            this.totalNumberofGames += group.data.length;
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    } else {
      this.sportservice
        .casnioGametype(game)
        .then((res) => {
          this.data = res;
          this.toggleGamePro = new Array(this.data.length).fill(false);
          this.data.forEach((group: any) => {
            this.totalNumberofGames += group.data.length;
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    }
  }

  navigateToGame() {
    this.router.navigateByUrl(
      '/casino/detail/' +
      this.tempGameDetail.providerCode +
      '/' +
      this.tempGameDetail.GameCode
    );
  }

  // routeToGame(gameDetail: any) {
  //   this.tempGameDetail = gameDetail;
  //   if (!gameDetail.haveDemo && !this.isLoggedIn) {
  //     this.genericService.openLoginModal();
  //     if (gameDetail.providerCode == "GAP") {
  //       this.genericService.setRouteBeforeLogin(gameDetail.providerCode, gameDetail.GameCode, "", "", "", false, true)
  //     }
  //     else {
  //       this.setRouteBeforeLogin(gameDetail.providerCode, gameDetail.GameCode, "", "", "")
  //     }
  //   }
  //   else {
  //     if (gameDetail.providerCode == "GAP") {
  //       this.openGame(gameDetail.providerCode, gameDetail.GameCode)
  //     }
  //     else if (this.providerModalArr.includes(gameDetail.providerCode)) {
  //       this.openProviderModal();
  //     } else {
  //       let gameId = this.tempGameDetail.GameCode;
  //       let tableId;
  //       if (this.tempGameDetail.GameCode.includes('?')) {
  //         gameId = this.tempGameDetail.GameCode.split('?')?.[0];
  //         tableId = this.getParameterByName('tableid', this.tempGameDetail.GameCode);
  //       }
  //       this.loadCasino(this.tempGameDetail.providerCode, gameId, tableId);
  //     }
  //   }

  // }

  routeToGame(gameDetail: any) {
    this.sportservice.gameUrl = undefined;
    this.tempGameDetail = gameDetail;
    this.isLobby = false;
    if (!gameDetail.haveDemo && !this.isLoggedIn) {
      // this.toastService.show('Login to view games.', {
      //   classname: 'bg-danger text-light',
      //   delay: 1500,
      // });
      this.genericService.openLoginModal();
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
  }

  openProviderModal() {

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
    if (true) {
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
          undefined
        )
        .then((x) => {
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
        .catch((err) => {
          this.openMsgModal('');
          if (err.status == 401) {
            this.openLoginModal();
          } else {
            console.error(err);
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    }
  }

  openMsgModal(error: any) {

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
    this.modalService.popupClose.next(false);
    let data = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
    };
    this.modalService.open(data);
  }
}
