import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from "@angular/router";
import { CheckAuthService } from "../../services/check-auth.service";
import { _window, BackendService, CasinoRequest } from "../../services/backend.service";
import { ToastService } from "../../services/toast.service";
import { GenericService } from "../../services/generic.service";
import { GetStatusService } from "../../services/get-status.service";
import { GamePopupService } from "../../services/game-popup.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { fromEvent, merge, Subject } from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { UtillsService } from "../../services/utills.service";
import { ModalService } from "../../shared/services/modal.service";

@Component({
  selector: 'app-casino-search-mobile-modal',
  template: `
    <div class="modal-body">
      <div class="filters">
        <div class="back">
          <img [src]="menuItemBackImg" alt="back" (click)="closeModal()">
        </div>
        <div class="search-box">
          <input type="text" id="searchTerm" #searchInput foc [(ngModel)]="searchTerm" (input)="filterData($event)"
                 placeholder="Search Game" class="form-control">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M4.43044 0C6.87605 0 8.86088 1.98484 8.86088 4.43044C8.86088 6.87605 6.87605 8.86088 4.43044 8.86088C1.98484 8.86088 0 6.87605 0 4.43044C0 1.98484 1.98484 0 4.43044 0ZM4.43044 7.87634C6.33406 7.87634 7.87634 6.33406 7.87634 4.43044C7.87634 2.52683 6.33406 0.984543 4.43044 0.984543C2.52683 0.984543 0.984543 2.52683 0.984543 4.43044C0.984543 6.33406 2.52683 7.87634 4.43044 7.87634ZM8.60736 7.91129L10 9.30344L9.30344 10L7.91129 8.60736L8.60736 7.91129Z"
                fill="#9A9A9A" />
            </svg>
          </div>
        </div>
      </div>
      <div class="parent-wrapper container-wrapper-casino" *ngIf="filteredData && filteredData.length > 0">
        <div class="c-wrap">
          <div class="main-container-casino">
            <ng-container *ngFor="let games of filteredData">
              <div *ngFor="let game of games.data" (click)="routeToGame(game)" class="card-casino">
                <div class="card-header-casino" [ngClass]="game.imgLoad !== true ? 'img-container-loader' : ''">
                  <div class="image-containerz">
                    <div class="imagez">
                      <img (load)="loadImage(game)" [hidden]="game.imgLoad != true" [src]="game.imgLink" alt="" />
                      <div class="favourite_container" *ngIf="isLoggedIn && isShowFavourite">
                        <i class="fa fa-heart favourite"
                           [ngClass]="{'text-danger': isFavorite(game.GameCode)}"
                           (click)="toggleFavourite(game); $event.stopPropagation()">
                        </i>
                      </div>
                      <div class="games_style_add"
                           [ngClass]="((game.haveDemo && !isLoggedIn) || game?.minMax) ? '' : 'flex_justify'">
                        <span class="provider_name provider_ext">{{game.PROVIDERS === 'IC' ? 'Aura' : game.PROVIDERS}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
      <div *ngIf="filteredData && filteredData.length <= 0">
        <div class="nav-tab">
          <ul>
            <li [ngClass]="selected == i ? 'active-item' : '' " *ngFor="let item of nav_items; let i = index"
                (click)="selected = i">
              <a class="nav-link">
                {{item}}</a>
            </li>
          </ul>
        </div>
        <div class="provider" *ngIf="selected == 0">
          <div class="flex-container">
            <div *ngFor="let footer of footers" class="provider-card" (click)="routeToLink(footer.link)">
              <img [src]="bannerCdn + '/banners/' + footer.id + '.png'"/>
            </div>
          </div>
        </div>
        <div class="game-types" *ngIf="selected == 1">
          <div class="flex-container">
            <div class="heading">
              Game Types
            </div>
            <div class="items" [ngClass]="toggleCasinoPro ? '': 'heightAuto' ">
<!--              <div class="item active-item">-->
<!--                All-->
<!--              </div>-->
              <div class="item " *ngFor="let pro of casinosArr" (click)="routeToGameLink(pro.link)">
                {{pro.text | translate}}
              </div>
            </div>
            <div class="see-more" *ngIf="casinosArr.length>10" (click)="toggleCasinoPro = !toggleCasinoPro">
              <span>{{toggleCasinoPro ? 'Show More' : 'See Less'}}</span>
                   <i  class="bi bi-chevron-down fs-16 "  [style.transform]="'rotate(' + (!toggleCasinoPro ? '180deg' : '0deg') + ')'"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./casino-search-mobile-modal.component.scss']
})
export class CasinoSearchMobileModalComponent implements OnInit {
  isLoggedIn = false;
  deviceInfo: any;
  loading: boolean = false;
  isLobby!: boolean;
  showVS: boolean = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  selected: number = 0;
  nav_items: string[] = ['Providers', 'Game Type'];
  updateSearchResult$!: any;
  scrollAndSearch$: any;
  footers: any
  toggleCasinoPro: boolean = true;
  bannerCdn = ''
  casinosArr: any[] = [];
  isShowFavourite: boolean = false;
  menuItemBackImg: string = ''
  defaultImage: string =
    ' https://iriscdn.b-cdn.net/CasinoImages/preloader.svg';
  constructor(
    private modalService: ModalService,
    private router: Router,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    private sportservice: BackendService,
    private bottomSheet: MatBottomSheet,
    private toastService: ToastService,
    private genericService: GenericService,
    private utillsService: UtillsService,
    private gamePopup: GamePopupService,
    private toasterService: ToastService,

  ) {
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    if (_window().gameLoader) {
      this.defaultImage = _window().gameLoader;
    }
    if (_window().menuItemBackImg) {
      this.menuItemBackImg = _window().menuItemBackImg;
    }
    if (_window().isShowFavourites) {
      this.isShowFavourite = _window().isShowFavourites;
    }
    if (_window().bannercdnLanding) {
      this.bannerCdn = _window().bannercdnLanding
    }
    this.updateSearchResult$ = new Subject();
    this.scrollAndSearch$ = merge(
      fromEvent(window, 'scroll'),
      this.updateSearchResult$
    );
  }
  searchTerm = '';
  filteredData: any = [];
  @ViewChildren('searchInput')
  searchInput!: QueryList<ElementRef>;
  filterData(event: any) {
    if (event.target.value.length > 2) {
      this.sportservice.searchCasinoPost(this.searchTerm).then((resp) => {
        if (resp && resp.length > 0) {
          this.filteredData = resp;
        } else {
          this.filteredData = [];
        }
      });
    } else {
      this.filteredData = [];
    }
    this.loadFav()
  }
  favouriteGames = new Set<any>();

  routeToLink(link: string) {
    this.closeModal()
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate([link])
    } else {
      this.genericService.openLoginModal()
    }
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
  loadImage(items: any) {
    items.imgLoad = true;
  }
  ngOnInit(): void {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
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

        let arr_: any = Array.from(resp).filter((x: any) => x.type === "footerLinks")
        if (arr_ && arr_.length > 0 && arr_[0].data && arr_[0].data.length > 0) {
          this.footers = arr_[0].data
        }
      }
    })
  }
  routeToGameLink(link: string) {
    this.router.navigate([link]);
    this.closeModal();
  }
  closeModal() {
    // this.genericService.closePopup();
    this.bottomSheet.dismiss()
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
      this.openLoginModal()
    }
  }

  openGame(
    provider: any,
    gameId?: any,
    isCheckUrl: boolean = false,
    tableId?: any
  ) {
    // this.modalService.popupClose.next(false);
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
          console.log('parsedObject', parsedObject);
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
    setTimeout(() => {
      this.openProviderModal()
      // var elems = document.getElementById('provider-modal');
      // if (elems) {
      //   var model = M?.Modal?.init(elems, {
      //     dismissible: false,
      //   });
      //   model.open();
      // }
      localStorage.removeItem('routeCasino');
    }, 0);
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

    // var elems = document.getElementById('msg-modal');
    // (document.getElementById('casinoErrorMessage') as any).innerHTML = error;
    // if (elems) {
    //   var model = M?.Modal?.init(elems);
    //   model.open();
    // }
    document.body.style.overflow = 'unset';
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
    console.log('search comp');

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
}
