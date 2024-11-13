import { Component, OnDestroy, OnInit, } from '@angular/core';
import { CheckAuthService } from '../services/check-auth.service';
import { Router, } from '@angular/router';
import {
  _window,
} from '../services/backend.service';
import { StorageService } from '../services/storage.service';
import { Meta } from '@angular/platform-browser';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtillsService } from '../services/utills.service';
import { GenericService } from '../services/generic.service';
import { WalletService } from '../services/wallet.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [],
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class SettingsComponent implements OnInit, OnDestroy {

  cdnUrl: any = 'https://iriscdn.b-cdn.net/';

  paymentDetails: any;
  isLogin!: boolean;
  depositLink = '';
  walletTimer: any = 1000;
  walletTimerGame: any = 1000;
  isb2c: boolean = _window().isb2c;
  isShowDownlaodApp: boolean = false;
  reportSectionArr: any;
  accountSectionArr: any;
  appLinkLive: string = ''
  menuItemBackImg: string = ''
  settingMenuArrowImg: string = ''
  constructor(
    private bottomSheet: MatBottomSheet,
    private checkauthservice: CheckAuthService,
    public router: Router,
    private storageService: StorageService,
    private meta: Meta,
    private utillsService: UtillsService,
    private genericService: GenericService,
    private walletService: WalletService

  ) {

    if (_window().isShowDownlaodApp) {
      this.isShowDownlaodApp = _window().isShowDownlaodApp;
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().walletTimer) {
      this.walletTimer = _window().walletTimer;
    }
    if (_window().menuItemBackImg) {
      this.menuItemBackImg = _window().menuItemBackImg;
    }
    if (_window().settingMenuArrowImg) {
      this.settingMenuArrowImg = _window().settingMenuArrowImg;
    }
    if (_window().walletTimerGame) {
      this.walletTimerGame = _window().walletTimerGame;
    }
    if (_window().appLinkLive) {
      this.appLinkLive = _window().appLinkLive;
    }
    this.meta.addTags([{ name: 'theme-color', content: '#1b1f1c' }]);
    this.isLogin = this.checkauthservice.IsLogin();
  }

  toggleItems = {
    profile: true,
    reports: true,
    accounts: false
  }

  toggleItem(item) {
    this.toggleItems[item] = !this.toggleItems[item]
  }
  closeModal() {
    this.bottomSheet.dismiss();
  }

  routeToLink(link: any) {
    this.closeModal();
    this.router.navigate([link]);
  }

  nameClient: any = ''
  ngOnInit(): void {
    this.nameClient = this.storageService.secureStorage.getItem('client');
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.reportSectionArr = Array.from(d).filter(
          (x: any) => x.type === 'accountSection'
        );
        this.accountSectionArr = Array.from(d).filter(
          (x: any) => x.type === 'accountSectionArr'
        );
      }
    });
    this.isLogin = this.checkauthservice.IsLogin();
    this.loadBalance();
    this.utillsService.configData.subscribe(() => {
      this.depositLink = this.utillsService.depositLink;
    });
  }

  loadBalance() {
    this.walletService.walletDetail.subscribe((payment) => {
      if (payment) {
        this.paymentDetails = payment;
      }
    });
  }
  home() {
    this.router.navigate(['/']);
  }

  logout() {
    this.storageService.secureStorage.removeItem('token');
    this.storageService.secureStorage.removeItem('client');
    localStorage.removeItem('showAgreementOnce');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  openLoginModal() {
    this.genericService.openLoginModal();
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name=theme-color');
  }

}
