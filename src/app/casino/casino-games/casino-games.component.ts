import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
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
import { Subject, fromEvent, merge } from 'rxjs';
import { casinoRoutes, otherCasinoRoutes } from "../casino-routes";
import { UtillsService } from "../../services/utills.service";
import { GenericService } from '../../services/generic.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-casino-games',
  templateUrl: './casino-games.component.html',
  styleUrls: [
    './casino-games.component.scss',
    // '../casino-footer.component.scss',
  ],
})
export class CasinoGamesComponent implements OnInit, AfterViewInit, OnDestroy {
  data: any;
  loading = true;
  iframurl: any;
  interval: any;
  imgUrl: any;
  isLoggedIn = false;
  deviceInfo: any;
  toasterMessage: any;
  selectedIndex = 0;
  footers: any
  dataIndex: any;
  tempGameDetail: any = {};
  providerModalArr: string[] = [];
  @ViewChild('contentQtc', { static: true }) contentQtc: ElementRef | undefined;
  termsModal: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  defaultImage: string =
    ' https://iriscdn.b-cdn.net/CasinoImages/preloader.svg';
  updateSearchResult$!: any;
  scrollAndSearch$: any;
  isAuraShow: boolean = false;
  bannerCdn = ''
  isShowFavourite: boolean = false;
  gameNameData: string = '';
  totalNumberofGames: Number = 0;
  constructor(
    private sportservice: BackendService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastService,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService,
    private genericService: GenericService,
    private utillsService: UtillsService,
    public modalService: ModalService,
  ) {
    if (_window().isAuraShow) {
      this.isAuraShow = _window().isAuraShow;
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
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   // behavior: 'smooth',
    // });
    this.loading = false;
    this.isLoggedIn = this.checkauthservice.IsLogin();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }
  ngOnInit(): void {
    if (_window().bannercdnLanding) {
      this.bannerCdn = _window().bannercdnLanding
    }
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id != undefined) {
        this.selectedIndex = 0;
        this.totalNumberofGames = 0;
        this.data = null;
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
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        let arr_: any = Array.from(resp).filter((x: any) => x.type === "CasinoFooterNav")
        if (arr_ && arr_.length > 0 && arr_[0].data && arr_[0].data.length > 0) {
          this.footers = arr_[0].data
        }
      }
    })
    // let elems = document.querySelector('#nav-mobile');
    // let instances = M.Sidenav.getInstance(elems);
    // instances.close();
    setTimeout(() => {
      window.scroll(0, 1)
    }, 750)
  }

  routeToLink(link: string) {
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate([link])
    } else {
      this.genericService.openLoginModal()
    }
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
  loadGames(gameType: string) {
    this.loading = true;
    this.sportservice
      .casinoProviderWise(gameType)
      .subscribe((resp: any) => {
        if (resp) {
          this.data = resp;
          this.data.forEach((group: any) => {
            this.totalNumberofGames += group.data.length;
          });
          this.loading = false;
        }
      })
    this.loadFav()
  }
  changeIndex(d: string) {
    this.selectedIndex = this.data.findIndex((x: any) => x.group == d);
    this.dataIndex = d;
    setTimeout(() => {
      this.updateSearchResult$.next();
    }, 500);
  }
  loadImage(items: any) {
    items.imgLoad = true;
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
        .setFavourite(id, gameId).subscribe((x: any) => {
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
      .subscribe((res: any) => {
        this.favdata = res;
        this.loading = false;

        this.favdata.forEach((group: any) => {
          group.data.forEach((game: any) => {

            this.favouriteGames.add(game.GameCode);
          });
        });
      })

  }
  ngAfterViewInit(): void {
    if (this.isLoggedIn) {
      const storedData = localStorage.getItem('routeCasino');
      if (storedData !== null) {
        const parsedObject = JSON.parse(storedData);
        setTimeout(() => {
          this.tempGameDetail.providerCode = parsedObject.provider;
          this.tempGameDetail.GameCode = parsedObject.gameId;
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
              // this.openMyModal();
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
    window.scrollTo(0, 0)
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
    this.tempGameDetail = gameDetail;
    if (!gameDetail.haveDemo && !this.isLoggedIn) {
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
        this.navigateToGame();
      }
    }
  }

  openProviderModal() {

  }
  handleProviderModal(value: boolean) {
    if (value) {
      if (!this.tempGameDetail.GameCode) {
        this.router.navigate([
          '/casino/detail/' + this.tempGameDetail.providerCode + '/lobby',
        ]);
        return;
      }
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

  routeToLobby(provider: string, gameid?: string) {
    // if (this.isAuraShow) {
    //   provider = 'IC';
    //   gameid = ''
    // }
    if (this.isLoggedIn) {
      if (!this.tempGameDetail) {
        this.tempGameDetail = {};
      }
      this.tempGameDetail.providerCode = provider;
      this.tempGameDetail.GameCode = gameid;

      if (this.providerModalArr.includes(provider)) {
        this.openProviderModal();
        return;
      } else {
        //  'lobby' is for navigating through providerCode only
        if (gameid) {
          this.router.navigate(['/casino/detail/' + provider + '/' + gameid]);
        } else {
          this.router.navigate(['/casino/detail/' + provider + '/lobby']);
        }
      }
    } else {
      let routerLink = '';
      if (gameid) {
        routerLink = '/casino/detail/' + provider + '/' + gameid;
        this.setRouteBeforeLogin('', '', '', '', routerLink);
      } else {
        routerLink = '/casino/detail/' + provider + '/lobby';
        this.setRouteBeforeLogin(provider, '', '', '', routerLink);
      }
      this.openLoginModal();
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
        .subscribe((x: any) => {
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
    this.genericService.setRouteBeforeLogin(
      provider,
      gameId,
      tableId,
      isCheckUrl,
      routerLink
    );
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

  ngOnDestroy(): void {
    this.modalService.popupClose.next(true);
  }
}
