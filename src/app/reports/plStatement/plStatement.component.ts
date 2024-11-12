import { Component, OnInit } from '@angular/core';

// import {ToastService} from "../../services/toaster.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';

import { PLInner, PLInnerSub, AccountstmtInputModel, PLInnerInput, PLModel } from 'src/app/models/models';
import { BackendService, _window } from 'src/app/services/backend.service';
import { ToastService } from 'src/app/services/toast.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
type NewType = undefined;
import { StorageService } from 'src/app/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { futureDateRestictedValidator } from 'src/app/validators/restrict-future-date-validator';


@Component({
  selector: 'app-plStatement',
  templateUrl: './plStatement.component.html',
  styleUrls: ['./plStatement.component.scss']
})
export class PlStatementComponent implements OnInit {

  profitLossMainReport: any = true;
  profitLossSportsWise: any = false;
  profitLossMarketWise: any = false;

  showLoader = false;
  profitLossInner: PLInner[] = [];
  profitLossMarketWiseRes: PLInnerSub[] = [];
  innerResultsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  dateRange: AccountstmtInputModel = {
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString()
  };
  dateRangeFilterTypeBets = {
    filterType: '',
    startDate: null,
    endDate: null
  };
  dateRangeInner: PLInnerInput = {
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),
    eventType: '',
    type: 'RptPLMarkets'
  };
  dateAndFilterBets = {
    filterType: '',
    date: null
  };
  accountStatements = [];
  fancyBets = [];
  xgBets = [];
  casinoBets = [];
  profitLoss: PLModel[] = [];
  filters = ['SETTLED', 'MATCHED', 'CANCEL', 'VOIDED', 'LAPSED'];
  sportsBets = [];
  activityLogs = [];
  results = [];
  p = 0;
  isShownStart: any = false;
  isShownEnd: any = false;
  startDateSportsWise: any;
  endDateSportsWise: any;
  startDateMarketWise: any;
  endDateMarketWise: any;
  dateRangeMarketWise: PLInnerInput = {
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),
    eventType: '',
    type: 'RptPLBetWise'
  };
  toasterMessage: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  maxDate: string = ""
  constructor(private storageService: StorageService, private translate: TranslateService, private checkauthservice: CheckAuthService, private httpService: BackendService, private toasterService: ToastService, private router: Router, private fb: FormBuilder) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }

  ngOnInit(): void {
    this.maxDate = formatDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en');
    if (this.checkauthservice.IsLogin()) {
      // this.profitLossWeek();
    }
  }

  dateInputForm = new FormGroup({
    startDate: new FormControl('', [Validators.required, futureDateRestictedValidator]),
    endDate: new FormControl('', [Validators.required, futureDateRestictedValidator])
  })


  get startDate() {
    return this.dateInputForm.get('startDate');
  }

  get endDate() {
    return this.dateInputForm.get('endDate');
  }

  dateInputValues(event: any) {
    this.dateInputForm = event;
    this.getProfitLossStatement();
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
    this.dateRangeInner.endDate = startDate;
    this.dateRangeInner.startDate = endDate;
    this.dateRange.endDate = startDate;
    this.dateRange.startDate = endDate;
    this.dateRangeMarketWise.endDate = startDate;
    this.dateRangeMarketWise.startDate = endDate;
    this.dateInputForm.controls.endDate.setValue(formatDate(startDate, 'yyyy-MM-dd', 'en'));
    this.dateInputForm.controls.startDate.setValue(formatDate(endDate, 'yyyy-MM-dd', 'en'));
    this.startDateSportsWise = (formatDate(endDate, 'yyyy-MM-dd', 'en'));
    this.endDateSportsWise = (formatDate(startDate, 'yyyy-MM-dd', 'en'));
    this.startDateMarketWise = (formatDate(endDate, 'yyyy-MM-dd', 'en'));
    this.endDateMarketWise = (formatDate(startDate, 'yyyy-MM-dd', 'en'));
  }

  // tslint:disable-next-line:typedef
  //getPDF() {
  //    this.dateRange.startDate = (document.getElementById('start-date-account-statement') as HTMLInputElement).value;
  //    this.dateRange.endDate = (document.getElementById('end-date-account-statement') as HTMLInputElement).value;
  //    this.httpService.post(`${environment.url}/exchangeapi/reports/accountstatement`, this.dateRange).subscribe((data: Blob) => {
  //            const file = new Blob([data], {type: 'application/pdf'});
  //            const fileURL = URL.createObjectURL(file);
  //            window.open(fileURL);
  //            const a = document.createElement('a');
  //            a.href = fileURL;
  //            a.target = '_blank';
  //            a.download = 'bill.pdf';
  //            document.body.appendChild(a);
  //            a.click();
  //        },
  //        (error) => {
  //            console.log('getPDF error: ', error);
  //        }
  //    );
  //}

  // tslint:disable-next-line:typedef
  //getRunningWeekDates() {
  //    const curr = new Date();
  //    const first = curr.getDate();
  //    const last = first - 6;
  //    const startDate = new Date(curr.setDate(first));
  //    const endDate = new Date(curr.setDate(last));
  //    // tslint:disable-next-line:max-line-length
  //    (document.getElementById('end-date-profitLoss') as HTMLInputElement).value = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);
  //    (document.getElementById('start-date-profitLoss') as HTMLInputElement).value = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2);
  //    const temp = new Date('2015-02-02').toISOString();
  //    new Date(startDate).toISOString();
  //    new Date(endDate).toISOString();

  //    this.dateRange.startDate = endDate;
  //    this.dateRange.endDate = startDate;
  //    this.dateRangeFilterTypeBets.filterType = 'settled';
  //}

  // tslint:disable-next-line:typedef
  onChange(event: any) {
    this.dateRangeFilterTypeBets.filterType = 'SETTLED';
    this.dateAndFilterBets.filterType = 'SETTLED';
    this.dateRangeFilterTypeBets.filterType = event.target.value;
    this.dateAndFilterBets.filterType = event.target.value;
  }

  // tslint:disable-next-line:typedef
  getProfitLossStatement() {
    if (this.dateInputForm.invalid) {
      this.isShownStart = true;
      this.isShownEnd = true;
    } else {
      if ((this.dateInputForm.controls.startDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("Start date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else if ((this.dateInputForm.controls.endDate.value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod('End date is too old date');
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else if ((this.dateInputForm.controls.startDate.value) > (this.dateInputForm.controls.endDate.value)) {
        const translatedResponse = this.toasterTranslationMethod("Please select a valid date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else {
        if (this.profitLossSportsWise == true) {
          this.getProfitLossSportsWiseStatement();
          return
        } else if (this.profitLossMarketWise == true) {
          this.getProfitLossMarketWiseStatement();
          return
        }
        this.isShownStart = false;
        this.isShownEnd = false;
        this.showLoader = true;
        // this.dateRange.startDate = (document.getElementById('start-date-profitLoss') as HTMLInputElement).value;
        // this.dateRange.endDate = (document.getElementById('end-date-profitLoss') as HTMLInputElement).value;
        this.dateRange.startDate = new Date(this.dateInputForm.controls.startDate.value).toISOString();
        this.dateRange.endDate = new Date(this.dateInputForm.controls.endDate.value).toISOString();
        this.httpService.pl(this.dateRange, "PlStatementComponent").then((response: PLModel[]) => {
          if (response) {
            if (response.length === 0) {
              this.toasterService.show('No data found', { classname: 'bg-danger text-light' });
            }
            this.profitLoss = response;
          }
          // }, error => {
          //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
        }).catch(err => {
          if (err.status == 401) {
            // this.router.navigate(['signin']);
            this.storageService.secureStorage.removeItem('token');
            window.location.href = window.location.origin
          } else {
            console.log(err);
            const translatedResponse = this.toasterTranslationMethod(err);
            this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
          }
        }).finally(() => this.showLoader = false);
      }
    }
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  // tslint:disable-next-line:typedef
  profitLossWeek() {
    this.showLoader = true;
    let curr = new Date();
    let first = curr.getDate();
    let last = first - 6;
    let endDate = new Date(new Date().toUTCString());
    let startDate = new Date(new Date(curr.setDate(last)).toUTCString());
    this.dateInputForm = this.fb.group({
      startDate: new FormControl(startDate, [Validators.required, futureDateRestictedValidator]),
      endDate: new FormControl(endDate, [Validators.required, futureDateRestictedValidator])
    }, { Validator: this.dateLessThan('dateFrom', 'dateTo') });
    this.dateRange.startDate = this.dateInputForm.controls.startDate.value;
    this.dateRange.endDate = this.dateInputForm.controls.endDate.value;
    this.httpService.pl(this.dateRange, "PlStatementComponent").then((response: PLModel[]) => {
      if (response.length > 0) {
        this.profitLoss = response;
      } else {
        this.toasterService.show("No Report Found.", {
          classname: 'bg-danger text-light',
          delay: 1000,
        });
      }
      // }, error => {
      //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
    }).catch(err => {
      if (err.status == 401) {
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err);
        const translatedResponse = this.toasterTranslationMethod(err);
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      }
    }).finally(() => this.showLoader = false);
  }

  downloadSportsBets() {

  }


  plCalc(arr: any) {
    let total = 0
    if (arr) {

      arr.forEach((item: any) => {
        total += item.cPL;
      })
      return total

    } else {
      return 0
    }
  }

  plCalcComm(arr: any) {
    let total = 0
    if (arr) {

      arr.forEach((item: any) => {
        total += item.cCom;
      })
      return total

    } else {
      return 0
    }
  }


  profitLossSportsWiseWeek(eventTypeId: any) {
    this.profitLossMainReport = false;
    this.profitLossSportsWise = true;
    this.dateRangeInner.eventType = eventTypeId;
    this.showLoader = true;
    let curr = new Date();
    let first = curr.getDate();
    let last = first - 6;
    this.dateRangeInner.endDate = new Date(new Date().toUTCString()).toISOString();
    this.dateRangeInner.startDate = new Date(new Date(curr.setDate(last)).toUTCString()).toISOString();

    this.httpService.plsportswise(this.dateRangeInner, "PlStatementComponent").then((response: PLInner[]) => {

      if (response) {
        this.profitLossInner = response;
        this.paginatedReports()
      }
    }).catch(err => {
      if (err.status == 401) {
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err)
        this.toasterService.show(err, { classname: 'bg-danger text-light' });
      }
    }).finally(() => this.showLoader = false);
  }

  showProfitLossMainReport() {
    this.profitLossMarketWise = false;
    this.profitLossSportsWise = false;
    this.profitLossMainReport = true;
  }

  getProfitLossSportsWiseStatement() {
    // if (this.dateInputForm.invalid) {
    //   this.isShownStart = true;
    //   this.isShownEnd = true;
    // } else {
    //   if (((document.getElementById('start-date-profitLoss-sports-wise') as HTMLInputElement).value) < '2020-01-01') {
    //     this.toasterService.show('Start date is too old date', {classname: 'bg-danger text-light'});
    //   } else if (((document.getElementById('end-date-profitLoss-sports-wise') as HTMLInputElement).value) < '2020-01-01') {
    //     this.toasterService.show('End date is too old date', {classname: 'bg-danger text-light'});
    //   } else if (((document.getElementById('start-date-profitLoss-sports-wise') as HTMLInputElement).value) > ((document.getElementById('end-date-profitLoss-sports-wise') as HTMLInputElement).value)) {
    //     this.toasterService.show('Please select a valid date', {classname: 'bg-danger text-light'});
    //   } else {
    this.showLoader = true
    // this.dateRangeInner.startDate = (document.getElementById('start-date-profitLoss') as HTMLInputElement).value;
    // this.dateRangeInner.endDate = (document.getElementById('end-date-profitLoss') as HTMLInputElement).value;
    this.dateRangeInner.startDate = new Date(this.dateInputForm.controls.startDate.value).toISOString();
    this.dateRangeInner.endDate = new Date(this.dateInputForm.controls.endDate.value).toISOString();
    this.httpService.plsportswise(this.dateRangeInner, "PlStatementComponent").then((response: PLInner[]) => {
      if (response) {
        this.profitLossInner = response;
        this.paginatedReports()
      }
    }).catch(err => {
      if (err.status == 401) {
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin

      } else {
        console.log(err);
        const translatedResponse = this.toasterTranslationMethod(err);
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      }
    }).finally(() => this.showLoader = false);
    //   }
    // }
  }

  showProfitLossSportsWiseReport() {
    this.profitLossMarketWise = false;
    this.profitLossSportsWise = true;
  }

  showProfitLossWeekReportSportsWiseReport(marketId: any) {
    this.profitLossSportsWise = false;
    this.profitLossMarketWise = true;
    this.showLoader = true;
    this.dateRangeMarketWise.eventType = marketId;
    this.httpService.plsmarketwise(this.dateRangeMarketWise, "PlStatementComponent").then((response: PLInnerSub[]) => {
      if (response) {
        response.forEach(x => x.net = Number(x.cPL + x.cCom))
        this.profitLossMarketWiseRes = response;
      }
    }).catch(err => {
      if (err.status == 401) {
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err)
        this.toasterService.show(err, { classname: 'bg-danger text-light' });
      }
    }).finally(() => this.showLoader = false);
  }

  getProfitLossMarketWiseStatement() {
    // if (this.dateInputForm.invalid) {
    //   this.isShownStart = true;
    //   this.isShownEnd = true;
    // } else {
    //   if (((document.getElementById('start-date-profitLoss-market-wise') as HTMLInputElement).value) < '2020-01-01') {
    //     this.toasterService.show('Start date is too old date', {classname: 'bg-danger text-light'});
    //   } else if (((document.getElementById('end-date-profitLoss-market-wise') as HTMLInputElement).value) < '2020-01-01') {
    //     this.toasterService.show('End date is too old date', {classname: 'bg-danger text-light'});
    //   } else if (((document.getElementById('start-date-profitLoss-market-wise') as HTMLInputElement).value) > ((document.getElementById('end-date-profitLoss-market-wise') as HTMLInputElement).value)) {
    //     this.toasterService.show('Please select a valid date', {classname: 'bg-danger text-light'});
    //   } else {
    this.showLoader = true;
    // this.dateRangeMarketWise.startDate = (document.getElementById('start-date-profitLoss') as HTMLInputElement).value;
    // this.dateRangeMarketWise.endDate = (document.getElementById('end-date-profitLoss') as HTMLInputElement).value;
    this.dateRangeMarketWise.startDate = new Date(this.dateInputForm.controls.startDate.value).toISOString();
    this.dateRangeMarketWise.endDate = new Date(this.dateInputForm.controls.endDate.value).toISOString();
    this.httpService.plsmarketwise(this.dateRangeMarketWise, "PlStatementComponent").then((response: PLInnerSub[]) => {
      if (response) {
        this.profitLossMarketWiseRes = response;
      }
    }).catch(err => {
      if (err.status == 401) {
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err)
        this.toasterService.show(err, { classname: 'bg-danger text-light' });
      }
    }).finally(() => this.showLoader = false);
    //   }
    // }
  }

  checkProfitLoss(number: any, i: any) {
    if (number < 0) {
      (document.getElementById('profitLossMainReport' + i) as HTMLElement).style.color = '#dc3545';
      return number;
    } else {
      (document.getElementById('profitLossMainReport' + i) as HTMLElement).style.color = '#198754';
      return number;
    }
  }

  checkProfitLossSportsWise(number: any, i: any) {
    if (number < 0) {
      (document.getElementById('profitLossSportsWise' + i) as HTMLElement).style.color = '#dc3545';
      return number;
    } else {
      (document.getElementById('profitLossSportsWise' + i) as HTMLElement).style.color = '#198754';
      return number;
    }
  }

  checkProfitLossMarketWise(number: any, i: any) {
    if (number < 0) {
      (document.getElementById('profitLossMarketWise' + i) as HTMLElement).style.color = '#dc3545';
      (document.getElementById('profitLossMarketWise' + i) as HTMLElement).style.fontWeight = '700';
      return number;
    } else {
      (document.getElementById('profitLossMarketWise' + i) as HTMLElement).style.color = '#198754';
      (document.getElementById('profitLossMarketWise' + i) as HTMLElement).style.fontWeight = '700';
      return number;
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

  get totalPages() {
    return Math.ceil(this.profitLossInner.length / this.pageSize);
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
    this.innerResultsToShow = this.profitLossInner.slice(start, start + this.pageSize);
  }

}

