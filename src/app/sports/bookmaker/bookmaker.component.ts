import { BackendService } from '../../services/backend.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FancytimerService, TimerService, } from '../../services/timer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { iFrameResizer } from '../../../assets/lmtScore/sports-radar';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetStatusService } from '../../services/get-status.service';
import { CurrentBets, CurrentBetsInput } from '../../models/models';
declare function iFrameResize(): any;
@Component({
  selector: 'app-bookmaker',
  templateUrl: './bookmaker.component.html',
  styleUrls: ['./bookmaker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BookmakerComponent implements OnInit, OnDestroy {
  srcData: any;
  src: any = '';
  isLoggedIn: any = false;
  username: string = '';
  bookmakerLMTShow: boolean = false;
  siteLoader: any;
  isShowBalanceStream: boolean = false;
  showStreamAgent = false;
  byPassStreamScript: boolean = false;
  isShowStreamMobile: boolean = false;
  loksabhafancyVersion: string = 'v3';
  deviceInfo: any;
  minBalance: any
  marketId: any;
  cdnUrl: string = ""
  bookmakerlmt: any
  eventId: any
  matchId: any
  showStreamOnBalance: any
  fInterval: any;
  @Output() loadBets: EventEmitter<any> = new EventEmitter<any>();
  election: boolean = false
  constructor(
    private checkauthservice: CheckAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sportService: BackendService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private timerService: TimerService,
    private utillsService: UtillsService,
    private getStatusService: GetStatusService,
    private deviceService: DeviceDetectorService,
    private fancyTimerService: FancytimerService,

  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().minBalance) {
      this.minBalance = _window().minBalance;
    }
    if (_window().isShowBalanceStream) {
      this.isShowBalanceStream = _window().isShowBalanceStream;
    }
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().isShowStreamMobile) {
      this.isShowStreamMobile = _window().isShowStreamMobile;
    }
    if (_window().byPassStreamScript) {
      this.byPassStreamScript = _window().byPassStreamScript;
    }
    if (_window().bookmakerLMT) {
      this.bookmakerLMTShow = true;
    }
    if (_window().fancytimer) {
      this.fInterval = _window().fancytimer;
    }

    if (_window().loksabhafancyVersion) {
      this.loksabhafancyVersion = _window().loksabhafancyVersion;
    }
    this.route.params.subscribe((p) => {
      this.marketId = null;
      this.eventId = null;
      console.log("p", p)
      this.marketId = this.route.snapshot.paramMap.get('id') || '';
      this.marketId.includes('election') ? this.election = true : this.election = false
      if (this.marketId !== '') {
        this.marketId =
          this.marketId.split('-')[this.marketId.split('-').length - 1];
      }
      this.eventId = this.route.snapshot.paramMap.get('eventid') || '';
      if (this.eventId !== '') {
        this.eventId =
          this.eventId.split('-')[this.eventId.split('-').length - 1];
        this.loadFancyData()
        this.isFirstLoad = true
      }

      this.LoadCurrentBets()
    });

  }

  callFunction() {
    this.LoadCurrentBets()
  }

  isFirstLoad: boolean = true;
  fancyResponse: any;
  loadFancyData() {
    if (navigator.onLine == true && document.hidden == false) {
      this.sportService
        .FancyMarketsAny(
          this.loksabhafancyVersion,
          this.eventId,
        )
        .subscribe((resp) => {
          if (resp) {
            this.fancyResponse = resp;
            if (this.isFirstLoad) {
              this.isFirstLoad = false
            }
          }
        })

    }
    this.fancyTimerService.SetTimer(
      setInterval(() => {
        this.loadFancyData();
      }, this.fInterval)
    );
  }

  catchError(err: any) {
    if (err && err.status && err.status == 401) {
      this.storageService.secureStorage.removeItem('token');
      this.fancyTimerService.clearTimer();
      this.timerService.clearTimer()

    } else {
      console.log(err);
    }
  }

  checkUserAgent() {
    document.body.style.overflow = 'unset';
    let checkScript = 'mbl-app-games';
    if (this.deviceInfo.userAgent.includes(checkScript)) {
      this.showStreamAgent = true;
    }
  }

  routeToTournament(data: any) {
    this.router.navigate([
      '/sports/tournament/' +
      data.competition.name
        .trim()
        .toLowerCase()
        .split(' ')
        .join('-')
        .replace(/[^a-z0-9-]/g, '') +
      '-' +
      data.competition.id,
    ]);
  }

  getusername() {
    let random = Math.floor(Math.random() * 10000000 + 1);
    this.username =
      this.storageService.secureStorage.getItem('client') || random;
    return this.username;
  }


  GetTV() {
    if (this.srcData == undefined) {
      try {
        if (this.eventId && this.eventId !== undefined) {
          this.sportService.TvOnBookmaker(this.eventId).subscribe((resp: any) => {
            if (resp) {
              this.matchId = resp.sportsRadarId;
              this.srcData = resp;
              if (resp.ipAddress) {
                this.getStreamData();
              }
            }
          });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  GetLMT(id: any) {
    iFrameResizer('stats');
  }



  currentBets: CurrentBets[] = [];
  LoadCurrentBets() {
    if (this.checkauthservice.IsLogin()) {
      if (this.eventId) {
        this.sportService.SportsCurrentbets(new CurrentBetsInput(this.marketId, this.eventId, false), "BookmakerComponent").subscribe((resp: any) => {
          if (resp && resp.length > 0) {
            this.currentBets = resp;
          } else {
            this.currentBets = [];
          }
        })
      }
    }

  }
  getStreamData() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.eventId) {
        this.sportService
          .GetVirtualTv(parseInt(this.eventId))
          .subscribe((resp) => {
            if (resp && resp.message) {
              this.srcData = resp;
              if (resp.message.includes('http')) {
                this.src = resp.message;
              }
            }
          })

      }
    }
  }



  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.fancyTimerService.clearTimer()
    this.utillsService.currentBets.next([]);
  }

  ngOnInit(): void {
    if (this.byPassStreamScript) {
      this.showStreamAgent = true;
    } else {
      this.checkUserAgent();
    }
    if (this.checkauthservice.IsLogin()) {
      this.isLoggedIn = true;
      if (this.isShowBalanceStream) {
        this.getStatusService.balanceClient$.subscribe((balance) => {
          this.showStreamOnBalance =
            balance.balance < this.minBalance ? false : true;
        });
      }
    }
    if (_window().bookerScoreCadr) {
      this.bookmakerlmt = _window().bookerScoreCadr + `${this.eventId}`;
    }


  }


  ngAfterViewInit() {
    setTimeout(() => {
      iFrameResize();
    }, 5000);
  }

  toggleLiveShow: any = false;
  toggleLiveTV() {
    this.toggleLiveShow = false;
  }


}

