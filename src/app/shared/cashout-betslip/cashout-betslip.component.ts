import { StorageService } from './../../services/storage.service';
import { BackendService } from '../../services/backend.service';

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

import { ToastService } from '../../services/toast.service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { CommonModule } from '@angular/common';
import { ShortennumPipe } from '../../pipes/shortennum.pipe';
import { FormsModule } from '@angular/forms';
import { PlatformService } from '../../services/platform.service';
@Component({
  selector: 'app-cashout-betslip',
  templateUrl: './cashout-betslip.component.html',
  styleUrls: ['./cashout-betslip.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ShortennumPipe,
    FormsModule,

  ]
})
export class CashoutBetslipComponent implements OnInit, AfterViewInit {
  @Input() market: any;
  fancyMarketSlip: boolean = false;
  parseFloat = parseFloat;
  ocb: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  isPrice: boolean = false;
  minMaxBetSlip: boolean = false;
  addPlusMinusBetSlip: boolean = false;
  looksabha: boolean = false;
  siteLoader: any;
  constructor(
    private translate: TranslateService,
    private toasterService: ToastService,
    private utilsSerivce: UtillsService,
    private storageService: StorageService,
    private platformService: PlatformService
  ) {
    if (this.platformService.isBrowser()) {

      if (_window().cdnImagesUrl) {
        this.cdnUrl = _window().cdnImagesUrl;
      }
      if (_window().addPlusMinusBetSlip) {
        this.addPlusMinusBetSlip = _window().addPlusMinusBetSlip;
      }
      if (_window().minMaxBetSlip) {
        this.minMaxBetSlip = _window().minMaxBetSlip;
      }
      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader;
      }
    }
  }
  ngAfterViewInit(): void { }

  placingBet: any = false;
  pl: any;

  @Output() valueChange = new EventEmitter();
  isReadOnly = false;
  toasterMessage = '';
  keepAlive: boolean = false;
  minimumBetSize: any = 1;
  @Input() r: any;
  @Input() showKA: boolean = true;
  @Input() lineOddsDisable: boolean = false;
  bookmaker: string[] = [];
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      this.looksabha = this.r?.looksabha ? true : false;
      if (this.market.betslip?.bookMakerMarkets) {
        this.bookmaker = this.market.betslip?.bookMakerMarkets;
      } else {
        this.bookmaker = [];
      }

      this.keepAlive =
        this.storageService.getItem('keepAlive') == null
          ? false
          : this.storageService.getItem('keepAlive');
      if (this.market && this.market.runners && this.market.runners.length < 3) {
        const initialValue = 0;
        const sumWithInitial = this.market.runners.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue.position,
          initialValue
        );
        if (sumWithInitial != 0) {
          let data: any = [];
          this.market.runners.forEach((element: any) => {
            data.push({
              runnerid: element.selectionId,
              position: element.position,
              back: this.bookmaker.includes(this.market.marketName)
                ? element.back[0].price / 100 + 1
                : element.back[0].price,
              lay: this.bookmaker.includes(this.market.marketName)
                ? element.lay[0].price / 100 + 1
                : element.lay[0].price,
              stake: 0,
              side: '',
              isFav: 0,
            });
          });
          let faviourt: any;
          if (data && data.length > 0) {
            if (this.bookmaker.includes(this.market.marketName)) {
              let backLay = this.market.runners.filter(
                (item: any) => item.backOdds == 0 && item.layOdds == 0
              );
              if (backLay && backLay.length > 0) {
                faviourt = data.reduce((min: any, obj: any) =>
                  obj['back'] > min['back'] ? obj : min
                );
              } else {
                faviourt = data.reduce((min: any, obj: any) =>
                  obj['back'] < min['back'] ? obj : min
                );
              }
            } else {
              faviourt = data.reduce((min: any, obj: any) =>
                obj['back'] < min['back'] ? obj : min
              );
            }

            let positionA = 0;
            let positionB = 0;
            data.forEach((element: any) => {
              if (element.runnerid == faviourt.runnerid) {
                element.isFav = 1;
                positionA = element.position;
              } else {
                positionB = element.position;
              }
            });

            if (positionA == positionB) {
              this.market.betslip = null;
            }
            if (positionB > positionA) {
              faviourt.side = 'back';
              this.minimumBetSize = Math.round(
                Math.abs(
                  (positionB * (faviourt.back - 1) + positionA) / faviourt.back -
                  positionB
                )
              );
              faviourt.stake =
                this.minimumBetSize === Infinity ? 0 : this.minimumBetSize;
              this.market.betslip.bType = faviourt.side;
              this.market.betslip.size = faviourt.stake;
              this.market.betslip.price = faviourt.back;
              this.market.betslip.selectionid = faviourt.runnerid;
            } else {
              data.forEach((x: any) => {
                if (x.position == positionB) {
                  this.minimumBetSize = Math.round(
                    Math.abs(
                      (x.position * (faviourt.lay - 1) + positionA) /
                      faviourt.lay -
                      x.position
                    )
                  );
                  faviourt.side = 'lay';
                  faviourt.stake =
                    this.minimumBetSize === Infinity ? 0 : this.minimumBetSize;
                  this.market.betslip.bType = faviourt.side;
                  this.market.betslip.size = faviourt.stake;
                  this.market.betslip.price = faviourt.lay;
                  this.market.betslip.selectionid = faviourt.runnerid;
                }
              });
            }
          }

          let price = this.market.betslip.price.toString()
          if (price.includes('.')) {
            const [integerPart, decimalPart] = price.split('.');
            // Limit decimal part to 2 digits
            if (decimalPart.length > 2) {
              this.market.betslip.price = + `${integerPart}.${decimalPart.substring(0, 2)}`;
            }
          }



        } else {
          this.market.betslip = null;
        }
      } else {
        this.market.betslip = null;
      }
      //
      if (this.r?.stakeButtons?.currencyCode == 'INR') {
        this.minimumBetSize = _window().minimumBetSize;
      }
      this.pl = 0.0;
      this.calcPL('');
      this.isReadOnly =
        this.market.betslip?.bettingOn == 'fn' ||
        this.market.betslip?.bettingOn == 'bm' ||
        this.lineOddsDisable;
    }
  }

  setKeepAlive() {
    this.storageService.setItem('keepAlive', this.keepAlive);
  }
  ngOnChanges() { }

  addMinBet() {
    this.market.betslip.size = this.market.betslip.minBet;
    this.calcPL(this.market.betslip.size);
  }
  addMaxBet() {
    this.market.betslip.size = this.market.betslip.maxBet;
    this.calcPL(this.market.betslip.size);
  }
  validateMaxStakeValue(event: Event): void {
    const input: any = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    // Check if the value exceeds 100000
    if (value > 1000000) {
      input.value = 1000000;  // Reset to max value
      this.market.betslip.size = input.value;  // Reset to max value
    }
    if (value < 1) {
      input.value = 1;  // Reset to max value
      this.market.betslip.size = input.value;  // Reset to max value
    }
    this.calcPL(this.market.betslip.size)
  }
  validateInput(event: any) {
    // Get the key that was pressed
    const key = event.key;

    // Allow digits and certain control keys like backspace
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
      event.preventDefault();  // Block the key
    }
  }
  validateMaxOddsValue(event: Event): void {
    if (this.market.betslip.bettingType === 'ODDS') {
      const input: any = event.target as HTMLInputElement;
      const value = parseInt(input.value);
      // Check if the value exceeds 100000
      if (value > 1000) {
        input.value = 1000;  // Reset to max value
        this.market.betslip.price = input.value;  // Reset to max value
      }
      if (value < 1) {
        input.value = 1;  // Reset to max value
        this.market.betslip.price = input.value;  // Reset to max value
      }
    }

    this.calcPL(this.market.betslip.price)
  }
  increaseValue() {
    if (this.market.betslip.size < 1000000) {
      if (_window().addPlusMinusBetSlip) {
        if (this.market.betslip.size >= 20000) {
          this.market.betslip.size += 5000;
        } else if (
          this.market.betslip.size >= 4999 ||
          this.market.betslip.size >= 20000
        ) {
          this.market.betslip.size += 1000;
        } else if (
          this.market.betslip.size >= 1999 ||
          this.market.betslip.size >= 5000
        ) {
          this.market.betslip.size += 500;
        } else {
          this.market.betslip.size += 100;
        }
      } else {
        this.market.betslip.size += 1;
      }

      this.calcPL(this.market.betslip.size);
    }
  }
  decreaseValue() {
    if (_window().addPlusMinusBetSlip) {
      if (this.market.betslip.size >= 20000) {
        this.market.betslip.size -= 5000;
      } else if (
        this.market.betslip.size >= 4999 ||
        this.market.betslip.size >= 20000
      ) {
        this.market.betslip.size -= 1000;
      } else if (
        this.market.betslip.size >= 1999 ||
        this.market.betslip.size >= 5000
      ) {
        this.market.betslip.size -= 500;
      } else {
        if (this.market.betslip.size != 0) {
          this.market.betslip.size -= 100;
        }
      }
      if (this.market.betslip.size < 1) {
        this.market.betslip.size = 0;
      }
    } else {
      this.market.betslip.size -= 1;
      if (this.market.betslip.size < 2) {
        this.market.betslip.size = 1;
      }
    }
    this.calcPL(this.market.betslip.size);
  }
  clearStack() {
    this.market.betslip.size = null;
    this.calcPL(this.market.betslip.size);
  }
  buttonValue: any;
  lastValue: any;
  addValueToStack(value: any) {
    if (_window().addPlusMinusBetSlip) {
      if (this.lastValue != value) {
        this.market.betslip.size += value;
        this.calcPL(this.market.betslip.size);
      } else {
        this.market.betslip.size += value;
        this.buttonValue += value;
        this.calcPL(this.market.betslip.size);
      }
      this.lastValue = value;
    } else {
      this.market.betslip.size = value;
      this.calcPL(this.market.betslip.size);
    }
  }
  ngOnDestroy(): void {
    this.pl = 0.0;
  }
  invalidOdds: boolean = false;

  cancelBetSlip() {
    this.market.betslip = null;
    this.market.cashout = false;
    this.placingBet = false;
  }

  calcPL(stakeValue: any) {
    let pl = 0.0;
    if (
      (this.market.betslip?.marketType !== 'INNINGS_RUNS' &&
        this.market.betslip?.bettingType !== 'LINE') ||
      (this.market.betslip.marketType !== 'LINE' &&
        this.market.betslip?.bettingType !== 'LINE')
    ) {
      if (this.market.betslip?.bettingOn === 'bm') {
        if (this.market.betslip?.bType === 'lay') {
          if (stakeValue == '') {
            pl =
              ((parseFloat(this.market.betslip.price) - 1) *
                parseInt(this.market.betslip.size)) /
              100;
          } else {
            pl =
              ((parseFloat(this.market.betslip.price) - 1) *
                parseInt(stakeValue)) /
              100;
          }
        } else {
          if (stakeValue == '') {
            //
            pl =
              ((parseFloat(this.market.betslip.price) - 1) *
                parseInt(this.market.betslip.size)) /
              100;
            //pl = this.market.betslip.size * this.market.betslip.price - this.market.betslip.size / 100;
          } else {
            pl =
              ((parseFloat(this.market.betslip.price) - 1) *
                parseInt(stakeValue)) /
              100;
            //pl = this.market.betslip.size * this.market.betslip.price - stakeValue / 100;
          }
        }
      } else {
        if (this.market.betslip?.bType === 'lay') {
          if (stakeValue == '') {
            pl =
              (parseFloat(this.market.betslip.price) - 1) *
              parseInt(this.market.betslip.size);
          } else {
            pl =
              (parseFloat(this.market.betslip.price) - 1) *
              parseInt(stakeValue);
          }
        } else {
          if (stakeValue == '') {
            //

            pl =
              this.market.betslip.size * this.market.betslip.price -
              this.market.betslip.size;
          } else {
            pl =
              this.market.betslip.size * this.market.betslip.price - stakeValue;
          }
        }
      }
    } else {
      pl = parseInt(stakeValue);
    }

    if (this.market.betslip.bettingType == 'LINE') {
      pl = parseInt(stakeValue);
    }

    this.pl = pl;
  }
  async pb() {
    if (this.market.betslip.size < this.minimumBetSize) {
      let beforeAmount = this.toasterTranslationMethod('bettinglessthan');
      let afterAmount = this.toasterTranslationMethod('isnotallowed');
      this.toasterService.show(
        beforeAmount + ' ' + this.minimumBetSize + ' ' + afterAmount,
        {
          classname: 'bg-danger text-white',
          delay: 3000,
          sound: true,
        }
      );
      this.market.betslip.size = this.minimumBetSize;
      this.calcPL(this.market.betslip.size);
      return;
    }
    if (this.market.betslip.price == null || this.market.betslip.price == 0 || this.market.betslip.price == '') {
      this.toasterService.show('Please enter the odds value', {
        classname: 'bg-danger text-white',
        delay: 3000,
        sound: true,
      });
      return;
    }
    this.placingBet = true;
    let betPrice = this.market.betslip.price ? parseFloat(this.market.betslip.price) : 0;
    this.market.betslip.price = this.bookmaker.includes(this.market.marketName)
      ? ((betPrice - 1) * 100).toFixed(2)
      : betPrice.toFixed(2);
    try {
      let response: any = await this.utilsSerivce.placeBet(this.market.betslip, this.looksabha)
      this.betStatus(response)
    }
    catch (err: any) {
      this.catchError(err)
    }
    finally {
      this.placingBet = false
    }

  }

  catchError(err: any) {
    this.placingBet = false
    if (err && err.status && err.status == 401) {
      this.storageService.removeItem('token');
    } else {
      console.log(err);
    }
  }

  betStatus(resp: any) {
    this.placingBet = false
    let betstatus = resp.status;
    const translatedResponse = resp.message || resp.response.message;
    if (betstatus) {
      this.toasterService.show(translatedResponse, {
        classname: 'bg-success text-white',
        delay: 4000,
        sound: true,
      });

      this.betPlacedStatus(true)
    } else {
      this.toasterService.show(translatedResponse, {
        classname: 'bg-danger text-white',
        delay: 4000,
        sound: true,
      });
      this.placingBet = false
    }
  }





  betPlacedStatus(result: boolean) {
    this.valueChange.emit({
      success: result,
      marketId: this.market.betslip.marketId
    });
    this.market.betslip = null
  }
  CUp(val: any) {
    if (this.market.betslip.bettingType === 'LINE') {
      val = parseFloat(
        val === '' ? this.market.betslip.linerange.interval : val
      );
      if (val < parseInt(this.market.betslip.linerange.maxUnitValue)) {
        val = val + this.market.betslip.linerange.interval;
        this.market.betslip.price = val;
      } else {
        val = this.market.betslip.linerange.maxUnitValue - 0.5;
        this.market.betslip.price = val;
      }
    } else {
      val = parseFloat(val == '' ? 1.01 : val);
      if (val < 1000) {
        this.market.betslip.price = (val + this.getIncremental(val)).toFixed(2);
      }
    }
  }

  CDown(val: any) {
    if (this.market.betslip.bettingType === 'LINE') {
      val = parseFloat(
        val === '' ? this.market.betslip.linerange.interval : val
      );
      if (val > 1) {
        val = val - this.market.betslip.linerange.interval;
        this.market.betslip.price = val;
      } else {
        val = this.market.betslip.linerange.maxUnitValue - 0.5;
        this.market.betslip.price = val;
      }
    } else {
      val = parseFloat(val == '' ? 1.01 : val);
      if (val > 1.01) {
        this.market.betslip.price = (val - this.getDecremental(val)).toFixed(2);
      }
    }
  }

  getIncremental(val: number): number {
    let step = 0;
    if (val < 2) {
      step = 0.01;
    } else if (val >= 2 && val < 3) {
      step = 0.02;
    } else if (val >= 3 && val < 4) {
      step = 0.05;
    } else if (val >= 4 && val < 6) {
      step = 0.1;
    } else if (val >= 6 && val < 10) {
      step = 0.2;
    } else if (val >= 10 && val < 20) {
      step = 0.5;
    } else if (val >= 20 && val < 30) {
      step = 1;
    } else if (val >= 30 && val < 50) {
      step = 2;
    } else if (val >= 50 && val < 100) {
      step = 5;
    } else if (val >= 100 && val < 1000) {
      step = 10;
    } else if (val > 1000) {
      step = 0.01;
    }
    return step;
  }

  getDecremental(val: number): number {
    let step = 0;
    if (val <= 2) {
      step = 0.01;
    } else if (val > 2 && val <= 3) {
      step = 0.02;
    } else if (val > 3 && val <= 4) {
      step = 0.05;
    } else if (val > 4 && val <= 6) {
      step = 0.1;
    } else if (val > 6 && val <= 10) {
      step = 0.2;
    } else if (val > 10 && val <= 20) {
      step = 0.5;
    } else if (val > 20 && val <= 30) {
      step = 1;
    } else if (val > 30 && val <= 50) {
      step = 2;
    } else if (val > 50 && val <= 100) {
      step = 5;
    } else if (val > 100 && val <= 1000) {
      step = 10;
    } else if (val > 1000) {
      step = 0.01;
    }
    return step;
  }

  validation(inp: any) {
    if (this.market.betslip.bettingType === 'LINE') return;
    var valuesOdd = [
      1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.1, 1.11, 1.12,
      1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19, 1.2, 1.21, 1.22, 1.23, 1.24,
      1.25, 1.26, 1.27, 1.28, 1.29, 1.3, 1.31, 1.32, 1.33, 1.34, 1.35, 1.36,
      1.37, 1.38, 1.39, 1.4, 1.41, 1.42, 1.43, 1.44, 1.45, 1.46, 1.47, 1.48,
      1.49, 1.5, 1.51, 1.52, 1.53, 1.54, 1.55, 1.56, 1.57, 1.58, 1.59, 1.6,
      1.61, 1.62, 1.63, 1.64, 1.65, 1.66, 1.67, 1.68, 1.69, 1.7, 1.71, 1.72,
      1.73, 1.74, 1.75, 1.76, 1.77, 1.78, 1.79, 1.8, 1.81, 1.82, 1.83, 1.84,
      1.85, 1.86, 1.87, 1.88, 1.89, 1.9, 1.91, 1.92, 1.93, 1.94, 1.95, 1.96,
      1.97, 1.98, 1.99, 2.0, 2.02, 2.04, 2.06, 2.08, 2.1, 2.12, 2.14, 2.16,
      2.18, 2.2, 2.22, 2.24, 2.26, 2.28, 2.3, 2.32, 2.34, 2.36, 2.38, 2.4, 2.42,
      2.44, 2.46, 2.48, 2.5, 2.52, 2.54, 2.56, 2.58, 2.6, 2.62, 2.64, 2.66,
      2.68, 2.7, 2.72, 2.74, 2.76, 2.78, 2.8, 2.82, 2.84, 2.86, 2.88, 2.9, 2.92,
      2.94, 2.96, 2.98, 3.0, 3.05, 3.1, 3.15, 3.2, 3.25, 3.3, 3.35, 3.4, 3.45,
      3.5, 3.55, 3.6, 3.65, 3.7, 3.75, 3.8, 3.85, 3.9, 3.95, 4.0, 4.05, 4.1,
      4.15, 4.2, 4.25, 4.3, 4.35, 4.4, 4.45, 4.5, 4.55, 4.6, 4.65, 4.7, 4.75,
      4.8, 4.85, 4.9, 4.95, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9,
      6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4,
      7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9,
      9.0, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.0, 10.2, 10.4, 10.6,
      10.8, 11.0, 11.2, 11.4, 11.6, 11.8, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0,
      13.2, 13.4, 13.6, 13.8, 14.0, 14.2, 14.4, 14.6, 14.8, 15.0, 15.2, 15.4,
      15.6, 15.8, 16.0, 16.2, 16.4, 16.6, 16.8, 17.0, 17.2, 17.4, 17.6, 17.8,
      18.0, 18.2, 18.4, 18.6, 18.8, 19.0, 19.2, 19.4, 19.6, 19.8, 20.0, 20.5,
      21.0, 21.5, 22.0, 22.5, 23.0, 23.5, 24.0, 24.5, 25.0, 25.5, 26.0, 26.5,
      27.0, 27.5, 28.0, 28.5, 29.0, 29.5, 30.0, 31.0, 32.0, 33.0, 34.0, 35.0,
      36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0, 43.0, 44.0, 45.0, 46.0, 47.0,
      48.0, 49.0, 50.0, 52.0, 54.0, 56.0, 58.0, 60.0, 62.0, 64.0, 66.0, 68.0,
      70.0, 72.0, 74.0, 76.0, 78.0, 80.0, 82.0, 84.0, 86.0, 88.0, 90.0, 92.0,
      94.0, 96.0, 98.0, 100.0, 105.0, 110.0, 115.0, 120.0, 125.0, 130.0, 135.0,
      140.0, 145.0, 150.0, 155.0, 160.0, 165.0, 170.0, 175.0, 180.0, 185.0,
      190.0, 195.0, 200.0, 205.0, 210.0, 215.0, 220.0, 225.0, 230.0, 235.0,
      240.0, 245.0, 250.0, 255.0, 260.0, 265.0, 270.0, 275.0, 280.0, 285.0,
      290.0, 295.0, 300.0, 305.0, 310.0, 315.0, 320.0, 325.0, 330.0, 335.0,
      340.0, 345.0, 350.0, 355.0, 360.0, 365.0, 370.0, 375.0, 380.0, 385.0,
      390.0, 395.0, 400.0, 405.0, 410.0, 415.0, 420.0, 425.0, 430.0, 435.0,
      440.0, 445.0, 450.0, 455.0, 460.0, 465.0, 470.0, 475.0, 480.0, 485.0,
      490.0, 495.0, 500.0, 510.0, 520.0, 530.0, 540.0, 550.0, 560.0, 570.0,
      580.0, 590.0, 600.0, 610.0, 620.0, 630.0, 640.0, 650.0, 660.0, 670.0,
      680.0, 690.0, 700.0, 710.0, 720.0, 730.0, 740.0, 750.0, 760.0, 770.0,
      780.0, 790.0, 800.0, 810.0, 820.0, 830.0, 840.0, 850.0, 860.0, 870.0,
      880.0, 890.0, 900.0, 910.0, 920.0, 930.0, 940.0, 950.0, 960.0, 970.0,
      980.0, 990.0, 1000.0,
    ];

    if (valuesOdd.indexOf(parseFloat(inp)) === -1) {
      this.invalidOdds = true;
    } else {
      this.invalidOdds = false;
    }
  }

  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    if (resp.substring('</br>')) {
      resp = resp.replace(' </br>', '');
    }
    resp = resp.split(/(\d+)/);
    if (resp.length) {
      for (let i = 0; i < resp.length; i++) {
        if (isNaN(resp[i])) {
          this.translate.get(resp[i]).subscribe((res: string) => {
            this.toasterMessage = this.toasterMessage + res;
          });
        } else {
          this.toasterMessage = this.toasterMessage + resp[i];
        }
      }
    } else {
      this.translate.get(resp).subscribe((res: string) => {
        this.toasterMessage = res;
      });
    }
    return this.toasterMessage;
  }
  scrollToElement($element: any): void {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
}
