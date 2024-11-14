import { BrowserService } from './../../services/window.service';
import { PlatformService } from './../../services/platform.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { _window } from '../../services/backend.service';
import { Meta } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CheckAuthService } from '../../services/check-auth.service';
import { FancytimerService, MarketTimerService, NewsTimerService, NextRaceTimerService, RemainingTimerService, ScoreCardTimerService, ScoreTimerService, TimerService } from '../../services/timer.service';
import { UtillsService } from '../../services/utills.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DefaultBannerComponent } from '../default-banner/default-banner.component';
import { SportsNavComponent } from '../sports-nav/sports-nav.component';
import { PopularBannersComponent } from '../popular-banners/popular-banners.component';
import { RacetodayscardComponent } from '../racetodayscard/racetodayscard.component';
import { InplayUpcomingComponent } from '../inplay-upcoming/inplay-upcoming.component';
import { GamesliderComponent } from '../gameslider/gameslider.component';
import { ProviderBannerComponent } from '../provider-banner/provider-banner.component';
import { SummaryContentComponent } from '../summary-content/summary-content.component';
import { CelebritiesComponent } from '../celebrities/celebrities.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    DefaultBannerComponent,
    SportsNavComponent,
    PopularBannersComponent,
    RacetodayscardComponent,
    InplayUpcomingComponent,
    GamesliderComponent,
    ProviderBannerComponent,
    SummaryContentComponent,
    CelebritiesComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  providerModalArr: string[] = [];
  tempGameId: any;
  tempProvider: any;
  tempTableId: any;
  isCheckUrl: boolean | undefined;
  bannerData: any[] = [];
  sportsData: any[] = [];
  popularGamesData: any[] = [];
  indianCasinoData: any[] = [];
  newReleasesData: any[] = [];
  liveCasinoData: any[] = [];
  multiplayerData: any[] = [];
  macIndianCasino: any[] = [];
  esportsData: any[] = [];
  gamesData: any[] = [];
  popularTodayData: any[] = [];
  providerData: any[] = [];
  topPopularData: any[] = [];
  topNavData: any[] = [];
  sportsNavData: any[] = [];
  casinoNavData: any[] = [];
  providerBannerData: any[] = [];
  provider2BannerData: any[] = [];
  landingVideos: any;
  cdnSportsLanding: string = '';
  showUpcoming: boolean = false;
  isMagicwin: boolean = false;
  isShowEndorsment: boolean = false;

  siteLoader: any;
  sitename: any;
  sportsDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/landingpagenew/LiveCasinoWebp/Sports (1) 1.svg';
  popularGamesDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/landingpagenew/LiveCasinoWebp/MagicwinExclusive.svg';
  indianCasinoDataIcon: string =
    'https://iriscdn.b-cdn.net/magicwin.games/banners/12234.png';
  newReleasesDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/landingpagenew/LiveCasinoWebp/NewReleases.svg';
  liveCasinoDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/menuItems/evo.svg';
  multiplayerDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/landingpagenew/LiveCasinoWebp/jili.svg';
  esportsDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/landingpagenew/LiveCasinoWebp/esportsSV.svg';
  casinoGamesDataIcon: String =
    'https://iriscdn.b-cdn.net/magicwin.games/Casino.svg';
  popularTodayDataIcon: string =
    'https://iriscdn.b-cdn.net/kheloyar/WhiteIcons/Popular Today.svg';
  providerDataIcon: string =
    'https://iriscdn.b-cdn.net/magicwin.games/allproviders%201.svg';
  macIndianGamesDataIcon =
    'https://iriscdn.b-cdn.net/magicwin.games/banners/12234.png';
  provider2BannerDataMobile: any;
  isMobile: boolean = false;
  providerBannerDataMobile: any;

  sportsDataName: string = 'Sports';
  popularGamesDataName: string = _window().sitename + ' ' + 'Exclusive';
  indianCasinoDataName: string = 'Indian Casino';
  newReleasesDataName: string = 'New Releases';
  liveCasinoDataName: string = '';
  multiplayerDataName: string = '';
  esportsDataName: string = '';
  casinoGamesDataName: string = '';
  popularTodayDataName: string = '';
  providerDataName: string = '';
  macIndianGamesDataName: string = '';
  constructor(
    private router: Router,
    private meta: Meta,
    private deviceService: DeviceDetectorService,
    private checkauthservice: CheckAuthService,
    private fancyTimer: FancytimerService,
    private scoreTimerService: ScoreTimerService,
    private scoreCardTimerService: ScoreCardTimerService,
    private nextRaceTimer: NextRaceTimerService,
    private markettimer: MarketTimerService,
    private newstimer: NewsTimerService,
    private remainingtimer: RemainingTimerService,
    private myTimer: TimerService,
    private utillsService: UtillsService,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private PlatformService: PlatformService,
    private BrowserService: BrowserService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (_window().showUpcoming) {
      this.showUpcoming = _window().showUpcoming;
    }
    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    if (_window().isShowEndorsment) {
      this.isShowEndorsment = _window().isShowEndorsment;
    }
    this.isMagicwin = _window().isMagicwin;
    if (this.PlatformService.isBrowser()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    this.isLogin = this.checkauthservice.IsLogin();
    if (_window().sportsDataIcon) {
      this.sportsDataIcon = _window().sportsDataIcon;
    }
    if (_window().popularGamesDataIcon) {
      this.popularGamesDataIcon = _window().popularGamesDataIcon;
    }
    if (_window().indianCasinoDataIcon) {
      this.indianCasinoDataIcon = _window().indianCasinoDataIcon;
    }
    if (_window().newReleasesDataIcon) {
      this.newReleasesDataIcon = _window().newReleasesDataIcon;
    }
    if (_window().liveCasinoDataIcon) {
      this.liveCasinoDataIcon = _window().liveCasinoDataIcon;
    }
    if (_window().multiplayerDataIcon) {
      this.multiplayerDataIcon = _window().multiplayerDataIcon;
    }
    if (_window().esportsDataIcon) {
      this.esportsDataIcon = _window().esportsDataIcon;
    }
    if (_window().casinoGamesDataIcon) {
      this.casinoGamesDataIcon = _window().casinoGamesDataIcon;
    }
    if (_window().popularTodayDataIcon) {
      this.popularTodayDataIcon = _window().popularTodayDataIcon;
    }
    if (_window().providerDataIcon) {
      this.providerDataIcon = _window().providerDataIcon;
    }
    if (_window().macIndianGamesDataIcon) {
      this.macIndianGamesDataIcon = _window().macIndianGamesDataIcon;
    }

    if (_window().sportsDataName) {
      this.sportsDataName = _window().sportsDataName;
    }
    if (_window().popularGamesDataName) {
      this.popularGamesDataName = _window().popularGamesDataName;
    }
    if (_window().indianCasinoDataName) {
      this.indianCasinoDataName = _window().indianCasinoDataName;
    }
    if (_window().liveCasinoDataName) {
      this.liveCasinoDataName = _window().liveCasinoDataName;
    }
    if (_window().multiplayerDataName) {
      this.multiplayerDataName = _window().multiplayerDataName;
    }
    if (_window().esportsDataName) {
      this.esportsDataName = _window().esportsDataName;
    }
    if (_window().casinoGamesDataName) {
      this.casinoGamesDataName = _window().casinoGamesDataName;
    }
    if (_window().popularTodayDataName) {
      this.popularTodayDataName = _window().popularTodayDataName;
    }
    if (_window().providerDataName) {
      this.providerDataName = _window().providerDataName;
    }
    if(_window().macIndianGamesDataName){
      this.macIndianGamesDataName = _window().macIndianGamesDataName;

    }
  }
  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      return;
    }
  }
  isLogin = false;
  deviceInfo: any;
  showMenu = true;
  landingPage: boolean = true;
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url == '/') {
          this.landingPage = true;
        } else {
          this.landingPage = false;
        }
      }
    });
    this.cdnSportsLanding = _window().bannercdnLanding;

    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        setTimeout(() => {
          this.sportsData = Array.from(d).filter(
            (x: any) => x.type === 'Sports' || x.type === 'Trending'
          );
          if (this.sportsData && this.sportsData.length > 0) {
            this.sportsData[0].img = this.sportsDataIcon;
            this.sportsData[0].seeAll = '/sports/all';
            this.sportsData[0].typeName = this.sportsDataName;
          }

          this.popularGamesData = Array.from(d).filter(
            (x: any) => x.type === 'Popular Games'
          );
          if (this.popularGamesData && this.popularGamesData.length > 0) {
            this.popularGamesData[0].img = this.popularGamesDataIcon;
            this.popularGamesData[0].seeAll = '/casino/catagory/popular';
            this.popularGamesData[0].typeName = this.popularGamesDataName;
          }
          this.indianCasinoData = Array.from(d).filter(
            (x: any) => x.type === 'Indian Casino'
          );
          if (this.indianCasinoData && this.indianCasinoData.length > 0) {
            this.indianCasinoData[0].img = this.indianCasinoDataIcon;
            this.indianCasinoData[0].seeAll = '/casino/indian-games';
            this.indianCasinoData[0].typeName = this.indianCasinoDataName;
          }
          this.newReleasesData = Array.from(d).filter(
            (x: any) => x.type === 'New Releases'
          );
          if (this.newReleasesData && this.newReleasesData.length > 0) {
            this.newReleasesData[0].img = this.newReleasesDataIcon;
            this.newReleasesData[0].seeAll = '/casino/indian-games';
            this.newReleasesData[0].typeName =
              this.newReleasesDataName || 'New Releases';
          }
          this.liveCasinoData = Array.from(d).filter(
            (x: any) => x.type === 'Live Casino'
          );
          if (this.liveCasinoData && this.liveCasinoData.length > 0) {
            this.liveCasinoData[0].img = this.liveCasinoDataIcon;
            this.liveCasinoData[0].seeAll = '/casino/get/all';
            this.liveCasinoData[0].typeName =
              this.liveCasinoDataName || 'Evolution (Intl Casino)';
          }
          this.multiplayerData = Array.from(d).filter(
            (x: any) => x.type === 'Multiplayer Games'
          );
          if (this.multiplayerData && this.multiplayerData.length > 0) {
            this.multiplayerData[0].img = this.multiplayerDataIcon;
            this.multiplayerData[0].seeAll = '/casino/catagory/multiplayer';
            this.multiplayerData[0].typeName =
              this.multiplayerDataName || 'Jili (Indian Casino)';
          }
          this.esportsData = Array.from(d).filter(
            (x: any) => x.type === 'esports'
          );
          if (this.esportsData && this.esportsData.length > 0) {
            this.esportsData[0].img = this.esportsDataIcon;
            this.esportsData[0].seeAll = '/casino/catagory/esports';
            this.esportsData[0].typeName = this.esportsDataName || 'Esports';
          }
          this.gamesData = Array.from(d).filter((x: any) => x.type === 'Games');
          if (this.gamesData && this.gamesData.length > 0) {
            this.gamesData[0].img = this.casinoGamesDataIcon;
            this.gamesData[0].seeAll = '/casino/get/all';
            this.gamesData[0].typeName =
              this.casinoGamesDataName || 'Casino Games';
          }
          this.popularTodayData = Array.from(d).filter(
            (x: any) => x.type === 'Popular Today'
          );
          if (this.popularTodayData && this.popularTodayData.length > 0) {
            this.popularTodayData[0].img = this.popularTodayDataIcon;
            this.popularTodayData[0].seeAll = '/sports';
            this.popularTodayData[0].typeName =
              this.popularTodayDataName || 'Popular Matches';
          }
          this.providerData = Array.from(d).filter(
            (x: any) => x.type === 'Providers'
          );
          if (this.providerData && this.providerData.length > 0) {
            this.providerData[0].img = this.providerDataIcon;
            this.providerData[0].seeAll = '/casino/providers';
            this.providerData[0].typeName =
              this.providerDataName || 'Providers';
          }
          this.topPopularData = Array.from(d).filter(
            (x: any) => x.type === 'TOP_Popular'
          );
          this.topNavData = Array.from(d).filter(
            (x: any) => x.type === 'TOP_NAV'
          );

          this.landingVideos = Array.from(d).filter(
            (x: any) => x.type === 'landingVideos'
          );
          let providerBannerData: any = Array.from(d).filter(
            (x: any) => x.type === 'Provider_banners'
          );
          let provider2BannerData: any = Array.from(d).filter(
            (x: any) => x.type === 'Provider_banner2'
          );
          this.providerBannerData = providerBannerData[0]?.data[1];
          this.providerBannerDataMobile = providerBannerData[0]?.data[0];
          this.provider2BannerData = provider2BannerData[0]?.data[1];
          this.provider2BannerDataMobile = provider2BannerData[0]?.data[0];

          this.macIndianCasino = Array.from(d).filter(
            (x: any) => x.type === 'MAC88 (Indian Casino)'
          );
          if (this.macIndianCasino && this.macIndianCasino.length > 0) {
            this.macIndianCasino[0].img = this.macIndianGamesDataIcon;
            this.macIndianCasino[0].seeAll = '/casino/providers/mac88';
            this.macIndianCasino[0].typeName = this.macIndianGamesDataName || 'MAC88 (Indian Casino)';
          }
        }, 500);
      }
    });

    let affiliationValues = this.router.url?.split('?')[1]?.split('&');
    if (affiliationValues) {
      localStorage.setItem(
        'affiliationRoute',
        JSON.stringify(affiliationValues)
      );
    }
    this.scoreCardTimerService.clearTimer();
    this.myTimer.clearTimer();
    this.scoreTimerService.clearTimer();
    this.fancyTimer.clearTimer();
    this.nextRaceTimer.clearTimer();
    this.markettimer.clearTimer();
    this.newstimer.clearTimer();
    this.remainingtimer.clearTimer();

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name=theme-color');
  }

  ngAfterViewInit(): void {
    if (this.isLogin) {
      const storedData = localStorage.getItem('routeCasino');
      if (storedData !== null) {
        const parsedObject = JSON.parse(storedData);
        setTimeout(() => {
          (this.tempProvider = parsedObject.provider),
            (this.tempGameId = parsedObject.gameId),
            (this.tempTableId = parsedObject.tableId);
          this.isCheckUrl = parsedObject.isCheckUrl;
          if (parsedObject.routerLink.length != 0) {
            this.router.navigate([parsedObject.routerLink]);
          } else if (parsedObject?.rummy) {
            this.utillsService.openGame(
              parsedObject.provider,
              parsedObject.gameId,
              parsedObject.isCheckUrl,
              parsedObject.tableId
            );
          } else {
            if (this.providerModalArr.includes(this.tempProvider)) {
              // this.openMyModal();
              return;
            }
            this.utillsService.loadCasino(
              this.tempProvider,
              this.tempGameId,
              this.tempTableId
            );
          }
          if (this.PlatformService.isBrowser()) {
            localStorage.removeItem('routeCasino');
          }
        }, 500);
      }
    } else {
      if (this.PlatformService.isBrowser()) {
        localStorage.removeItem('routeCasino');
      }
    }
  }
}
