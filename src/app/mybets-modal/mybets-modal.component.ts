import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { UtillsService } from '../services/utills.service';
import { BackendService, _window } from '../services/backend.service';
import { CheckAuthService } from '../services/check-auth.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CancelOrders, CancellAllOrders, CurrentBetsInput } from '../models/models';
import { ToastService } from '../services/toast.service';
import { FancytimerService } from '../services/timer.service';
import { SportsIdMapperService } from "../services/sportsIdMapper.service";
import { GenericService } from '../services/generic.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mybets-modal',
  templateUrl: './mybets-modal.component.html',
  styleUrls: ['./mybets-modal.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule]

})
export class MybetsModalComponent implements OnInit {

  currentBets: any[] = []
  matchedtBets: any[] = []
  marketData: any;
  loadingData: any = false;
  eventId: any;
  toggleMarketData: boolean = true;
  toggleMatcedBets: boolean = true;
  siteLoader

  constructor(private storageService: StorageService, private bottomSheet: MatBottomSheet,
    private sportService: BackendService, private genericService: GenericService, private toasterService: ToastService, private fancyTimerService: FancytimerService, private sportsIdMappser: SportsIdMapperService,
    private router: Router, private utillsService: UtillsService, private backendService: BackendService, private checkauthservice: CheckAuthService, private rendere: Renderer2, @Inject(DOCUMENT) private document: Document) {
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
  }

  ngOnInit(): void {
    this.utillsService.currentBets.subscribe((data: any) => {
      if (data) {
        this.currentBets = data.bets;
        this.eventId = data.eventId
        this.haveUnmatched = false;
        if (this.currentBets && this.currentBets.length > 0) {
          this.matchedtBets = this.currentBets.filter((x) => x.betStatus == 'Matched Bets')
          if (this.currentBets.some((x) => x.betStatus == 'Un-Matched Bets')) {
            this.haveUnmatched = true;
          }
        }
      }
    })
    this.LoadData()
  }


  outSide(event) {
    event.preventDefault();
  }
  rotate: boolean = false
  LoadData() {
    if (this.checkauthservice.IsLogin()) {
      this.rotate = true
      this.loadingData = true
      setTimeout(() => {
        this.rotate = false
      }, 500)
      this.backendService.MyMarkets().subscribe(res => {
        if (res && res.length > 0) {
          this.marketData = res
          this.marketData.forEach(element => {
            if (element.marketID.includes('10.')) {
              element.marketID.replace('10.', '1.')
            }
          });
        }
      })
    }
  }
  bookmaker = [4, 6, 18, 19]
  tennisAndSccor = [1, 2]
  routeToMarket(m: any) {
    // console.log(m, ' <<<<<<<<<<<<<<<<<<<<<< ')
    this.closeModal()
    if (m.menuPath.includes('ICC World Cup T20 2024')) {
      this.router.navigate(['sports/marketdetail/1.206460179']);
    } else if (m.marketID.startsWith("10.")) {
      this.router.navigate([
        'sports/racemarket/' + m.marketID.replace('10.', '1.'),
      ]);
    } else if (this.bookmaker.includes(m.exchangeID)) {
      let tournamentName = m.menuPath.split('\\')[0].trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
      let marketName = m.menuPath.split('\\')[1].trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '').replace('-v-', '-vs-')
      this.router.navigate(['sports/bookmaker/' + tournamentName + '-' + m.eventID + '/' + marketName + '-' + m.eventID]);
    } else if (m.eventTypeID == 7) {
      this.router.navigate(['sports/horse-racing/all/' + m.marketID]);
    } else if (m.eventTypeID == 4339) {
      this.router.navigate(['sports/grey-hound-racing/all/' + m.marketID]);
    } else if (this.tennisAndSccor.includes(m.exchangeID)) {
      let menuPathSplit = m.menuPath.split('\\')
      let marketName = menuPathSplit[menuPathSplit.length - 1].toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
      marketName = marketName.replace('-v-', '-vs-')
      if (m.eventTypeID == 4) {
        this.router.navigate(['sports/' + this.sportsIdMappser.getSportById(m.eventTypeID) + '/' + marketName + '-' + m.eventID])
      } else {
        let eventName = menuPathSplit[0].toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
        this.router.navigate(['sports/' + this.sportsIdMappser.getSportById(m.eventTypeID) + '/' + eventName + '/' + marketName + '-' + m.marketID])
      }
    } else if (m.eventTypeID == 4) {
      let marketName = m.menuPath.split('\\')[m.menuPath.split('\\').length - 1].toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
      marketName = marketName.replace('-v-', '-vs-')
      this.router.navigate(['sports/cricket/' + marketName + '-' + m.eventID]);
    }


  }

  closeModal() {
    this.bottomSheet.dismiss()
  }
  haveUnmatched = false;
  cancellingBet: boolean = false
  cancelBets(unMatchBet?: any, isSingle = false) {

    if (navigator.onLine == true && document.hidden == false) {
      if (!this.checkauthservice.IsLogin()) {
        return
      }
      let un: any = []
      if (isSingle) {
        un = [unMatchBet]
      } else {
        un = this.currentBets.filter(
          (x) => x.betStatus == 'Un-Matched Bets'
        );
      }
      if (un && un.length > 0) {
        this.cancellingBet = true;
        const orders: CancelOrders[] = [];
        let marketIds = un.map(a => a.marketId);
        marketIds = [...new Set(marketIds)];
        marketIds.forEach((mktId) => {
          const betArr = un
            .filter((x) => x.marketId == mktId)
            .map((x) => x.betId);
          if (betArr && betArr.length > 0) {
            orders.push(new CancelOrders(mktId, betArr));
          }
        });
        this.sportService
          .cancellallOrdersSports(
            new CancellAllOrders(this.eventId, 'MYBETS', orders)
          )
          .subscribe((resp: any) => {
            this.LoadCurrentBets()
            this.toasterService.show(resp.message, {
              classname: 'bg-success text-light',
              delay: 3000,
              sound: true,
            });
          })

      }
    }
  }

  sendingrequest: boolean = false
  LoadCurrentBets() {
    if (this.checkauthservice.IsLogin()) {
      this.sendingrequest = true;
      this.sportService
        .SportsCurrentbets(
          new CurrentBetsInput(this.currentBets[0].marketId.replace("1.", "10."), this.eventId, false),
          'CricketComponent'
        )
        .subscribe((resp) => {
          this.utillsService.currentBets.next({ bets: resp, eventId: this.eventId })
        })

    }
  }


}
