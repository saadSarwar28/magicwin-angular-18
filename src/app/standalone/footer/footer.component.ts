import { BrowserService } from './../../services/window.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from '../../services/generic.service';
import { VideoModalService } from '../../services/video-modal.service';
import { PlatformService } from '../../services/platform.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  storedTheme: any = 'darker_theme';
  email: any;
  title: any;
  active: boolean = false;
  isLogin: boolean = false;
  showWhatsapp: boolean = true;
  isShowTutorial: boolean = false;
  isShowPaymentsImages: boolean = false;
  showWhatsAppIconWithText: boolean = false;
  campaignSource: any = [];
  refferrer: any;
  whatsappText: any = 'Hello, I need an ID';
  beforeLoginWhatsappText: any = 'Hello, I need an ID of kheloyar.net';
  getInstantNum: any;
  whatsAppPhoneNumber: any;
  waData: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  siteLogo: string = '';
  facebookUrl: string = '';
  instagramUrl: string = '';
  twitterUrl: string = '';
  telegramUrl: string = '';
  skypeUrl: string = '';
  youtubeUrl: string = '';
  socialData: any = [];
  cdnSportsLanding: any;
  footerLinks2: any = [];
  footerLinks: any = [];
  appLinkLive: any;
  isShowDownlaodApp: boolean = false;
  isShowDownloadAppInWeb: boolean = false;
  isShowFavourites: boolean = false;
  // apkLink = this.browserService.getWindow().appLinkLive
  depositLink: string = '';
  apkLink: any;
  isshowsocial: any;
  footerSetting: any;
  footerPrimary: any;
  tutorialText: any;
  sitename: string = '';
  footerSiteDescription: string = '';
  footerSiteCopywrite: string = '';
  supportIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/WhiteIcons/Customerservicedef.svg';
  constructor(
    private router: Router,
    private checkauthservice: CheckAuthService,
    public videoModalService: VideoModalService,
    private utillsService: UtillsService,
    private genericService: GenericService,
    private dialogRef: MatDialog,
    private browserService: BrowserService,
    private platformService: PlatformService
  ) {
    if (this.platformService.isBrowser()) {
      this.apkLink = this.browserService.getWindow().appLinkLive;
      if (this.browserService.getWindow().isShowPaymentsImages) {
        this.isShowPaymentsImages =
          this.browserService.getWindow().isShowPaymentsImages;
      }
      if (this.browserService.getWindow().sitename) {
        this.sitename = this.browserService.getWindow().sitename;
      }
      if (this.browserService.getWindow().footerSiteDescription) {
        this.footerSiteDescription =
          this.browserService.getWindow().footerSiteDescription;
      }
      if (this.browserService.getWindow().footerSiteCopywrite) {
        this.footerSiteCopywrite =
          this.browserService.getWindow().footerSiteCopywrite;
      }
      if (this.browserService.getWindow().facebookUrl) {
        this.facebookUrl = this.browserService.getWindow().facebookUrl;
      }
      if (this.browserService.getWindow().isShowDownlaodApp) {
        this.isShowDownlaodApp =
          this.browserService.getWindow().isShowDownlaodApp;
      }
      if (this.browserService.getWindow().isShowDownloadAppInWeb) {
        this.isShowDownloadAppInWeb =
          this.browserService.getWindow().isShowDownloadAppInWeb;
      }

      if (this.browserService.getWindow().instagramUrl) {
        this.instagramUrl = this.browserService.getWindow().instagramUrl;
      }
      // if (this.browserService.getWindow().appLinkLive) {
      //   this.appLinkLive = this.browserService.getWindow().appLinkLive;
      // }
      if (this.browserService.getWindow().twitterUrl) {
        this.twitterUrl = this.browserService.getWindow().twitterUrl;
      }
      if (this.browserService.getWindow().telegramUrl) {
        this.telegramUrl = this.browserService.getWindow().telegramUrl;
      }
      if (this.browserService.getWindow().skypeUrl) {
        this.skypeUrl = this.browserService.getWindow().skypeUrl;
      }
      if (this.browserService.getWindow().youtubeUrl) {
        this.youtubeUrl = this.browserService.getWindow().youtubeUrl;
      }
      if (this.browserService.getWindow().cdnImagesUrl) {
        this.cdnUrl = this.browserService.getWindow().cdnImagesUrl;
      }

      if (this.browserService.getWindow().isShowTutorial) {
        this.isShowTutorial = this.browserService.getWindow().isShowTutorial;
      }
      if (this.browserService.getWindow().isshowsocial) {
        this.isshowsocial = this.browserService.getWindow().isshowsocial;
      }

      if (this.browserService.getWindow().footerSetting) {
        this.footerSetting = this.browserService.getWindow().footerSetting;
      }
      if (this.browserService.getWindow().footerPrimary) {
        this.footerPrimary = this.browserService.getWindow().footerPrimary;
      }
      if (this.browserService.getWindow().isShowFavourites) {
        this.isShowFavourites =
          this.browserService.getWindow().isShowFavourites;
      }
      if (this.browserService.getWindow().supportIcon) {
        this.supportIcon = this.browserService.getWindow().supportIcon;
      }

      this.siteLogo = this.browserService.getWindow().footerLogo;

      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          let sportsBookNew =
            typeof this.browserService.getWindow().sportsbookParameter ==
              'string'
              ? JSON.parse(this.browserService.getWindow().sportsbookParameter)
              : this.browserService.getWindow().sportsbookParameter;
          if (
            event.url ==
            `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid}`
          ) {
            this.showWhatsapp = false;
          } else {
            this.showWhatsapp = true;
          }
          if (
            event.url == '/user/signup' ||
            event.url == '/user/welcome-message'
          ) {
            this.showWhatsAppIconWithText = false;
          } else {
            this.showWhatsAppIconWithText = true;
          }
          // anExtraChecknToAvoidReloadingWholeApplication
          if ((event.url = '/sports')) {
            this.isLogin = this.checkauthservice.IsLogin();
          }
        }
      });
    }
  }

  showFullFooter: boolean = false;
  forWhatsapp() {
    if (!this.isLogin) {
      this.utillsService.whatsappForCutomerSupprtOrId('WAB4');
    } else {
      this.utillsService.whatsappForCutomerSupprtOrId('CA');
    }
  }
  goToDeposit() {
    if (this.isLogin) {
      this.router.navigate([this.depositLink]);
    } else {
      this.openLoginModal();
    }
  }
  depositImgs: any;
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {
      this.cdnSportsLanding = this.browserService.getWindow().bannercdnLanding;
      this.isLogin = this.checkauthservice.IsLogin();
      this.utillsService.bannerData.subscribe((resp: any) => {
        if (resp) {
          this.socialData = this.utillsService.returnFormatedData(
            resp,
            'Social'
          );
          this.footerPrimary = this.utillsService.returnFormatedData(
            resp,
            'footerPrimary'
          );
          this.footerSetting = this.utillsService.returnFormatedData(
            resp,
            'footerSetting'
          );
          this.tutorialText = this.utillsService.returnFormatedData(
            resp,
            'tutorialText'
          );
          this.depositImgs = this.utillsService.returnFormatedData(
            resp,
            'FooterDepositimage'
          );
        }
      });

      this.utillsService.configData.subscribe(() => {
        this.depositLink = this.utillsService.depositLink;
      });

      if (this.router.url == '/' || this.router.url == '/home') {
        this.active = true;
      } else {
        this.active = false;
      }
      this.email = this.browserService.getWindow().email;
      this.title = this.browserService.getWindow().sitename;
      if (this.isLogin) {
        if (this.browserService.getWindow().postLoginPhoneNumber) {
          this.whatsAppPhoneNumber =
            this.browserService.getWindow().postLoginPhoneNumber;
        }
        if (this.browserService.getWindow().afterLoginWAtext) {
          this.whatsappText = this.browserService.getWindow().afterLoginWAtext;
        }
      } else {
        if (this.browserService.getWindow().instantIdPhoneNumber) {
          this.getInstantNum =
            this.browserService.getWindow().instantIdPhoneNumber;
        }
        if (this.browserService.getWindow().preLoginPhoneNumber) {
          this.whatsAppPhoneNumber =
            this.browserService.getWindow().preLoginPhoneNumber;
        }
        if (this.browserService.getWindow().beforeLoginWAtext) {
          this.whatsappText = this.browserService.getWindow().beforeLoginWAtext;
        }
      }
    }
  }

  showOrHideLiveChat() {
    if (!this.checkauthservice.IsLogin()) {
      return this.browserService.getWindow().chatIframeUrlPreLogin
        ? true
        : false;
    } else {
      return this.browserService.getWindow().chatIframeUrlPostLogin
        ? true
        : false;
    }
  }
  openVideoModal(str: any) {
    this.videoModalService.open(str);
  }

  routeToLink(link, data: any) {
    if (this.checkauthservice.IsLogin()) {
      switch (true) {
        case data.text?.includes('Sports Book'):
          this.router.navigate([link]);
          break;
        case link?.includes('deposit'):
          this.router.navigate([this.depositLink]);
          break;
        case link?.includes('downloadapp'):
          window.open(this.apkLink, '_blank');
          break;
        default:
          this.router.navigate([link]);
      }
    } else {
      switch (true) {
        case data.text?.includes('Sports Book'):
          this.openLoginModal();
          break;
        // case link?.includes('terms-conditions'):
        //   this.termsModal();
        //   break;
        case link?.includes('reports'):
          this.openLoginModal();
          break;
        case link?.includes('deposit'):
          this.openLoginModal();
          break;
        case link?.includes('downloadapp'):
          window.open(this.apkLink, '_blank');
          break;
        case link?.includes('my-sports'):
          this.openLoginModal();
          break;
        default:
          this.router.navigate([link]);
      }
    }
  }

  termsModal() {
    // this.dialogRef.open(RuleComponent, {
    //   width: '700px',
    //   height: '700px',
    //   maxWidth: '92vw'
    // });
  }

  openLoginModal() {
    this.genericService.openLoginModal();
  }
}
