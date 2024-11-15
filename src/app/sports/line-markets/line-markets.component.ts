import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { UtillsService } from '../../services/utills.service';
import { BookpositionComponent } from '../../shared/bookposition/bookposition.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { RoundoffPipe } from '../../pipes/roundoff.pipe';
import { GroupAndSortLineMarketsPipe } from '../../pipes/lineMarketPipe';
import { OddsbuttonComponent } from '../../shared/reuse/oddsbutton.component';
import { PartialBetslipComponent } from '../../shared/partial-betslip/partial-betslip.component';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-line-markets',
  templateUrl: './line-markets.component.html',
  styleUrls: ['./line-markets.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ShortennumPipe,
    RoundoffPipe,
    GroupAndSortLineMarketsPipe,
    OddsbuttonComponent,
    PartialBetslipComponent

  ]
})
export class LineMarketsComponent implements OnInit {

  @Input() lineData: any
  @Input() localMarketRate: any;
  @Input() lineRate: any;
  @Input() eventId: any;
  siteLoader: string = ""
  isOneClickBetGlobal: boolean = false
  @Output() loadBetsPosLib: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private genericService: GenericService,
    private utillsService: UtillsService,
    private storageService: StorageService,
    private toasterService: ToastService,
    private checkauthservice: CheckAuthService,
    private dialogRef: MatDialog,
    private platformService: PlatformService

  ) {

  }
  otherLineMarkets: any[] = []
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader;
      }
      if (_window().hideOCBonComp) {
        this.isOneClickBetGlobal = true;
      }
    }
  }

  lineBetPlacedStatus(status: any) {
    if (status.success) {
      this.lineData.forEach((l: any) => (l.betslip = null));
      this.loadBetsPosLib.emit(status.marketId)
    }
  }

  calculateWhatIf($event: any) {
    if (this.lineData && this.lineData.length > 0) {
      let markets = this.lineData.filter((market: any) => market.marketId == $event.marketId && !market.marketName?.includes('Line'))
      if (markets && markets.length > 0) {
        this.utillsService.calWhatIf(markets, $event)
      }
    }
  }

  collapseMarket(item: any) {
    item.collapse = !item.collapse;
  }

  openLinePosition(m: any, n: any) {
    if (this.checkauthservice.IsLogin()) {
      let data = { marketId: m, marketName: n }
      this.dialogRef.open(BookpositionComponent, {
        width: '500px',
        maxHeight: '70vh',
        maxWidth: '95vw',
        panelClass: 'my-markets-dialog',
        data,
      });
    } else {
      this.genericService.openLoginModal()
    }
  }

  oneClickBetObj: any = {
    lineMarkets: false,
    tiedMatch: false,
    completedMatch: false,
    toWinToss: false
  }

  async placeOneClickBet(betslip: any) {
    let betSize = this.storageService.getItem('OCBSelectedVal');
    betslip.size = betSize
    try {
      this.oneClickBetObj[betslip.oneClickType] = true
      let response: any = await this.utillsService.placeBet(betslip)
      this.betStatus(response, betslip.marketId)
    }
    catch (err: any) {
      this.catchError(err)
    }
    this.oneClickBetObj[betslip.oneClickType] = false
  }

  catchError(err: any) {
    if (err && err.status && err.status == 401) {
      this.storageService.removeItem('token');
      this.genericService.openLoginModal()
    } else {
      console.log(err);
    }
  }

  betStatus(resp: any, marketId: any) {
    let betstatus = resp.status;
    const message = resp.message || resp.response.message;
    if (betstatus) {
      this.loadBetsPosLib.emit(marketId)
      this.toasterService.show(message, {
        classname: 'bg-success text-white',
        delay: 4000,
        sound: true,
      });

    } else {
      this.toasterService.show(message, {
        classname: 'bg-danger text-white',
        delay: 4000,
        sound: true,
      });
    }
  }

  get isOneClickOn() {
    return this.storageService.getItem('OCB') && this.isOneClickBetGlobal
  }

  placebetLine(oneClickType: string, r: any, type: string, price: any) {
    if (!this.checkauthservice.IsLogin()) {
      this.genericService.openLoginModal()
      return
    }
    if (price == '' ||
      price == '0'
      || price == undefined || price == null) {
      return
    }
    this.lineData.forEach((l: any) => (l.betslip = null));
    let btn = this.checkauthservice.getstaks();
    let betOn = r.runnerName.toLowerCase().includes('line') ? 'LINE' : ''
    let betsSlip = {
      eventId: this.eventId,
      marketId: r.marketId,
      selectionid: r.selectionId,
      name: r.runnerName,
      handicap: r.handicap,
      price: price,
      size: btn.stakeVal2,
      bType: type,
      stakeButtons: btn,
      bettingOn: betOn,
      bettingType: betOn,
      marketType: betOn,
      linerange: r.lineRangeInfo,
      oneClickType
    }
    if (this.isOneClickOn) {
      this.placeOneClickBet(betsSlip)
    } else {
      if (betOn == "LINE") {
        r.betslip = {
          ...betsSlip,
          minBet: this.lineData[0].minSettings,
          maxBet: this.lineData[0].maxSettings * this.lineRate,
        };
      } else {
        r.betslip = {
          ...betsSlip,
          minBet: r?.minSettings,
          maxBet: r?.maxSettings * this.localMarketRate,
        };
      }
    }

  }


}

