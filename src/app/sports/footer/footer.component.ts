import { Component, OnInit } from '@angular/core';
import { _window } from '../../services/backend.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';
import { GenericService } from '../../services/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { VideoModalService } from '../../services/video-modal.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
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
  // apkLink = _window().appLinkLive
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
    private dialogRef: MatDialog
  ) {
    this.apkLink = _window().appLinkLive;
    if (_window().isShowPaymentsImages) {
      this.isShowPaymentsImages = _window().isShowPaymentsImages;
    }
    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    if (_window().footerSiteDescription) {
      this.footerSiteDescription = _window().footerSiteDescription;
    }
    if (_window().footerSiteCopywrite) {
      this.footerSiteCopywrite = _window().footerSiteCopywrite;
    }
    if (_window().facebookUrl) {
      this.facebookUrl = _window().facebookUrl;
    }
    if (_window().isShowDownlaodApp) {
      this.isShowDownlaodApp = _window().isShowDownlaodApp;
    }
    if (_window().isShowDownloadAppInWeb) {
      this.isShowDownloadAppInWeb = _window().isShowDownloadAppInWeb;
    }

    if (_window().instagramUrl) {
      this.instagramUrl = _window().instagramUrl;
    }
    // if (_window().appLinkLive) {
    //   this.appLinkLive = _window().appLinkLive;
    // }
    if (_window().twitterUrl) {
      this.twitterUrl = _window().twitterUrl;
    }
    if (_window().telegramUrl) {
      this.telegramUrl = _window().telegramUrl;
    }
    if (_window().skypeUrl) {
      this.skypeUrl = _window().skypeUrl;
    }
    if (_window().youtubeUrl) {
      this.youtubeUrl = _window().youtubeUrl;
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }

    if (_window().isShowTutorial) {
      this.isShowTutorial = _window().isShowTutorial;
    }
    if (_window().isshowsocial) {
      this.isshowsocial = _window().isshowsocial;
    }

    if (_window().footerSetting) {
      this.footerSetting = _window().footerSetting;
    }
    if (_window().footerPrimary) {
      this.footerPrimary = _window().footerPrimary;
    }
    if (_window().isShowFavourites) {
      this.isShowFavourites = _window().isShowFavourites;
    }
    if (_window().supportIcon) {
      this.supportIcon = _window().supportIcon;
    }

    this.siteLogo = _window().footerLogo;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let sportsBookNew =
          typeof _window().sportsbookParameter == 'string'
            ? JSON.parse(_window().sportsbookParameter)
            : _window().sportsbookParameter;
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
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.isLogin = this.checkauthservice.IsLogin();
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        this.socialData = this.utillsService.returnFormatedData(resp, 'Social');
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
    this.email = _window().email;
    this.title = _window().sitename;
    if (this.isLogin) {
      if (_window().postLoginPhoneNumber) {
        this.whatsAppPhoneNumber = _window().postLoginPhoneNumber;
      }
      if (_window().afterLoginWAtext) {
        this.whatsappText = _window().afterLoginWAtext;
      }
    } else {
      if (_window().instantIdPhoneNumber) {
        this.getInstantNum = _window().instantIdPhoneNumber;
      }
      if (_window().preLoginPhoneNumber) {
        this.whatsAppPhoneNumber = _window().preLoginPhoneNumber;
      }
      if (_window().beforeLoginWAtext) {
        this.whatsappText = _window().beforeLoginWAtext;
      }
    }
  }

  showOrHideLiveChat() {
    if (!this.checkauthservice.IsLogin()) {
      return _window().chatIframeUrlPreLogin ? true : false;
    } else {
      return _window().chatIframeUrlPostLogin ? true : false;
    }
  }
  openVideoModal(str: any) {
    this.videoModalService.open(str);
  }

  routeToLink(link: any, data: any) {
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
