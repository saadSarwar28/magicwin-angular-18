import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

import { MyBetsInputModel, MarketOrders, IPAddressForBetIds } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { futureDateRestictedValidator } from '../../validators/restrict-future-date-validator';
@Component({
  selector: 'app-fancyBets',
  templateUrl: './fancyBets.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss']
})
export class FancyBetsComponent implements OnInit {

  maxDate: string = ""
  showLoader = false;
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

  isShownStart: any = false;
  isShownEnd: any = false;

  stackButtons: any;
  dateRange = {
    startDate: null,
    endDate: null
  };
  dateRangeFilterTypeBets: MyBetsInputModel = {
    filterType: 'SETTLED',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  };
  dateAndFilterBets = {
    filterType: '',
    date: null
  };
  accountStatements = [];
  fancyBets: MarketOrders[] = [];
  betsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  xgBets = [];
  casinoBets = [];
  profitLoss = [];
  filters = ['SETTLED', 'MATCHED', 'VOIDED'];
  sportsBets = [];
  activityLogs = [];
  results = [];
  p = 0;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  constructor(private storageService: StorageService, private checkauthservice: CheckAuthService, private httpService: BackendService, private toasterService: ToastService, private router: Router, private translate: TranslateService) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }

  ngOnInit(): void {
    this.maxDate = formatDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en');
    if (this.checkauthservice.IsLogin()) {
      this.getRunningWeekDates();
    }
  }

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
    this.dateInputForm.controls.endDate.setValue(formatDate(startDate, 'yyyy-MM-dd', 'en'));
    this.dateInputForm.controls.startDate.setValue(formatDate(endDate, 'yyyy-MM-dd', 'en'));
  }

  // tslint:disable-next-line:typedef
  onChange(event: any) {
    this.dateRangeFilterTypeBets.filterType = 'SETTLED';
    this.dateAndFilterBets.filterType = 'SETTLED';
    this.dateRangeFilterTypeBets.filterType = event.target.value;
    this.dateAndFilterBets.filterType = event.target.value;
  }


  dateInputValues(event: any) {
    this.dateInputForm = event;
    this.getFancyBets()
  }


  // tslint:disable-next-line:typedef
  getFancyBets() {
    console.log(' in here ')
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
        this.dateRangeFilterTypeBets.filterType = this.dateInputForm.controls['filterType'].value;
        this.httpService.fancybets(this.dateRangeFilterTypeBets, "FancybetsComponent").subscribe((response: MarketOrders[]) => {
          if (response) {
            if (response.length === 0) {
              this.toasterService.show('No data found', { classname: 'bg-danger text-light' });
            }
            this.fancyBets = response;
            this.paginatedReports()
            this.showLoader = false
          }
          // }, error => {
          //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
        })
      }
    }
  }

  // tslint:disable-next-line:typedef
  fancyBetsWeek() {
    this.showLoader = true;
    this.httpService.fancybets(this.dateRangeFilterTypeBets, "FancybetsComponent").subscribe((response: MarketOrders[]) => {
      if (response) {
        this.fancyBets = response;
        this.paginatedReports()
        this.showLoader = false
      }
      // }, error => {
      //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
    })
  }

  // tslint:disable-next-line:typedef
  downloadSportsBets() {

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
          // el.value=resp;
          if (resp == '') {
            el.value = '127.0.0.1'
          } else {
            el.value = resp;
          }
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

  get totalPages() {
    return Math.ceil(this.fancyBets.length / this.pageSize);
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.paginatedReports()
  }

  paginatedReports() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.betsToShow = this.fancyBets.slice(start, start + this.pageSize);
  }

}

