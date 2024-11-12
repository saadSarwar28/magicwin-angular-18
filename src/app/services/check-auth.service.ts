import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ClientParameters } from '../models/models';
import { BackendService } from './backend.service';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {
  cBuyRate: number = 1;
  currencyCode = "$";
  cTotalShare = 0;
  cLocalMarketRate = 1;
  cFancyRate = 1;
  cLineRate = 1;
  cBookmakerRate = 1;
  clientParameters: any = new BehaviorSubject(null);

  constructor(private router: Router, private sportsService: BackendService, private storageService: StorageService) {

  }
  IsLogin(): boolean {

    const token = this.storageService.secureStorage.getItem('token');
    if (token) {
      let decode: any = jwtDecode(token);
      if (Math.floor((new Date).getTime() / 1000) >= decode.exp) {
        this.storageService.secureStorage.clear();
        return false;
      }

      return true;
    }
    return false;
  }

  HaveStakes(): boolean {

    const stakes = this.storageService.secureStorage.getItem('stakes');
    if (stakes) {
      let r = JSON.parse(stakes)
      this.cBuyRate = r.cBuyRate;
      this.currencyCode = r.currencyCode + '-';
      this.cTotalShare = r.cShare + r.pShare;
      this.cLocalMarketRate = r.localMarketRate;
      this.cLineRate = r.lineRate;
      this.cFancyRate = r.fancyRate;
      this.cBookmakerRate = r.bookMakerRate;
      return true;
    } else {

      if (this.IsLogin()) {

        this.ClientParmeters();
        return true;
      }
      return false;

    }
  }

  getstaks() {
    let b = this.storageService.secureStorage.getItem('stakes');
    if (b) {
      return JSON.parse(b);
    } else {
      return {
        cBuyRate: 1,
        cSellRate: 1,
        pShare: 0,
        cShare: 0,
        currencyCode: "INR",
        stakeVal1: 200,
        stakeVal2: 300,
        stakeVal3: 400,
        stakeVal4: 500,
        stakeVal5: 600,
        stakeVal6: 700,
        stakeVal7: 800,
        stakeVal8: 900,
        fancyRate: 1000,
        bookMakerRate: 1,
        localMarketRate: 1,
        lineRate: 1
      };
    }
  }

  ClientParmeters() {

    this.sportsService
      .clientparameters('', 'DefaultComponent')
      .then((r: ClientParameters) => {
        if (this.storageService.secureStorage.getItem('stakes') == null) {
          this.storageService.secureStorage.setItem(
            'stakes',
            JSON.stringify(r)
          );
        }
        this.cBuyRate = r.cBuyRate;
        this.currencyCode = r.currencyCode + '-';
        this.cTotalShare = r.cShare + r.pShare;
        this.cLocalMarketRate = r.localMarketRate;
        this.cLineRate = r.lineRate;
        this.cFancyRate = r.fancyRate;
        this.cBookmakerRate = r.bookMakerRate;
        this.clientParameters.next(r)

      }).catch((err) => {
        if (err.status == 401) {
          this.router.navigate(['/sports']);
        } else console.log(err)
      });
  }
}

