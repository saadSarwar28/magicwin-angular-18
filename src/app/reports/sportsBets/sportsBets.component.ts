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
  selector: 'app-sportsBets',
  templateUrl: './sportsBets.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss']
})
export class SportsBetsComponent implements OnInit {

  dateRangeFilterTypeBets: MyBetsInputModel = {
    filterType: 'SETTLED',
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),
  }
  filters = ['SETTLED', 'MATCHED', 'CANCEL', 'VOIDED', 'LAPSED', 'UNMATCHED'];
  sportsBets: MarketOrders[] = [];
  betsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  p = 0;
  isShownStart: any = false;
  isShownEnd: any = false;
  showLoader = false;
  toasterMessage: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  maxDate: string = ""
  constructor(private storageService: StorageService, private translate: TranslateService, private checkauthservice: CheckAuthService, private httpService: BackendService, private toasterService: ToastService, private router: Router) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }

  ngOnInit(): void {
    this.maxDate = formatDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en');
    this.getRunningWeekDates();
    if (this.checkauthservice.IsLogin()) {
      this.sportBetsWeek();
    }
  }

  dateInputForm = new FormGroup({
    startDate: new FormControl('', [Validators.required, futureDateRestictedValidator]),
    endDate: new FormControl('', [Validators.required, futureDateRestictedValidator]),
  })

  get startDate() {
    return this.dateInputForm.get('startDate');
  }

  get endDate() {
    return this.dateInputForm.get('endDate');
  }

  dateInputValues(event: any) {
    this.dateInputForm = event;
    this.getSportsBets()
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
  }

  setDateFormat(setteldDate: any) {
    return formatDate(setteldDate, 'MM/dd/yyyy h:mm:ss a', 'en')
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
        }
      } else {
        el.value = '127.0.0.1'
      }
    })
  }

  getSportsBets() {
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
        this.httpService.sportsbets(this.dateRangeFilterTypeBets, "SportsBetsComponent").subscribe((response: MarketOrders[]) => {
          if (response) {
            if (response.length === 0) {
              this.toasterService.show('No data found', { classname: 'bg-danger text-light' });
            }
            this.sportsBets = response;
          }
          this.showLoader = false
          // }, error => {
          //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
        })
      }
    }
  }

  // tslint:disable-next-line:typedef
  onChange(event: any) {
    this.dateRangeFilterTypeBets.filterType = 'SETTLED';
    this.dateRangeFilterTypeBets.filterType = event.target.value;
  }

  // tslint:disable-next-line:typedef
  sportBetsWeek() {
    this.showLoader = true;
    this.httpService.sportsbets(this.dateRangeFilterTypeBets, "SportsBetsComponent").subscribe((response: MarketOrders[]) => {
      if (response) {
        this.sportsBets = response;
        this.paginatedReports()
      }
      this.showLoader = false
      // , error => {
      //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
    })
  }

  // tslint:disable-next-line:typedef
  downloadSportsBets() {

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
    return Math.ceil(this.sportsBets.length / this.pageSize);
  }

  // handlePageChange(event: any) {
  //   if (this.currentPage > event) {
  //     this.previousPage()
  //   } else {
  //     this.nextPage()
  //   }
  // }
  //
  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.paginatedReports()
  //   }
  // }
  //
  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.paginatedReports()
  //   }
  // }

  // Load the data for the specific page
  loadPage(page: number) {
    this.currentPage = page;
    this.paginatedReports()
  }

  paginatedReports() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.betsToShow = this.sportsBets.slice(start, start + this.pageSize);
  }

}


