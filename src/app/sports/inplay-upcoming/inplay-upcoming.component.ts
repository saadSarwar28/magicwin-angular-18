import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { BackendService } from '../../services/backend.service';
import { TimerService, ScoreTimerService } from '../../services/timer.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import { SportsIdMapperService } from "../../services/sportsIdMapper.service";
import { UtillsService } from '../../services/utills.service';
import { GenericService } from '../../services/generic.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-inplay-upcoming',
  templateUrl: './inplay-upcoming.component.html',
  styles: [


  ],
})
export class InplayUpcomingComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  sportsId: string = '';
  data: any;
  source: any;
  marketIds: any[] = [];
  eventIds: any[] = [];
  currencyCode = '';
  cBuyRate = 1;
  cTotalShare = 0;
  interval: any;
  sInterval: any;
  sportsImgs = [
    {
      id: "1",
      img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/1.png"
    },
    {
      id: "2",
      img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/2.png"
    },
    {
      id: "2",
      img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/2.png"
    },
    {
      id: "4",
      img: "https://iriscdn.b-cdn.net/magicwin.games/icon/cricket.png"
    },
  ]

  upcomingItems: any[] = [
    {
      name: "Upcoming",
      id: 2
    },
  ]
  inplayTomorrowItems: any[] = [
    {
      name: "Inplay",
      id: 0
    },
    {
      name: "Tomorrow",
      id: 1
    },
  ]
  allItems: any[] = [
    {
      name: "Inplay",
      id: 0
    },
    {
      name: "Tomorrow",
      id: 1
    },
    {
      name: "Upcoming",
      id: 2
    },
  ]

  sports = [
    {
      name: 'Cricket',
      id: '4',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/cricket.svg',
    },
    {
      name: 'Soccer',
      id: '1',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/football.svg',
    },
    {
      name: 'Tennis',
      id: '2',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/Tennis New.svg',
    },
    {
      name: 'Baseball',
      id: '7522',
      img: 'https://iriscdn.b-cdn.net/kheloyar/categories/baseball-svgrepo-com 1.svg',
    },
    {
      name: 'Basketball',
      id: '7511',
      img: 'https://iriscdn.b-cdn.net/kheloyar/Ballofbasketball.svg',
    },
  ];

  sitename: string = ''
  isOneClickBetGlobal: boolean = false
  isLoggedIn: boolean = false
  isMagicwin: boolean = false
  siteLoader: string = ""
  constructor(
    private checkauthservice: CheckAuthService,
    private router: Router,
    private backendService: BackendService,
    private storageService: StorageService,
    private elementRef: ElementRef,
    private timerService: TimerService,
    private scoreTimerService: ScoreTimerService,
    private sportsMapperService: SportsIdMapperService,
    public utillsService: UtillsService,
    private genericService: GenericService,
    private walletService: WalletService

  ) {

    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    this.isMagicwin = _window().isMagicwin;
    if (_window().sportsbyidtimer) {
      this.interval = _window().sportsbyidtimer;
    }

    if (_window().scoretimer) {
      this.sInterval = _window().scoretimer;
    }
    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
    }

    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }

    if (_window().hideOCBonComp) {
      this.isOneClickBetGlobal = true;
    }
    if (this.checkauthservice.HaveStakes()) {
      this.cBuyRate = this.checkauthservice.cBuyRate;
      this.cTotalShare = this.checkauthservice.cTotalShare;
      this.currencyCode = this.checkauthservice.currencyCode;
    }
  }
  setLink(id: any, isVirtual: Boolean = false) {
    if (isVirtual) {
      this.router.navigate([`/sports/tournament/virtual-cricket-70707070`]);
    } else {
      this.router.navigate(['/sports/' + this.sportsMapperService.getSportById(Number(id))]);
    }
  }

  virtualEventIds: any = []
  getVirtual() {
    if (navigator.onLine == true && document.hidden == false) {
      this.virtualEventIds = []
      this.backendService
        .popularbyid('4', 5, 'VirtualCricketComponent')
        .subscribe((resp) => {
          if (resp && resp.length > 0) {
            this.virtual = resp;
            this.virtualEventIds = resp
              .filter((x: any) => x.inplay)
              .map((x: any) => x.version);
          } else {
            this.virtual = [];
          }
          this.GetScore();
          this.scoreTimerService.SetTimer(
            setInterval(() => {
              this.GetScore();
            }, this.sInterval)
          );
        })

    }
  }

  setIdForVirtual(id: string) {
    this.selectedId = id
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }

  cdnSportsLanding: string = '';

  topPopularData: any[] = []
  providerBannerData: any[] = []
  defaultImage: string = ''
  isShowVirtualCricket: boolean = false;

  ngOnInit(): void {

    if (_window().isShowVirtualCricket) {
      this.isShowVirtualCricket = _window().isShowVirtualCricket;
    }
    this.cdnSportsLanding = _window().bannercdnLanding;
    if (this.isShowVirtualCricket) {
      this.getVirtual()
    }
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.providerBannerData = this.utillsService.returnFormatedData(d, 'banner1')
      }
    });
  }

  routeToMarket(link: any) {
    this.router.navigate([link]);
  }

  routeToLink(item: any) {
    // this.utillsService.routeToLink(item)
    if (
      !this.checkauthservice.IsLogin() &&
      item.link.includes('casino/detail')
    ) {
      this.genericService.openLoginModal();
    } else {
      this.router.navigate([item.link]);
    }
  }

  not_virtual: any = [];
  virtual: any = [];
  selectedId = '';
  loadingData: boolean = true;
  inPlayMarketIds: string[] = []

  catchError(err: any) {
    if (err.status && err.status == 401) {
      this.timerService.clearTimer();
      this.scoreTimerService.clearTimer();
      this.storageService.removeItem('token');
      this.genericService.openLoginModal()

    } else {
      console.error(err);
    }
  }








  GetWalllet() {
    this.walletService.loadBalance()
  }





  scoreData: any
  async GetScore() {
    if (navigator.onLine == true && document.hidden == false) {
      if (
        (this.eventIds && this.eventIds.length > 0 || this.virtualEventIds && this.virtualEventIds.length)) {
        let eventIds = this.eventIds.concat(this.virtualEventIds);
        let scoreData = await this.utillsService.getScore(eventIds)
        if (scoreData && scoreData.length > 0) {
          this.scoreData = scoreData
          scoreData.forEach((s: any) => {
            let m = this.not_virtual.filter(
              (x: any) => x.version == s.eventId
            );
            if (m && m.length > 0) {
              m[0].score = s.score;
            }
          });
        }
      }
    }
  }



}
