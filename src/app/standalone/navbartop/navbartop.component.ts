import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';
import { _window } from '../../services/backend.service';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavSettingComponent } from '../nav-setting/nav-setting.component';
import { LoginSignupButtonsComponent } from '../login-signup-buttons/login-signup-buttons.component';
import { NavMenusComponent } from '../nav-menus/nav-menus.component';
import { NewstickerComponent } from '../newsticker/newsticker.component';

@Component({
  selector: 'app-navbartop',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NavSettingComponent,
    LoginSignupButtonsComponent,
    NavMenusComponent,
    NewstickerComponent,
  ],
  templateUrl: './navbartop.component.html',
  styleUrl: './navbartop.component.scss',
})
export class NavbartopComponent implements OnInit {
  isLogin: boolean = false;
  paymentDetails: any;
  sendingrequest = false;
  walletTimer: any = 1000;
  isShowDownlaodApp: boolean = false;
  siteLogo: string = '';
  logoHeight = 35; // default height according to magicwin
  logoForWeb: string = '';
  sitename: string = '';
  @Input() hideSidebar: boolean = false;
  @Output() toggleSideBar: EventEmitter<boolean> = new EventEmitter<boolean>(
    true
  );

  constructor(
    public router: Router,
    public translate: TranslateService,
    private checkauthservice: CheckAuthService,
    private utillsService: UtillsService,
    private walletService: WalletService
  ) {
    if (_window().siteLogoMobile) {
      this.siteLogo = _window().siteLogoMobile;
    }
    if (_window().navBarLogo) {
      this.logoForWeb = _window().navBarLogo;
    }
    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    if (_window().siteLogoHeight) {
      this.logoHeight = _window().siteLogoHeight;
    }
  }

  toggle: boolean = true;
  toggleSideBarMenu() {
    this.toggle = !this.toggle;
    this.toggleSideBar.emit(this.toggle);
  }

  landingPage: boolean = false;
  innerNav: any;
  outerNav: any;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isTabView();
    this.toggleSideBarFun();
  }

  private isTabView(): void {
    this.isMobile = window.innerWidth <= 992;
  }
  currentUrl = '';
  private toggleSideBarFun(): void {
    if (!this.hideSideBarOn.includes(this.currentUrl)) {
      this.toggle = window.innerWidth <= 1200;
      this.toggleSideBarMenu();
    }
  }
  casinoIframe: boolean = false;
  isIframe: boolean = false;
  hideSideBarOn: string[] = ['casino', 'reports', 'user', 'deposit'];
  isSidebarOpen: boolean = true;
  ngOnInit(): void {
    this.isTabView();
    this.toggleSideBarFun();
    if (this.router.url === '/home' || this.router.url === '/') {
      this.landingPage = true;
    } else {
      this.landingPage = false;
    }
    if (_window().isIframe) {
      this.isIframe = _window().isIframe;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let url: any = event.url;
        if (url === '/home' || url === '/') {
          this.landingPage = true;
        } else {
          this.landingPage = false;
        }
      }
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects.split('/')[1];
        this.casinoIframe = event.urlAfterRedirects.includes('/casino/detail/');
        this.isSidebarOpen = !this.hideSideBarOn.includes(this.currentUrl);
        if (this.hideSideBarOn.includes(this.currentUrl)) {
          this.toggle = true;
          this.toggleSideBarMenu();
        } else {
          this.toggle = window.innerWidth <= 1200;
          this.toggleSideBarMenu();
        }
      }
    });
    this.isLogin = this.checkauthservice.IsLogin();
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.innerNav = this.utillsService.returnFormatedData(d, 'TOP_NAV');
        this.outerNav = this.utillsService.returnFormatedData(
          d,
          'TopLiveCasino'
        );
      }
    });

    if (this.isLogin) {
      this.walletService.walletDetail.subscribe((res) => {
        if (res) {
          this.paymentDetails = res;
        }
      });

      this.walletService.loadBalance();
      this.walletService.startWalletTimer();
    }
  }

  ngOnDestroy(): void {}
}
