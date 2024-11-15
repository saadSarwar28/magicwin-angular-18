import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { _window } from '../../services/backend.service';

import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { ToastService } from '../../services/toast.service';
import { BettingService, CancellAllOrders, CancelOrders } from '../../services/betting.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FilterBets } from "../../pipes/filterbets.pipe";
import { RoundoffPipe } from "../../pipes/roundoff.pipe";
import { PlatformService } from '../../services/platform.service';
@Component({
  selector: 'app-mybets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    FilterBets,
    RoundoffPipe
  ]
})
export class MybetsComponent implements OnInit, OnChanges {
  @Input() currentBets: any;
  @Input() eventId: any
  @Input() sendingrequest: boolean = false
  @Input() xgames: boolean = false
  // @Output() avgBets: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelBet: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadBets: EventEmitter<any> = new EventEmitter<any>();
  cancellingBet: boolean = false
  haveUnmatched: boolean = false
  siteLoader: string = ''
  constructor(
    private bettingService: BettingService,
    private checkauthservice: CheckAuthService,
    private toasterService: ToastService,
    private genericService: GenericService,
    private platformService: PlatformService

  ) {

  }
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader;
      }
      if (this.currentBets.some((x: any) => x.betStatus == 'Un-Matched Bets')) {
        this.haveUnmatched = true;
      } else {
        this.haveUnmatched = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.platformService.isBrowser()) {

      if (changes['currentBets']) {
        if (this.currentBets.some((x: any) => x.betStatus == 'Un-Matched Bets')) {
          this.haveUnmatched = true;
        } else {
          this.haveUnmatched = false;

        }
      }
    }
  }


  isLoadBets = false
  LoadCurrentBets() {
    this.isLoadBets = true
    setTimeout(() => {
      this.isLoadBets = false
    }, 500)
    this.loadBets.emit()
  }

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
          (x: any) => x.betStatus == 'Un-Matched Bets'
        );
      }
      if (un && un.length > 0) {
        this.cancellingBet = true;
        const orders: CancelOrders[] = [];
        let marketIds = un.map((a: any) => a.marketId);
        marketIds = [...new Set(marketIds)];
        marketIds.forEach((mktId: any) => {
          const betArr = un
            .filter((x: any) => x.marketId == mktId)
            .map((x: any) => x.betId);
          if (betArr && betArr.length > 0) {
            orders.push(new CancelOrders(mktId, betArr));
          }
        });
        this.bettingService
          .cancellallOrdersSports(
            new CancellAllOrders(this.eventId, 'MYBETS', orders)
          )
          .subscribe(
            {
              next: (resp: any) => {
                this.loadBets.emit()
                this.cancelBet.emit(marketIds)
                this.toasterService.show(resp.message, {
                  classname: 'bg-success text-light',
                  delay: 3000,
                  sound: true,
                });
                this.cancellingBet = false;
              },
              error: (err) => {
                this.cancellingBet = false;
                if (err.status == 401) {
                  this.genericService.openLoginModal()
                } else {
                  console.log(err);
                  this.toasterService.show(err, {
                    classname: 'bg-danger text-light',
                    delay: 1500,
                    sound: true,
                  });
                }
              },
            }
          )

      }
    }
  }


}
