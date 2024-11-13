import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CheckAuthService } from '../../services/check-auth.service';
import { Router } from '@angular/router';
import { BackendService, _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { Meta } from '@angular/platform-browser';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtillsService } from '../../services/utills.service';
import { GenericService } from '../../services/generic.service';
import { WalletService } from '../../services/wallet.service';
import { SettingsComponent } from '../../settings/settings.component';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.scss'],
})
export class MenuitemsComponent implements OnInit {
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  paymentDetails: any;
  isLogin!: boolean;
  showWhatsapp: boolean = true;
  isb2c: boolean = _window().isb2c;
  isShowDownlaodApp: boolean = false;
  siteLogo: any;
  depositLink: any;
  appLinkLive: any = 'https://magicwin1.app/game';
  Menuhome: any;
  MenuCasino: any;
  MenuMultiplayer: any;
  Menusports: any;
  MenuEsports: any;
  MenuProvider: any;
  MenuAccessibility: any;
  MenuPopularGames: any;
  bannercdnLanding = '';
  menuItemBackImg = '';
  showMenuBanner: boolean = false;
  constructor(
    private bottomSheet: MatBottomSheet,
    private checkauthservice: CheckAuthService,
    public router: Router,
    private storageService: StorageService,
    private sportservice: BackendService,
    private meta: Meta,
    private genericService: GenericService,
    private utillsService: UtillsService,
    private walletService: WalletService
  ) {
    this.sportservice.gameUrl = undefined;
    if (_window().showMenuBanner) {
      this.showMenuBanner = _window().showMenuBanner;
    }
    if (_window().bannercdnLanding) {
      this.bannercdnLanding = _window().bannercdnLanding;
    }

    if (_window().isShowDownlaodApp) {
      this.isShowDownlaodApp = _window().isShowDownlaodApp;
    }
    if (_window().appLinkLive) {
      this.appLinkLive = _window().appLinkLive;
    }
    if (_window().menuItemBackImg) {
      this.menuItemBackImg = _window().menuItemBackImg;
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().siteLogo) {
      this.siteLogo = _window().siteLogo;
    }

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }

  forWhatsapp() {
    if (this.isLogin) {
      this.utillsService.whatsappForCutomerSupprtOrId('CA');
      this.closeModal();
    } else {
      this.utillsService.whatsappForCutomerSupprtOrId('WAB4');
    }
  }

  closeModal() {
    this.bottomSheet.dismiss();
  }

  routerLink(link: any, boolean: any) {
    if (boolean) {
      if (!this.checkauthservice.IsLogin()) {
        this.openLoginModal();
      } else {
        this.closeModal();
        this.router.navigate([link]);
      }
    } else {
      this.router.navigate([link]);
      this.closeModal();
    }
  }

  routeToLink(item: any) {
    if (
      !this.checkauthservice.IsLogin() &&
      item.link.includes('casino/detail')
    ) {
      this.genericService.openLoginModal();
    } else {
      this.router.navigate([item.link]);
      this.closeModal();
    }
  }

  openMyMartkesModal() {
    if (this.checkauthservice.IsLogin()) {
      this.utillsService.routeToLink({
        link: '',
        text: 'My Market',
      });
    } else {
      this.openLoginModal();
    }
    this.closeModal();
  }
  deviceInfo: any;
  showMenu = true;

  ngOnInit(): void {
    this.isLogin = this.checkauthservice.IsLogin();
    if (this.isLogin) {
      this.utillsService.configData.subscribe(() => {
        this.depositLink = this.utillsService.depositLink;
      });
    }
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        this.Menuhome = this.utillsService.returnFormatedData(resp, 'Menuhome');
        this.MenuCasino = this.utillsService.returnFormatedData(
          resp,
          'MenuCasino'
        );
        this.MenuMultiplayer = this.utillsService.returnFormatedData(
          resp,
          'MenuMultiplayer'
        );
        this.Menusports = this.utillsService.returnFormatedData(
          resp,
          'Menusports'
        );
        this.MenuEsports = this.utillsService.returnFormatedData(
          resp,
          'MenuEsports'
        );
        this.MenuProvider = this.utillsService.returnFormatedData(
          resp,
          'MenuProvider'
        );
        this.MenuPopularGames = this.utillsService.returnFormatedData(
          resp,
          'MenuPopularGames'
        );
        this.MenuAccessibility = this.utillsService.returnFormatedData(
          resp,
          'MenuAccessibility'
        );
      }
    });
    this.getPaymentDetail();
  }

  getPaymentDetail() {
    this.walletService.walletDetail.subscribe((payment: any) => {
      if (payment) {
        this.paymentDetails = payment;
      }
    });
  }

  home() {
    this.router.navigate(['/']);
  }

  openSetting() {
    if (this.checkauthservice.IsLogin()) {
      const config = {
        panelClass: 'menu-item-dialog', // Optional: for custom styles
      };
      const bottomSheetRef = this.bottomSheet.open(SettingsComponent, config);
      bottomSheetRef.afterDismissed().subscribe(() => { });
    } else {
      this.openLoginModal();
    }
  }
  openLoginModal() {
    this.genericService.openLoginModal();
  }

  logout() {
    this.storageService.removeItem('token');
    this.storageService.removeItem('client');
    localStorage.removeItem('showAgreementOnce');
    localStorage.removeItem('routeCasino');
    this.router.navigate(['/sports']).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name=theme-color');
  }
}
