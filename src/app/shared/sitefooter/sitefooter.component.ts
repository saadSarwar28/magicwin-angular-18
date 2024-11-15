import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MenuitemsComponent } from '../menuitems/menuitems.component';
import { ModalService } from '../services/modal.service';
import { UtillsService } from '../../services/utills.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GenericService } from "../../services/generic.service";
import { MymarketsComponent } from '../../sports/mymarkets/mymarkets.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PlatformService } from '../../services/platform.service';
@Component({
  selector: 'app-sitefooter',
  templateUrl: './sitefooter.component.html',
  styleUrls: ['./sitefooter.component.scss'],
  animations: [
    trigger('bottomToTop', [
      state('void', style({
        bottom: '-100px' // Start below the container
      })),
      state('in', style({
        bottom: '17px' // Move to the top
      })),
      transition('void => in', [
        animate('0.5s')
      ]),
      transition('in => void', [
        animate('0.5s')
      ])
    ])
  ],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class SitefooterComponent implements OnInit {
  dropdown: number = 0;
  changeNavColor: boolean = false;
  isShowStream: boolean = false;
  showBeforeLive: boolean = false;
  toggleBottomSheet: boolean = false
  footerWhatsAppMulti: boolean = false;
  isMagicwin: boolean = true;
  sitename: string = ''
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  constructor(
    private checkauthservice: CheckAuthService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private genericService: GenericService,
    private modalService: ModalService,
    private utillsService: UtillsService,
    private dialogRef: MatDialog,
    private platformService: PlatformService

  ) {

  }



  isLogin: boolean = false;
  configData: any;
  depositWpLink: boolean = false
  withDrawWpLink: boolean = false
  teleLinkBefore: string = ""
  teleLinkAfterLogin: string = ""
  homeObj: any = {}
  casinoObj: any = {}
  sportsObj: any = {}
  myMarketObj: any = {}
  myBetsObj: any = {}
  menuObj: any = {}
  backObj: any = {}
  cdnSportsLanding: string = ''
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      if (_window().cdnImagesUrl) {
        this.cdnUrl = _window().cdnImagesUrl;
      }
      this.cdnSportsLanding = _window().bannercdnLanding;

      if (_window().sitename) {
        this.sitename = _window().sitename;
      }
      this.isMagicwin = _window().isMagicwin;
      if (_window().footerWhatsAppMulti) {
        this.footerWhatsAppMulti = _window().footerWhatsAppMulti;
      }
      this.isLogin = this.checkauthservice.IsLogin();
      if (_window().isLiveStreamEnable && !this.isLogin) {
        this.isShowStream = true
      }
      else if (!_window().isLiveStreamEnable && !this.isLogin) {
        this.isShowStream = false
      }

      if (_window().isLiveStreamEnable && !this.isLogin) {
        this.showBeforeLive = false
      }
      else if (!_window().isLiveStreamEnable && !this.isLogin) {
        this.showBeforeLive = true
      }
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url.startsWith('/games') || this.router.url.startsWith('/casino')) {
            this.changeNavColor = true;
          } else {
            this.changeNavColor = false;
          }
        }
      })
      this.utillsService.configData.subscribe(((res: any) => {
        if (res) {
          this.configData = res;
          let depositLink = this.configData.find((item: any) => item.type === 'deposit');
          if (depositLink && depositLink.data && depositLink.data.length > 0) {
            this.depositWpLink = true
          }
          let telegramConfig = this.configData.find((item: any) => item.type === 'TGAL');

          if (telegramConfig && telegramConfig.data && telegramConfig.data.length > 0) {
            this.teleLinkAfterLogin = telegramConfig.data[0].link
          }
          let withDrawWpLink = this.configData.find((item: any) => item.type === 'withdraw');
          if (withDrawWpLink && withDrawWpLink.data && withDrawWpLink.data.length > 0) {
            this.withDrawWpLink = true
          }
        }
      }))
      this.utillsService.bannerData.subscribe(((res: any) => {
        if (res) {
          let telegramLink = res.find((item: any) => item.type === 'TGB4');
          if (telegramLink && telegramLink.data && telegramLink.data.length > 0) {
            this.teleLinkBefore = telegramLink.data[0].link;
          }
          let mobSiteFooterMenu = this.utillsService.returnFormatedData(res, 'mobSiteFooterMenu');
          for (const element of mobSiteFooterMenu) {

            if (element.text.replace(/ /g, "") == 'Home') {
              this.homeObj = element
            }
            else if (element.text.replace(/ /g, "") == 'Casino') {
              this.casinoObj = element
            }
            else if (element.text.replace(/ /g, "") == 'Sports') {
              this.sportsObj = element
            }
            else if (element.text.replace(/ /g, "") == 'MyMarket') {
              this.myMarketObj = element
            } else if (element.text.replace(/ /g, "") == 'Menu') {
              this.menuObj = element
            }
            else {
              this.backObj = element
            }
          }
        }
      }))
    }
  }

  OpenWhatsApp() {
    if (this.isLogin) {
      this.utillsService.whatsappForWithDrawOrDeposit("WAAL")
    } else {
      this.utillsService.whatsappForCutomerSupprtOrId("WAB4")
    }
  }


  closeModal() {
    this.display = false;
  }
  display = false;
  onPress() {
    this.display = !this.display;
    document.documentElement.style.overflow = 'scroll';
    return
  }
  navigateToVirtualSports() {
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate(['/casino/detail/BR/lobby'])
    } else {
      this.genericService.openLoginModal()
    }
  }

  forTelegramId() {
    this.isLogin ? window.open(this.teleLinkAfterLogin, '_blank') : window.open(this.teleLinkBefore, '_blank');
  }
  forWhatsAppId() {
    this.utillsService.whatsappForCutomerSupprtOrId('WAB4')
  }
  forWhatsAppSupport() {
    this.utillsService.whatsappForCutomerSupprtOrId('CA')
  }

  forWhatsAppWithDraw() {
    this.utillsService.whatsappForWithDrawOrDeposit('withdraw')
  }
  forWhatsAppDeposit() {
    this.utillsService.whatsappForWithDrawOrDeposit('deposit')
  }

  openMenuItem() {
    const config = {
      panelClass: 'menu-item-dialog', // Optional: for custom styles
    };
    const bottomSheetRef = this.bottomSheet.open(MenuitemsComponent, config);
    bottomSheetRef.afterDismissed().subscribe(() => {
    });

  }

  openMyMarkets() {
    this.dialogRef.open(MymarketsComponent, {
      width: '700px',
      maxHeight: '70vh',
      maxWidth: '95vw',
      panelClass: 'my-markets-dialog',

    });
  }

  routeToCasino(provider: any, gameId: any, bool: any) {
    this.utillsService.routeToCasino(provider, gameId, bool, "", false, true)
  }
  closePopup() {
    this.openWhatsPopup = false
  }
  hideShowSetting(event: any) {
    event.stopPropagation();
    this.openWhatsPopup = !this.openWhatsPopup;
  }
  openWhatsPopup: boolean = false;

  openGame(provider: any, gameId?: any, isCheckUrl: boolean = false, tableId?: any) {
    let data = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
    }
    this.modalService.open(data)
  }


}
