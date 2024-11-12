import {
  AfterViewInit,
  Component,
  OnInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import {
  Router,
  Event,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import {
  BackendService,
  CasinoRequest,
  _window,
} from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { CheckAuthService } from '../services/check-auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Meta } from '@angular/platform-browser';
import { RoutingStateService } from '../shared/services/router-state.service';
import { iFrameResizer } from '../../assets/lmtScore/sports-radar';
import { GenericService } from '../services/generic.service';
import { WalletTimerService } from '../services/timer.service';
import { UtillsService } from '../services/utills.service';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css'],
})
export class CasinoComponent implements OnInit, AfterViewInit, OnDestroy {
  buttonStyles = {
    top: '0px',
    left: '0px',
  };
  private isDragging = false;
  private startPosition!: { x: number; y: number };
  private offset!: { x: number; y: number };

  data: any;
  loading = true;
  iframeurl: any;
  isDetail = false;
  marginToShowProductsTab: boolean = false;
  deviceInfo: any;
  iframeLoad: boolean = false;
  isLoggedIn: boolean = false;
  providerCode: string = '';
  gameId: string | undefined = '';
  tableId: string | undefined;
  listener: any;
  getHeight: any = 0;
  currentPlatform: any = '';
  winOrMob: any = '';
  PlatformOS: any = '';
  showMsg: any = '';
  showWhatsapp: boolean = true;
  previousRoute!: string;
  isGameError!: boolean;
  gameInvalidTokenMsg!: any;
  isLobby!: boolean;
  type: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService,
    private sportservice: BackendService,
    private toastService: ToastService,
    private meta: Meta,
    private routingStateService: RoutingStateService,
    private genericService: GenericService,
    private walletService: WalletService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let sportsBookNew = typeof (_window().sportsbookParameter) == 'string' ? JSON.parse(_window().sportsbookParameter) : _window().sportsbookParameter
        if (
          event.url ==
          `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid
          }`
        ) {
          this.showWhatsapp = false;
        } else {
          this.showWhatsapp = true;
        }
      }
    });
    if (_window().gameInvalidTokenMsg) {
      this.gameInvalidTokenMsg = _window().gameInvalidTokenMsg;
    }
    this.meta.addTags([{ name: 'theme-color', content: '#1b1f1c' }]);
    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
    }
    this.deviceInfo = this.deviceService.getDeviceInfo();
    setTimeout(() => {
      this.loading = false;
      iFrameResizer('state');
    }, 1500);
  }

  ngOnDestroy(): void {
    this.sportservice.gameUrl = undefined;
    clearInterval(this.newWalletInterval)
    this.walletService.startWalletTimer()

  }

  getPlatform() {
    var platform = ['Win32', 'Android', 'iOS'];

    for (var i = 0; i < platform.length; i++) {
      if (navigator.platform.indexOf(platform[i]) > -1) {
        this.winOrMob = platform[i];
      }
    }
  }

  ngAfterViewInit(): void {
    this.fullScreen();
  }

  showNews = false;

  newWalletInterval: any;
  ngOnInit(): void {
    this.walletService.stopWalletTimer()
    if (this.checkauthservice.IsLogin()) {
      this.newWalletInterval = setInterval(() => this.walletService.loadBalance(), 2000)
    }
    this.getPlatform();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // alert(this.deviceInfo.browser);
    this.currentPlatform = this.deviceInfo.browser;
    this.PlatformOS = this.deviceInfo.os;
    let sportsBookNew = typeof (_window().sportsbookParameter) == 'string' ? JSON.parse(_window().sportsbookParameter) : _window().sportsbookParameter
    if (
      this.router.url ==
      `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid
      }`
    ) {
      this.marginToShowProductsTab = true;
    } else {
      this.marginToShowProductsTab = false;
    }

    // this.router.events.subscribe((v) => {

    //   if (v instanceof NavigationEnd) {
    this.route.params.subscribe((p: any) => {
      this.sportservice.gameUrl = undefined
      this.iframeurl = undefined
      this.fullScreen();
      this.showNews = true;
      //  Checking if provider is not QTC there no demo
      if (p.providercode != 'QTC' && !this.isLoggedIn) {
        this.router.navigate(['/casino']);
      }

      if (p.gameid == 'lobby') {
        this.isLobby = true;
        this.type = this.route.snapshot.queryParams['type'];
      }

      if (!this.sportservice.gameUrl) {
        if (p.providercode && p.gameid == 'lobby') {
          // Load the game lobby directly without id (from footer)
          this.providerCode = p.providercode;
          this.gameId = undefined;
          this.tableId = undefined;
          this.loadCasino(this.providerCode, this.gameId, this.tableId);
        } else if (p.providercode && p.gameid) {
          // Loading game by gameid
          this.providerCode = p.providercode;
          this.gameId = p.gameid;

          if (this.gameId?.includes('tableid')) {
            this.loadCasino(
              this.providerCode,
              this.gameId.split('?')[0],
              this.gameId?.split('=')[1]
            );
          } else {
            this.loadCasino(this.providerCode, this.gameId, this.tableId);
          }
        }
      } else {
        this.loading = true;
        this.iframeurl = this.sportservice.gameUrl;
        if (this.isLobby && this.providerCode == 'QTC' && this.type == 'live') {
          this.iframeurl +=
            '/games/wl-liveCasinoGames/wl.games.liveCasinoGames';
        }
      }

      //   });
      // }
    });

    const pageHeight = window.innerHeight;
    // if(pageHeight && !isNaN(pageHeight)){
    //   const btnHeight = pageHeight / 2.2;
    //   this.buttonStyles.top = btnHeight + 'px';
    // }
    // this.fullScreen();
  }

  fullScreen() {
    try {
      const elem: any = document.getElementById('iframe-content');
      if (elem) {
        elem.classList.add('iframe-content-full');
      }
      const whatsApp: any = document.getElementById(
        'whatsAppSettingsAfterLogin-settings'
      );
      if (whatsApp) {
        whatsApp.classList.add('d-none');
      }
      const topNav: any = document.getElementById('header');
      // console.log("header",topNav)
      if (topNav) {
        topNav.style.display = 'none';
      }

      var site_footers = document.getElementsByClassName('site_footer');
      for (var i = 0; i < site_footers.length; i++) {
        let ele: any;
        ele = site_footers[i];
        if (ele) {
          ele.style.display = 'none';
        }
      }
      this.backbtnShow();
      const whatsAppNoLoging: any = document.getElementById(
        'whatsAppSettingsAfterLogin-settings-nologin'
      );
      if (whatsAppNoLoging) {
        whatsAppNoLoging.classList.add('d-none');
      }
      setTimeout(() => {
        const noLoginwhatsApp: any =
          document.getElementsByClassName('chaport-container');
        if (noLoginwhatsApp?.length > 0) {
          noLoginwhatsApp[0].classList.add('dis-none');
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  backbtnShow() {
    const button: any = document.getElementById('btn-content100');
    if (button) {
      button.classList.remove('d-none');
    }
    const iframe: any = document.getElementById('iframe-casino');
    if (iframe) {
      iframe.classList.add('androidHeight-fullscreen');
    }
  }

  back() {
    //TODO: Replicated in app.component.ts
    try {
      let doc: any = document;
      const elem: any = document.getElementById('content100');
      this.backbtnHide(true);
      const iframe: any = document.getElementById('iframe-content');
      if (iframe) {
        iframe.classList.remove('iframe-content-full');
      }
      const topNav: any = document.getElementById('header');
      if (topNav) {
        topNav.style.display = 'block';
      }
      var site_footers = document.getElementsByClassName('site_footer');
      for (var i = 0; i < site_footers.length; i++) {
        let ele: any;
        ele = site_footers[i];
        if (ele) {
          ele.style.display = 'block';
        }
      }
      const whatsApp: any = document.getElementById(
        'whatsAppSettingsAfterLogin-settings'
      );
      if (whatsApp) {
        whatsApp.classList.remove('d-none');
      }
      const whatsAppNoLoging: any = document.getElementById(
        'whatsAppSettingsAfterLogin-settings-nologin'
      );
      if (whatsAppNoLoging) {
        whatsAppNoLoging.classList.remove('d-none');
      }
      const noLoginwhatsApp: any =
        document.getElementsByClassName('chaport-container');
      if (noLoginwhatsApp?.length > 0) {
        noLoginwhatsApp[0].classList.remove('dis-none');
      }
    } catch (error) {
      console.log(error);
    }
  }

  backbtnHide(val?: any) {
    const button: any = document.getElementById('btn-content100');
    if (button) {
      button.classList.add('d-none');
    }
    const iframe: any = document.getElementById('iframe-casino');
    iframe.classList.remove('androidHeight-fullscreen');
    if (val) {
      this.backNavigate();
    }
  }

  backNavigate() {
    this.previousRoute = this.routingStateService.getPreviousUrl();
    this.router.navigate([this.previousRoute]);
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
        undefined
      )
      .then((x) => {
        if (x.url) {
          this.loading = true;
          this.iframeurl = x.url;
          if (
            this.isLobby &&
            this.providerCode == 'QTC' &&
            this.type == 'live'
          ) {
            this.iframeurl +=
              '/games/wl-liveCasinoGames/wl.games.liveCasinoGames';
          }
        } else {
          this.toastService.show(
            Object.keys(x.msg).length > 0
              ? x.msg.message || x.msg
              : x.msg || x.message,
            {
              classname: 'bg-danger text-light',
              delay: 5000,
            }
          );
          let checkObject = typeof x.msg === 'object';
          let message = '';
          if (checkObject) {
            message = x.msg.message;
          } else if (x.message) {
            message = x.message;
          } else {
            message = x.msg;
          }
          if (this.gameInvalidTokenMsg) {
            this.showMsg = this.gameInvalidTokenMsg.description;
            this.isGameError = false;
          } else {
            this.isGameError = true;
            this.showMsg = message;
          }
        }
      })
      .catch((err) => {
        this.toastService.show(this.gameInvalidTokenMsg.description ?? err, {
          classname: 'bg-danger text-light',
          delay: 1500,
        });

        if (err.status == 401) {
          this.openLoginModal();
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        // document.getElementById("overlay-loader")!.style.display = "none";
        setTimeout(() => {
          this.loading = false;
          this.iframeLoad = true;
        }, 500);
      });
  }

  openLoginModal() {
    this.genericService.openLoginModal();
  }

  loadIframe() {
    setTimeout(() => {
      this.iframeLoad = true;
    }, 1000);
  }

  //TODO: Move this to seperate component if replicate (Floating button)

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const offsetX = event.clientX - this.startPosition.x;
      const offsetY = event.clientY - this.startPosition.y;
      this.buttonStyles = {
        ...this.buttonStyles,
        top: `${this.offset.y + offsetY}px`,
        left: `${this.offset.x + offsetX}px`,
      };
    }
  }

  @HostListener('document:mouseup')
  handleMouseUp() {
    this.isDragging = false;
  }

  @HostListener('document:touchmove', ['$event'])
  handleTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      const touch = event.touches[0];
      const offsetX = touch.clientX - this.startPosition.x;
      const offsetY = touch.clientY - this.startPosition.y;
      this.buttonStyles = {
        ...this.buttonStyles,
        top: `${this.offset.y + offsetY}px`,
        left: `${this.offset.x + offsetX}px`,
      };
    }
  }

  @HostListener('document:touchend')
  handleTouchEnd() {
    this.isDragging = false;
  }

  handleMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startPosition = { x: event.clientX, y: event.clientY };
    this.offset = {
      x: parseInt(this.buttonStyles.left),
      y: parseInt(this.buttonStyles.top),
    };
  }

  handleTouchStart(event: TouchEvent) {
    this.isDragging = true;
    const touch = event.touches[0];
    this.startPosition = { x: touch.clientX, y: touch.clientY };
    this.offset = {
      x: parseInt(this.buttonStyles.left),
      y: parseInt(this.buttonStyles.top),
    };
  }
}
