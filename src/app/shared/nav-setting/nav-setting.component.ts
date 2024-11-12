import { Component, OnInit, Input } from '@angular/core';
import { CheckAuthService } from '../../services/check-auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { _window } from '../../services/backend.service';
import { Meta } from '@angular/platform-browser';
import { WalletTimerService } from '../../services/timer.service';
import { UtillsService } from '../../services/utills.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RecentMarketsComponent } from '../recent-markets/recent-markets.component';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-nav-setting',
  templateUrl: './nav-setting.component.html',
  styleUrls: ['./nav-setting.component.scss'],
})
export class NavSettingComponent implements OnInit {
  @Input() isBottom!: boolean;
  @Input() landingPage: boolean = false;
  @Input() isMobile: boolean = false;
  defaultDepositRoute = '';
  isLogin: boolean = false;
  ele: HTMLElement | undefined;
  navOpen: boolean = false;
  username: string = '';
  showHideReport: boolean = true;
  showHideAccount: boolean = false;
  reportSectionArr: any = [];
  accountSectionArr: any = [];
  showMenuIcons: any = false;
  enableKYC: any = false;
  isb2c: any = false;
  isreadonly: any;
  apkLink = _window().appLinkLive || 'https://magicwin1.app/game';
  isShowDownlaodApp: boolean = false;
  PGData: any;
  checkType: any;
  navigateValue: any;
  paymentDetails: any;
  showOneClickOptions: boolean = false;
  constructor(
    private checkauthservice: CheckAuthService,
    private storageService: StorageService,
    private router: Router,
    private meta: Meta,
    private utillsService: UtillsService,
    private bottomSheet: MatBottomSheet,
    private walletService: WalletService
  ) { }
  OCBEnabled: boolean = false;
  isIframe: boolean = false;

  ngOnInit(): void {

    this.OCBEnabled =
      this.storageService.secureStorage.getItem('OCB') == null
        ? false
        : this.storageService.secureStorage.getItem('OCB');
    this.utillsService.OCBEnabled.next(this.OCBEnabled);
    this.utillsService.OCBEnabled.subscribe((bool: any) => {
      this.OCBEnabled = bool;
    });
    this.utillsService.configData.subscribe(() => {
      this.navigateValue = this.utillsService.depositLink
    })
    this.walletService.walletDetail.subscribe((data: any) => {
      if (data) {
        this.paymentDetails = data
      }
    })
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.reportSectionArr = Array.from(d).filter(
          (x: any) => x.type === 'accountSection'
        );
        this.reportSectionArr = this.reportSectionArr[0].data;
        this.accountSectionArr = Array.from(d).filter(
          (x: any) => x.type === 'accountSectionArr'
        );
        this.accountSectionArr = this.accountSectionArr[0].data;
      }
    });
    this.checkauthservice.HaveStakes();
    if (_window().isb2c) {
      this.isb2c = _window().isb2c;
    }
    if (_window().isShowDownlaodApp) {
      this.isShowDownlaodApp = _window().isShowDownlaodApp;
    }
    if (_window().isIframe) {
      this.isIframe = _window().isIframe;
    }
    if (_window().hideOCBonComp) {
      this.showOneClickOptions = _window().hideOCBonComp;
    } else {
      this.showOneClickOptions = false;
    }
    this.isreadonly = this.meta.getTag("name='readonly'");
    this.isLogin = this.checkauthservice.IsLogin();
    this.username = this.storageService.secureStorage.getItem('client');

  }


  closePopup() {
    this.openSettingMenu = false;
  }

  openOneClickBet(event: any) {
    event.stopPropagation();
    this.openOBC = !this.openOBC;
  }


  openOBC: boolean = false;

  openSettingMenu: boolean = false
  openSetting() {
    this.openSettingMenu = !this.openSettingMenu

  }
  stopPropgation(event: any) {
    event.stopPropagation();

  }



  openRecentMarkets() {
    this.bottomSheet.open(RecentMarketsComponent);
  }

  routerLink(link: any) {
    this.closePopup()
    this.router.navigate([link])
  }

  logout() {
    this.storageService.secureStorage.removeItem('token');
    this.storageService.secureStorage.removeItem('client');
    this.storageService.secureStorage.removeItem('iframeLoggedin')
    localStorage.removeItem('showAgreementOnce');
    localStorage.removeItem('routeCasino');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  onSaveOneClickBet() {
    this.openSetting();
  }
}

