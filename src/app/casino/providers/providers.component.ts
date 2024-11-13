import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  BackendService,
  CasinoRequest,
  _window,
} from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { ToastService } from '../../services/toast.service';
import { Subject, fromEvent, merge } from 'rxjs';
import { GenericService } from '../../services/generic.service';
import { ProviderModalComponent } from "../../shared/provider-modal/provider-modal.component";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  loading = true;
  data: any = [];
  isLogin = false;
  selectedIndex = 0;
  dataIndex: any;
  deviceInfo: any;
  tableId: string | undefined;
  providerModalArr: string[] = [];
  tempCasino: any;
  defaultImage: string =
    ' https://iriscdn.b-cdn.net/CasinoImages/preloader.svg';
  updateSearchResult$!: any;
  scrollAndSearch$: any;

  constructor(
    private sportservice: BackendService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    private genericService: GenericService
  ) {
    if (_window().gameLoader) {
      this.defaultImage = _window().gameLoader;
    }
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // });
    this.updateSearchResult$ = new Subject();
    this.scrollAndSearch$ = merge(
      fromEvent(window, 'scroll'),
      this.updateSearchResult$
    );
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    this.loading = false;
    this.isLogin = this.checkauthservice.IsLogin();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        this.selectedIndex = 0;
        this.data = [];
      }
      if (this.activatedRoute.snapshot.queryParams['id']) {
        this.tableId = this.activatedRoute.snapshot.queryParams['id'];
      }
    });
  }

  ngOnInit(): void {
    this.loadGames('providers');
    window.scrollTo(0, 0)
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0)
  }

  ngOnDestroy() {
  }

  loadGames(gameType: string) {
    this.loading = true;

    this.sportservice
      .casinoProviders()
      .subscribe((res) => {
        if (res) {
          this.data = res;
          this.loading = false;

        }
      })

  }

  loadCasino(casino: any) {
    let isDemo = false;
    if (!this.isLogin) {
      // this.router.navigate(['/signin'])
      this.toastService.show('Login to view games', {
        classname: 'bg-danger text-light',
        delay: 1500,
      });
      this.router.navigate(['/signin']);
      this.genericService.openLoginModal();

    } else {
      if (casino.provider == 'BF') {
        this.router.navigate(['/games']);
      } else {
        this.sportservice.gameUrl = undefined;
        this.loading = true;
        this.sportservice
          .sSCasino_POST(
            new CasinoRequest(
              casino.provider,
              undefined,
              casino.gameId,
              isDemo,
              this.deviceInfo.deviceType,
              undefined,
              this.tableId
            )
          )
          .subscribe((resp) => {
            if (resp && resp.url) {
              this.loading = false;
              this.router.navigateByUrl('/casino/' + casino.name, {
                state: { iframeurl: resp.url },
              });
            } else {
              this.toastService.show(resp.msg, {
                classname: 'bg-danger text-light',
                delay: 1000,
              });
            }
          })

      }
    }
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
  routeToCasino(casino: any) {
    this.tempCasino = casino;
    if (this.providerModalArr.includes(casino.abbr)) {
      this.openProviderModal();
      return;
    }
    this.navigateToGame();
  }

  navigateToGame() {
    let casino: any = this.tempCasino;
    if (casino.abbr == 'BF') {
      this.router.navigate(['/games']);
    } else if (casino.direct) {
      this.router.navigate(['/casino/detail/' + casino.abbr]);
    } else {
      this.router.navigate(['/casino/providers/' + casino.abbr]);
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
    if (value) {
      this.navigateToGame();
    }
  }

  routeToLobby(casino: string, type?: string | undefined) {
    let isDemo = false;
    if (!this.isLogin) {
      // this.router.navigate(['/signin'])
      this.toastService.show('Please login to view games.', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    } else {
      if (casino == 'EVO') {
        this.sportservice.gameUrl = undefined;

        this.sportservice
          .sSCasino_POST(
            new CasinoRequest(
              'QTC',
              type,
              'EVO-blackjack',
              isDemo,
              this.deviceInfo.deviceType,
              undefined,
              this.tableId
            )
          )
          .subscribe((resp) => {
            if (resp && resp.url) {
              this.router.navigateByUrl('/casino/' + casino, {
                state: { iframeurl: resp.url },
              });
            } else {
              // const translatedResponse = this.toasterTranslationMethod(resp.msg);
              this.toastService.show(resp.msg, {
                classname: 'bg-danger text-light',
                delay: 1000,
              });
            }
          })

      } else if (casino == 'BF') {
        this.router.navigate(['/games']);
      } else {
        this.sportservice.gameUrl = undefined;

        this.sportservice
          .sSCasino_POST(
            new CasinoRequest(
              casino,
              type,
              undefined,
              isDemo,
              this.deviceInfo.deviceType,
              undefined,
              undefined
            )
          )
          .subscribe((resp) => {
            if (resp && resp.url) {
              this.router.navigateByUrl('/casino/' + casino, {
                state: { iframeurl: resp.url },
              });
            } else {
              this.toastService.show(resp.msg.message, {
                classname: 'bg-danger text-light',
                delay: 1000,
              });
            }
          })

      }
    }
  }
}
