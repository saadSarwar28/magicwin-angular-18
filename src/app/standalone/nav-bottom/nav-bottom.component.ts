import { Component, OnInit } from '@angular/core';
import { RoutingStateService } from '../../services/router-state.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { GetStatusService } from '../../services/get-status.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';
import { WalletService } from '../../services/wallet.service';
import { _window } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MybetsmodalComponent } from '../mybetsmodal/mybetsmodal.component';
import { MenuitemsComponent } from '../menuitems/menuitems.component';

@Component({
  selector: 'app-nav-bottom',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MybetsmodalComponent,
    MenuitemsComponent
  ],
  templateUrl: './nav-bottom.component.html',
  styleUrl: './nav-bottom.component.scss'
})
export class NavBottomComponent implements OnInit {
  previousRoute!: string;
  isGameError!: boolean;
  paymentDetails: any;
  sendingrequest!: boolean;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  isLogin!: boolean;
  display: boolean = false;
  showLiability: boolean = false;
  walletTimer: any = 1000;
  walletTimerGame: any = 1000;
  navbottomIcon: any;
  showMyBets: boolean = false;
  isIframe: boolean = false;
  menuBottomNav: any;
  navBottomNav: any;
  closeBottomNav: any;
  navBottomMyBets: any;
  navBottomBack: any;

  constructor(
    private routingStateService: RoutingStateService,
    private location: Location,
    private router: Router,
    private checkauthservice: CheckAuthService,
    private getStatus: GetStatusService,
    private bottomSheet: MatBottomSheet,
    private utillsService: UtillsService,
    private dialog: MatDialog,
    private walletService: WalletService

  ) {
    this.getStatus.data$.subscribe((data) => {
      this.display = data;
    });
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().closeBottomNav) {
      this.closeBottomNav = _window().closeBottomNav;
    }
    if (_window().navBottomMyBets) {
      this.navBottomMyBets = _window().navBottomMyBets;
    }
    if (_window().navBottomBack) {
      this.navBottomBack = _window().navBottomBack;
    }
    if (_window().isIframe) {
      this.isIframe = _window().isIframe;
    }
    if (_window().menuBottomNav) {
      this.menuBottomNav = _window().menuBottomNav;
    }
    if (_window().navbottomIcon) {
      this.navbottomIcon = _window().navbottomIcon;

    }
    if (_window().walletTimer) {
      this.walletTimer = _window().walletTimer;
    }
    if (_window().walletTimerGame) {
      this.walletTimerGame = _window().walletTimerGame;
    }
    if (_window().showMyBets) {
      this.showMyBets = _window().showMyBets;
    }
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        let sportsBookNew = typeof (_window().sportsbookParameter) == 'string' ? JSON.parse(_window().sportsbookParameter) : _window().sportsbookParameter
        if (v.url.startsWith('/casino')) {
          this.display = false;
          this.bottomSheet.dismiss();
        }
        if (
          v.urlAfterRedirects ==
          `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid
          }`
        ) {
          this.showLiability = true;
          // return
        } else if (
          v.url.startsWith('/casino') &&
          v.urlAfterRedirects !=
          `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid
          }`
        ) {
          this.showLiability = false;
        } else {
          this.showLiability = true;
        }
      }
    });
  }

  openBetModal: boolean = true;

  openBetsModal() {
    this.openBetModal = false
    const config = {
      panelClass: 'my-bets-dialog', // Optional: for custom styles
    };
    const bottomSheetRef = this.bottomSheet.open(MybetsmodalComponent, config);
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.openBetModal = true
    });
  }



  goToHome() {
    this.router.navigate(['/home']);
    this.closeModal()
  }

  currentBets: any[] = [];
  menuObj: any = {};
  homeObj: any = {};
  backObj: any = {};
  ngOnInit(): void {
    this.isLogin = this.checkauthservice.IsLogin();
    this.loadBalance();
    this.utillsService.currentBets.subscribe((data: any) => {
      if (data) {
        this.currentBets = data.bets;
      }
    });
    this.utillsService.bannerData.subscribe((res => {
      if (res) {
        let mobSiteFooterMenu = this.utillsService.returnFormatedData(res, 'mobSiteFooterMenu');
        for (const element of mobSiteFooterMenu) {

          if (element.text.replace(/ /g, "") == 'Home2') {
            this.homeObj = element
          }
          else if (element.text.replace(/ /g, "") == 'Menu2') {
            this.menuObj = element
          }
          else if (element.text.replace(/ /g, "") == 'Back') {
            this.backObj = element
          }

        }
      }
    }))

  }

  ngOnDestroy(): void {
  }





  closeModal() {
    this.bottomSheet.dismiss();
    this.dialog.closeAll()
  }

  onOpenModal() {
    this.display = true
    const config = {
      panelClass: 'menu-item-dialog', // Optional: for custom styles
    };
    const bottomSheetRef = this.bottomSheet.open(MenuitemsComponent, config);
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.display = false
    });
  }

  loadBalance() {
    this.walletService.walletDetail.subscribe((payment) => {
      if (payment) {
        this.paymentDetails = payment;
      }
    });
  }

  back() {
    //TODO: Replicated in app.component.ts
    this.closeModal()

    const isIframe: any = document.getElementById('iframe-content');
    if (!isIframe) {
      // console.log(' in is iframe =================================')
      this.backNavigate();
      this.getStatus.updateData(false);
      return;
    }
    try {
      // console.log(' in try statement ++++++++++++++++++++++++++')
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
        let ele;
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

  backbtnHide(val?) {
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
    // this.location.back();
    this.previousRoute = this.routingStateService.getPreviousUrl();
    // console.log('this.previousRoute', this.previousRoute);

    if (this.previousRoute.includes('casino/detail')) {
      this.home();
    } else {
      //if user click back from blog detail page (need to refresh meta tag in index)
      if (
        this.router.url?.includes('/blog/') ||
        this.router.url?.includes('/mobile-casino/') ||
        this.router.url?.includes('/tips/')
      ) {
        this.router.navigateByUrl(this.previousRoute).then(() => {
          window.location.reload();
        });
      } else {
        this.router.navigateByUrl(this.previousRoute);
      }
    }
  }

  home() {
    this.router.navigate(['/']);
  }

  locationBack() {
    // this.location.back();
  }
}
