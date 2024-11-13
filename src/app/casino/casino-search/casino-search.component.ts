import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  OnInit, Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CheckAuthService } from '../../services/check-auth.service';
import { ModalService } from '../../shared/services/modal.service';
import {
  BackendService,
  CasinoRequest,
  _window,
} from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { Subject, fromEvent, merge } from 'rxjs';
// import { GenericService } from '../../shared/services/generic.service';
import { GenericService } from '../../services/generic.service';
import { GamePopupService } from '../../services/game-popup.service';
import { GetStatusService } from '../../services/get-status.service';
import { UtillsService } from "../../services/utills.service";
import { casinoRoutes, otherCasinoRoutes } from "../casino-routes";
import { CasinoFilterMenusComponent } from "../casino-filter-menus/casino-filter-menus.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CasinoSearchMobileModalComponent } from "../casino-search-mobile-modal/casino-search-mobile-modal.component";

@Component({
  selector: 'app-casino-search',
  templateUrl: './casino-search.component.html',
  styleUrls: ['./casino-search.component.scss'],
})
export class CasinoSearchComponent implements OnInit, AfterViewInit {
  isLoggedIn = false;
  deviceInfo: any;
  loading: boolean = false;
  isLobby!: boolean;
  showVS: boolean = false;
  display: boolean = false;
  cdnSportsLanding: any
  showFiltersButton = true
  // showSearchModalMobile = false
  gameLoader: any;
  gamesCount: number = 0
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  selected: number = 2;
  nav_items: string[] = ['Providers', 'Game Type'];
  updateSearchResult$!: any;
  scrollAndSearch$: any;
  @Output() showFilter = new EventEmitter<any>();
  toggleCasinoPro: boolean = true;
  casinosArr: any[] = [
    {
      name: 'Multiplayer',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casinosNew/multiplayer.svg',
      routerLink: '/casino/casino-games/multiplayer',
    },
    {
      name: 'Lightning',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/lighting-casino2.png',
      routerLink: '/casino/catagory/lightning',
    },
    {
      name: 'roulette',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/roulette2.png',
      routerLink: '/casino/catagory/roulette',
    },
    {
      name: 'teenpatti',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/teen-patti2.png',
      routerLink: '/casino/catagory/teen-patti',
    },
    {
      name: 'livecasino',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/live-casino2.png',
      routerLink: '/casino/catagory/live-casino',
    },
    {
      name: 'Andar Bahar',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/andar-bahar2.png',
      routerLink: '/casino/catagory/andar-bahar',
    },
    // {
    //   name: 'Matka',
    //   imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/casino-games/matka2.png',
    //   routerLink: "/casino/catagory/MATKA"
    // },
    {
      name: 'baccarat',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/baccarat2.png',
      routerLink: '/casino/catagory/baccarat',
    },
    {
      name: 'black-jack',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/black-jack2.png',
      routerLink: '/casino/catagory/blackjack',
    },
    {
      name: 'tablegames',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/table-games2.png',
      routerLink: '/casino/catagory/table-game',
    },
    {
      name: 'instantwin',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/instant-win2.png',
      routerLink: '/casino/catagory/instant-win',
    },
    {
      name: 'poker',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/poker2.png',
      routerLink: '/casino/catagory/poker',
    },
    // {
    //   name: 'betfairgames',
    //   imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/casino-games/betfair2.png',
    //   routerLink: "/games"
    // },
    {
      name: 'slotgames',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/slot-game2.png',
      routerLink: '/casino/catagory/slot',
    },
    {
      name: 'dragontiger',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/dragon-tiger-game2.png',
      routerLink: '/casino/catagory/dragon-tiger',
    },
    {
      name: 'E-Sports',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/esports2.png',
      routerLink: '/casino/catagory/esports',
    },
    {
      name: 'holdem',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/holdem2.png',
      routerLink: '/casino/catagory/HOLDEM',
    },
    {
      name: 'providers',
      imgSrc:
        'https://iriscdn.b-cdn.net/kheloyar/casino-games/teen-patti2.png',
      routerLink: '/casino/providers',
    },
  ];
  isShowFavourite: boolean = false;

  defaultImage: string =
    ' https://iriscdn.b-cdn.net/CasinoImages/preloader.svg';
  constructor(
    private modalService: ModalService,
    private router: Router,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    private sportservice: BackendService,
    private toastService: ToastService,
    private genericService: GenericService,
    private gamePopup: GamePopupService,
    private toasterService: ToastService,
    private bottomSheet: MatBottomSheet,
    private utillsService: UtillsService,
    private getStatusService: GetStatusService
  ) {
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    if (_window().gameLoader) {
      this.defaultImage = _window().gameLoader;
    }
    if (_window().isShowFavourites) {
      this.isShowFavourite = _window().isShowFavourites;
    }
    this.updateSearchResult$ = new Subject();
    this.scrollAndSearch$ = merge(
      fromEvent(window, 'scroll'),
      this.updateSearchResult$
    );
    if (_window().gameLoader) {
      this.gameLoader = _window().gameLoader;
    }
    if (_window().showFiltersButton) {
      this.showFiltersButton = _window().showFiltersButton;
    }

  }
  searchTerm = '';
  filteredData: any = [];
  @ViewChildren('searchInput')
  searchInput!: QueryList<ElementRef>;
  filterData(event: any) {
    if (event.target.value.length > 2) {
      this.sportservice.searchCasinoPost(this.searchTerm).subscribe((resp) => {
        if (resp && resp.length > 0) {
          this.gamesCount = 0
          this.filteredData = resp;
          resp.forEach((group: any) => {
            this.gamesCount += group.data.length
          })
        } else {
          this.filteredData = [];
          this.gamesCount = 0
        }
      });
    } else {
      this.filteredData = [];
    }
    this.loadFav()
  }
  favouriteGames = new Set<any>();

  openSearchModalMobile() {
    this.bottomSheet.open(CasinoSearchMobileModalComponent)
  }

  setGameName(item: any) {
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

  routeCustomLink(type: any) {
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
  favdata: any;
  loadFav(): void {
    this.loading = false;
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
  loadImage(items: any) {
    items.imgLoad = true;
  }
  ngOnInit(): void {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    _window().bannercdnLanding ? this.cdnSportsLanding = _window().bannercdnLanding : {};
    if (_window().virtualSportOnOff) {
      this.showVS = _window().virtualSportOnOff;
    }
    this.loading = false;
    this.isLoggedIn = this.checkauthservice.IsLogin();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        let arr: any = Array.from(resp).filter((x: any) => x.type === "CasinoNav")
        if (arr && arr.length > 0 && arr[0].data && arr[0].data.length > 0) {
          this.casinosArr = arr[0].data
        }
      }
    })
  }

  routeToGameLink(link: string) {
    this.router.navigate([link]);
    this.closeModal();
  }
  closeModal() {
    this.modalService.closeFilterModal();
  }
  routeToGame(gameDetail: any) {
    // console.log(gameDetail, ' <<<<<<<<<<<<<<<<<<<<<<<<<< game detail')
    if (this.isLoggedIn) {
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
    } else {
      this.openLoginModal();
    }
  }

  navigateToVirtualSports() {
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate(['/casino/detail/BR/lobby']);
      this.closeModal();
    } else {
      this.toastService.show('Please Login to play.', {
        classname: 'bg-danger text-light',
        delay: 2000,
      });
      this.genericService.openLoginModal();
    }
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
    this.closeModal();
    this.modalService.open(data);
  }
  tempGameDetail: any = {};
  providerModalArr: string[] = [];
  ngAfterViewInit(): void {
    this.searchInput.first.nativeElement.focus();
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
    // setTimeout(() => {
    //   var elems = document.getElementById('provider-modal');
    //   if (elems) {
    //     var model = M?.Modal?.init(elems, {
    //       dismissible: false,
    //     });
    //     model.open();
    //   }
    //   localStorage.removeItem('routeCasino');
    // }, 0);
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
  }

  openMsgModal(error: any) {
    // var elems = document.getElementById('msg-modal');
    // (document.getElementById('casinoErrorMessage') as any).innerHTML = error;
    // if (elems) {
    //   var model = M?.Modal?.init(elems);
    //   model.open();
    // }
    // document.body.style.overflow = 'unset';
  }

  navigateToGame() {
    this.router.navigateByUrl(
      '/casino/detail/' +
      this.tempGameDetail.providerCode +
      '/' +
      this.tempGameDetail.GameCode
    );
    this.closeModal();
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
    this.closeModal();
  }
  openProviderModal() {
    let gameId = this.tempGameDetail.GameCode;
    let tableId;
    if (this.tempGameDetail.GameCode.includes('?')) {
      gameId = this.tempGameDetail.GameCode.split('?')?.[0];
      tableId = this.getParameterByName(
        'tableid',
        this.tempGameDetail.GameCode
      );
    }
    let obj = {
      gameId: gameId,
      provider: this.tempGameDetail.providerCode,
      tableId: tableId,
    };
    this.gamePopup.openProviderModal(obj);
    // this.genericService.openProviderModal()

    // var elems = document.getElementById('provider-modal');
    // if (elems) {
    //   var model = M?.Modal?.init(elems);
    //   model.open();
    // };
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
    this.genericService.openLoginModal()
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
  getParameterByName(name: any, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  showFiltersModal() {
    const config = {
      panelClass: 'casino-filter-dialog', // Optional: for custom styles
    };
    this.bottomSheet.open(CasinoFilterMenusComponent, config)
  }
}
