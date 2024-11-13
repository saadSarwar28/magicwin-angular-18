import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { MyBetsInputModel, MarketOrders, IPAddressForBetIds } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { futureDateRestictedValidator } from '../../validators/restrict-future-date-validator';
@Component({
  selector: 'app-xgBets',
  templateUrl: './xgBets.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss']
})
export class XgBetsComponent implements OnInit {
  showLoader = false;
  stackButtons: any;
  dateRange = {
    startDate: null,
    endDate: null
  };
  isShownStart: any = false;
  isShownEnd: any = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  maxDate: string = ""
  dateInputForm = new FormGroup({
    startDate: new FormControl('', [Validators.required, futureDateRestictedValidator]),
    endDate: new FormControl('', [Validators.required, futureDateRestictedValidator])
  })
  toasterMessage: any;

  get startDate() {
    return this.dateInputForm.get('startDate');
  }

  get endDate() {
    return this.dateInputForm.get('endDate');
  }

  dateRangeFilterTypeBets: MyBetsInputModel;
  dateAndFilterBets = {
    filterType: '',
    date: null
  };
  accountStatements = [];
  fancyBets = [];
  xgBets: MarketOrders[] = [];
  casinoBets = [];
  profitLoss = [];
  filters = ['SETTLED', 'MATCHED', 'CANCEL', 'VOIDED', 'LAPSED'];
  sportsBets = [];
  activityLogs = [];
  results = [];
  p = 0;

  constructor(private storageService: StorageService, private translate: TranslateService, private checkauthservice: CheckAuthService, private httpService: BackendService, private toasterService: ToastService, private router: Router) {
    this.xgBets = [];
    this.dateRangeFilterTypeBets = new MyBetsInputModel("SETTLED", new Date(), new Date());
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }

  }

  ngOnInit(): void {
    this.maxDate = formatDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en');
    if (this.checkauthservice.IsLogin()) {
      this.getRunningWeekDates();
      this.xgBetsWeek();
    }
  }

  // tslint:disable-next-line:typedef
  getRunningWeekDates() {
    const curr = new Date();
    const first = curr.getDate();
    const last = first - 6;
    const startDate = new Date(curr.setDate(first));
    const endDate = new Date(curr.setDate(last));
    const temp = new Date('2015-02-02').toISOString();
    new Date(startDate).toISOString();
    new Date(endDate).toISOString();
    this.dateRangeFilterTypeBets.endDate = startDate;
    this.dateRangeFilterTypeBets.startDate = endDate;
  }

  // tslint:disable-next-line:typedef
  onChange(event: any) {
    this.dateRangeFilterTypeBets.filterType = 'SETTLED';
    this.dateAndFilterBets.filterType = 'SETTLED';
    this.dateRangeFilterTypeBets.filterType = event.target.value;
    this.dateAndFilterBets.filterType = event.target.value;
  }

  // tslint:disable-next-line:typedef
  getXGBets() {
    if (this.dateInputForm.invalid) {
      this.isShownStart = true;
      this.isShownEnd = true;
    } else {
      if ((this.dateInputForm.controls.startDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("Start date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else if ((this.dateInputForm.controls.endDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("End date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else if ((this.dateInputForm.controls.startDate.value) > (this.dateInputForm.controls.endDate.value)) {
        const translatedResponse = this.toasterTranslationMethod("Please select a valid date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else {
        this.isShownStart = false;
        this.isShownEnd = false;
        this.showLoader = true;
        // this.dateRangeFilterTypeBets.startDate = (document.getElementById('startdate') as HTMLInputElement).value;
        // this.dateRangeFilterTypeBets.endDate = (document.getElementById('enddate') as HTMLInputElement).value;
        this.dateRangeFilterTypeBets.startDate = new Date(this.dateInputForm.controls.startDate.value).toISOString();
        this.dateRangeFilterTypeBets.endDate = new Date(this.dateInputForm.controls.endDate.value).toISOString();
        this.httpService.exchangemybets(this.dateRangeFilterTypeBets, "XgBetsComponent").subscribe((response: MarketOrders[]) => {
          if (response) {
            if (response.length === 0) {
              this.toasterService.show('No data found', { classname: 'bg-danger text-light' });
            }
            this.xgBets = response;
          }
          this.showLoader = false
          // }, error => {
          //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
        })
      }
    }
  }

  // tslint:disable-next-line:typedef
  xgBetsWeek() {
    this.showLoader = true;
    this.httpService.exchangemybets(this.dateRangeFilterTypeBets, "XgBetsComponent").subscribe((response: MarketOrders[]) => {
      if (response) {
        this.xgBets = response;
      }
      this.showLoader = false
      // }, error => {
      //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
    })
  }

  // tslint:disable-next-line:typedef
  downloadSportsBets() {

  }

  setDateFormat(placedDate: any) {
    return formatDate(placedDate, 'MM/dd/yyyy h:mm:ss a', 'en');
  }

  GetIpAddress(marketId: any, betid: any, type: any) {
    let el = document.getElementById(betid) as HTMLButtonElement;
    if (!el) {
      return
    }
    this.httpService.GetiPAddressForBetid(new IPAddressForBetIds(marketId, betid, type)).subscribe(resp => {
      if (resp == '') {
        el.value = '127.0.0.1'
      }
      if (resp) {
        if (el) {
          el.disabled = true;
          if (resp == '') {
            el.value = '127.0.0.1'
          } else {
            el.value = resp;
          }
          // el.value=resp;
        }
      }
    })
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

}

