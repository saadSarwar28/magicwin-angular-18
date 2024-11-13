import {
  _window,
  BackendService,
  CasinoRequest,
} from 'src/app/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import * as M from 'materialize-css';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { GenericService } from "../../../services/generic.service";

@Component({
  selector: 'app-fav-casino',
  templateUrl: './fav-casino.component.html',
  styleUrls: ['./fav-casino.component.scss'],
})
export class FavCasinoComponent implements OnInit {
  gameList: any;
  showGame: boolean = false;
  loadingData: boolean = false;

  gameLoader: any;
  tempGameDetail: any;
  isLobby: boolean = false;
  isLoggedIn: boolean = false;
  providerModalArr: string[] = [];
  deviceInfo: any;

  constructor(
    private backendService: BackendService,
    private genericService: GenericService,
    private toasterService: ToastService,
    public modalService: ModalService,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private checkauthservice: CheckAuthService
  ) {
    if (_window().gameLoader) {
      this.gameLoader = _window().gameLoader;
    }
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isLoggedIn = this.checkauthservice.IsLogin();
  }

  ngOnInit(): void {
    this.getBackendService();
  }

  getBackendService() {
    this.loadingData = true;
    this.backendService
      .getFavorite()
      .then((res) => {
        this.gameList = res;

        this.gameList.forEach((group) => {
          group.data.forEach((game) => {
            this.favouriteGames.add(game.GameCode);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.loadingData = false;
      });
  }

  setRouteBeforeLogin(provider, gameId, tableId, isCheckUrl, routerLink) {
    let routeObj = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
      routerLink,
    };
    localStorage.setItem('routeCasino', JSON.stringify(routeObj));
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
    this.backendService.gameUrl = undefined;
    if (true) {
      this.backendService
        .setFavourite(id, gameId)
        .then((x) => {
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
            // if (id == 0 && gameId==undefined) {
            //   this.toasterService.show('All Favourites Removed', {
            //     classname: 'bg-success text-light',
            //     delay: 10000,
            //   });
            // }
          } else {
            let err = 'Favorites not added';
            this.openMsgModal(err);
          }
          this.getBackendService();
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
            this.loadingData = false;
          }, 500);
        });
    }
  }
  routeToGame(gameDetail: any) {
    this.backendService.gameUrl = undefined;
    this.tempGameDetail = gameDetail;
    this.isLobby = false;
    if (!gameDetail.haveDemo && !this.isLoggedIn) {
      // this.toastService.show('Login to view games.', {
      //   classname: 'bg-danger text-light',
      //   delay: 1500,
      // });
      this.genericService.openLoginModal();
      if (gameDetail.providerCode == 'GAP') {
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
      if (gameDetail.providerCode == 'GAP') {
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
        this.loadCasino(this.tempGameDetail.providerCode, gameId, tableId);
      }
    }
  }

  openProviderModal() {
    var elems = document.getElementById('provider-modal');
    if (elems) {
      var model = M?.Modal?.init(elems);
      model.open();
    }
  }

  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

  loadCasino(
    providerCode: string,
    gameId: string | undefined,
    tableId?: string | undefined
  ) {
    this.backendService.gameUrl = undefined;
    if (true) {
      this.backendService
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
            this.loadingData = true;
            this.backendService.gameUrl = x.url;
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
            this.loadingData = false;
          }, 500);
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

  openMsgModal(error) {
    var elems = document.getElementById('msg-modal');
    (document.getElementById('casinoErrorMessage') as any).innerHTML = error;
    if (elems) {
      var model = M?.Modal?.init(elems);
      model.open();
    }
    document.body.style.overflow = 'unset';
  }

  openLoginModal() {
    this.genericService.openLoginModal();
  }
}
