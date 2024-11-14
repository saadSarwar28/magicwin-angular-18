import { StorageService } from './../../services/storage.service';
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
@Component({
  selector: 'app-partial-betslip',
  templateUrl: './partial-betslip.component.html',
  styleUrls: ['./partial-betslip.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule, ShortennumPipe,
    FormsModule,
  ]

})
export class PartialBetslipComponent
  implements OnInit, OnDestroy, AfterViewInit {
  addPlusMinusBetSlip: boolean = false;
  parseFloat = parseFloat;
  ocb: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  isPrice: boolean = false;
  minMaxBetSlip: boolean = false;
  siteLoader: any;
  constructor(
    private translate: TranslateService,
    private toasterService: ToastService,
    private storageService: StorageService,
    private utilsSerivce: UtillsService,
  ) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().addPlusMinusBetSlip) {
      this.addPlusMinusBetSlip = _window().addPlusMinusBetSlip;
    }
    if (_window().showWhatIF) {
      this.showWhatIF = _window().showWhatIF;
    }
    if (_window().minMaxBetSlip) {
      this.minMaxBetSlip = _window().minMaxBetSlip;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
  }
  ngAfterViewInit(): void {
    // if (this.r) {
    //   const elem = document.getElementById('bs-' + this.r.marketId) as HTMLInputElement;
    //   this.scrollToElement(elem);
    // }
  }

  placingBet: any = false;
  pl: any;
  @Input() r: any;
  @Output() valueChange = new EventEmitter();
  @Input() isBM: boolean = false;
  @Input() showKA: boolean = true;
  @Output() whatIfFigure = new EventEmitter<{
    "pl": any,
    "stake": any,
    "selectionID": any,
    "bType": any,
    "marketId": any,
  }>();
  @Input() lineOddsDisable: boolean = false;
  @Input() otherRace: boolean = false;
  isReadOnly = false;
  toasterMessage = '';
  keepAlive: boolean = false;
  minimumBetSize: any = 1;
  looksabha: boolean = false;
  ngOnInit(): void {
    this.looksabha = this.r?.looksabha ? true : false;
    this.keepAlive =
      this.storageService.getItem('keepAlive') == null
        ? false
        : this.storageService.getItem('keepAlive');
    //
    if (this.r?.stakeButtons?.currencyCode == 'INR') {
      this.minimumBetSize = _window().minimumBetSize;
    }
    this.r ? this.r.size = _window().stakeSize : {}
    this.isReadOnly =
      this.r?.bettingOn == 'fn' ||
      this.r?.bettingOn == 'bm' ||
      this.lineOddsDisable || this.otherRace;
    this.pl = 0.0;
    if (this.r) {
      this.calcPL(this.r.size);
    }
  }

  setKeepAlive() {
    this.storageService.setItem('keepAlive', this.keepAlive);
  }

  ngOnChanges() {
    if (this.r) {
      this.r.size ? this.r.size = null : {};
      this.r.size ? this.r.size = 100 : {};
      this.r.price = this.r.price ? this.r.price : 1.01;
    }
  }

  validateMaxOddsValue(event: Event): void {
    if (this.r.bettingType === 'ODDS') {
      const input: any = event.target as HTMLInputElement;
      const value = parseInt(input.value);
      // Check if the value exceeds 100000
      if (value > 1000) {
        input.value = 1000;  // Reset to max value
        this.r.price = input.value;  // Reset to max value
      }
      if (value < 1) {
        input.value = 1;  // Reset to max value
        this.r.price = input.value;  // Reset to max value
      }
    }

    this.calcPL(this.r.price)
  }


  validateMaxStakeValue(event: Event): void {
    const input: any = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    // Check if the value exceeds 100000
    if (value > 1000000) {
      input.value = 1000000;  // Reset to max value
      this.r.size = input.value;  // Reset to max value
    }
    if (value < 1) {
      input.value = 1;  // Reset to max value
      this.r.size = input.value;  // Reset to max value
    }
    this.calcPL(this.r.size)
  }
  validateInput(event: any) {
    // Get the key that was pressed
    const key = event.key;

    // Allow digits and certain control keys like backspace
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
      event.preventDefault();  // Block the key
    }
  }
  addMinBet() {
    this.r.size = Number(this.r.minBet);
    this.calcPL(this.r.size);
  }
  addMaxBet() {
    this.r.size = Number(this.r.maxBet);
    this.calcPL(this.r.size);
  }
  increaseValue() {
    if (this.r.size < 1000000) {
      if (_window().addPlusMinusBetSlip) {
        if (this.r.size >= 20000) {
          this.r.size += 5000;
        } else if (this.r.size >= 4999 || this.r.size >= 20000) {
          this.r.size += 1000;
        } else if (this.r.size >= 1999 || this.r.size >= 5000) {
          this.r.size += 500;
        } else {
          this.r.size += 100;
        }
      } else {
        this.r.size += 1;
      }
      this.calcPL(this.r.size);
    }
  }
  decreaseValue() {
    if (_window().addPlusMinusBetSlip) {
      if (this.r.size >= 20000) {
        this.r.size -= 5000;
      } else if (this.r.size >= 4999 || this.r.size >= 20000) {
        this.r.size -= 1000;
      } else if (this.r.size >= 1999 || this.r.size >= 5000) {
        this.r.size -= 500;
      } else {
        if (this.r.size != 0) {
          this.r.size -= 100;
        }
      }
      if (this.r.size < 1) {
        this.r.size = 0;
      }
    } else {
      this.r.size -= 1;
      if (this.r.size < 2) {
        this.r.size = 1;
      }
    }
    this.calcPL(this.r.size);
  }
  clearStack() {
    this.r.size = null;
    this.calcPL(this.r.size);
  }
  buttonValue: any;
  lastValue: any;
  addValueToStack(value: any) {
    if (_window().addPlusMinusBetSlip) {
      if (this.lastValue != value) {
        this.r.size += value;
      } else {
        this.r.size += value;
        this.buttonValue += value;
      }
      this.lastValue = value;
    } else {
      this.r.size = value;
    }
    this.calcPL(this.r.size);

  }
  ngOnDestroy(): void {
    this.pl = 0.0;
  }
  invalidOdds: boolean = false;

  cancelBetSlip() {
    this.whatIfcall(null, null, null, null, this.r.marketId)
    this.r = null;
  }

  calcPL(stakeValue: any) {
    let pl = 0.0;
    if (
      (this.r.marketType !== 'INNINGS_RUNS' && this.r.bettingType !== 'LINE') ||
      (this.r.marketType !== 'LINE' && this.r.bettingType !== 'LINE')
    ) {
      if (
        this.r.bettingOn === 'bm' ||
        this.r?.bettingOn == 'fn'

        //  || this.r?.bettingOn == 'lotm'
      ) {
        if (this.r.bType === 'lay') {
          if (stakeValue == '') {
            pl = (parseFloat(this.r.price) * parseInt(this.r.size)) / 100;
          } else {
            pl = (parseFloat(this.r.price) * parseInt(stakeValue)) / 100;
          }
        } else {
          if (stakeValue == '') {
            //
            pl = (parseFloat(this.r.price) * parseInt(this.r.size)) / 100;
            //pl = this.r.size * this.r.price - this.r.size / 100;
          } else {
            pl = (parseFloat(this.r.price) * parseInt(stakeValue)) / 100;
            //pl = this.r.size * this.r.price - stakeValue / 100;
          }
        }
      } else {
        if (this.r.bType === 'lay') {
          if (stakeValue == '') {
            pl = (parseFloat(this.r.price) - 1) * parseInt(this.r.size);
          } else {
            pl = (parseFloat(this.r.price) - 1) * parseInt(stakeValue);
          }
        } else {
          if (stakeValue == '') {
            pl = this.r.size * this.r.price - this.r.size;
          } else {
            pl = this.r.size * this.r.price - stakeValue;
          }
        }
      }
    } else {
      pl = parseInt(stakeValue);
    }

    if (this.r.bettingType == 'LINE') {
      pl = parseInt(stakeValue);
    }
    this.pl = pl;
    this.whatIfcall(pl, this.r.selectionid, stakeValue, this.r.bType, this.r.marketId)
  }
  showWhatIF: boolean = true;
  whatIfcall(pl: any,
    selectionID: any,
    stake: any,
    bType: any,
    marketId: any) {
    if (this.showWhatIF) {
      this.whatIfFigure.emit({
        pl: pl,
        selectionID: selectionID,
        stake: stake,
        bType: bType,
        marketId: marketId,
      });
    }
  }

  async pb() {
    if (this.r.size < this.minimumBetSize) {
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
      this.r.size = this.minimumBetSize;
      this.calcPL(this.r.size);
      return;
    }
    if (this.r.price == null || this.r.price == 0 || this.r.price == '') {
      this.toasterService.show('Please enter the odds value', {
        classname: 'bg-danger text-white',
        delay: 3000,
        sound: true,
      });
      return;
    }
    this.placingBet = true;
    try {
      let response: any = await this.utilsSerivce.placeBet(this.r, this.looksabha)
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
      marketId: this.r.marketId
    });
    this.whatIfcall(null, null, null, null, this.r.marketId)
    this.r = null
  }
  CUp(val: any) {
    if (this.r.bettingType === 'LINE') {
      val = parseFloat(val === '' ? this.r.linerange.interval : val);
      if (val < parseInt(this.r.linerange.maxUnitValue)) {
        val = val + this.r.linerange.interval;
        this.r.price = val;
      } else {
        val = this.r.linerange.maxUnitValue - 0.5;
        this.r.price = val;
      }
    } else {
      val = parseFloat(val == '' ? 1.01 : val);
      if (val < 1000) {
        this.r.price = (val + this.getIncremental(val)).toFixed(2);
      }
    }
    // this.whatIfcall(this.pl, this.r.selectionid, this.r.size, this.r.bType, this.r.marketId)
  }

  CDown(val: any) {
    if (this.r.bettingType === 'LINE') {
      val = parseFloat(val === '' ? this.r.linerange.interval : val);
      if (val > 1) {
        val = val - this.r.linerange.interval;
        this.r.price = val;
      } else {
        val = this.r.linerange.maxUnitValue - 0.5;
        this.r.price = val;
      }
    } else {
      val = parseFloat(val == '' ? 1.01 : val);
      if (val > 1.01) {
        this.r.price = (val - this.getDecremental(val)).toFixed(2);
      }
    }

    console.log("this", this.pl)

    // this.whatIfcall(this.pl, this.r.selectionid, this.r.size, this.r.bType, this.r.marketId)

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
  // scrollToElement($element): void {
  //   $element.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'center',
  //     inline: 'center',
  //   });
  // }
}
