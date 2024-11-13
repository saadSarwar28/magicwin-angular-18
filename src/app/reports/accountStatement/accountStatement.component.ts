import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, MinValidator, Validators } from "@angular/forms";
import { DatePipe, formatDate } from "@angular/common";
import { AccountStatementSubReport, AccountstmtInputModel, AccountstmtModel } from '../../models/models';
import { ToastService } from '../../services/toast.service';
import { BackendService, _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-statement',
  templateUrl: './accountStatement.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AccountStatementComponent implements OnInit {
  stackButtons: any;
  showLoader = false;
  dateRange: AccountstmtInputModel = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  };

  accountStatementSubShow: any = false;
  accountStatementShow: any = true;
  accountStatementsSub: AccountStatementSubReport[] = [];
  // dateRangeFilterTypeBets = {
  //   filterType: 'settled',
  //   startDate: new Date(),
  //   endDate: new Date()
  // };
  dateAndFilterBets = {
    filterType: '',
    date: null
  };
  accountStatements: AccountstmtModel[] = [];
  accountStatementsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  fancyBets = [];
  xgBets = [];
  casinoBets = [];
  profitLoss = [];
  filters = ['SETTLED', 'MATCHED', 'CANCEL', 'VOIDED', 'LAPSED'];
  sportsBets = [];
  activityLogs = [];
  results = [];
  p = 0;
  isShownStart: any = false;
  isShownEnd: any = false;
  nextDayWithTime: string;
  daterangepickerOptions = {
    startDate: '09/01/2017',
    endDate: '09/02/2017',
    format: 'DD/MM/YYYY'
  }
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  dateInputForm: FormGroup;
  toasterMessage: any;

  constructor(
    private storageService: StorageService,
    private httpService: BackendService,
    private toasterService: ToastService,
    private router: Router,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours to get the next day
    nextDay.setHours(23, 59, 59, 999);
    const options: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    this.nextDayWithTime = nextDay.toLocaleString('en-US', options);
    //this.nextDayWithTime = nextDay.toISOString();
    //alert(this.nextDayWithTime)
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    let curr = new Date();
    let first = curr.getDate();
    let last = first - 6;
    let startDate = new Date(curr.setDate(first));
    // let endDate = new Date(curr.setDate(last));
    let endDate = new Date(this.nextDayWithTime);
    // new Date(startDate).toISOString();
    // new Date(endDate).toISOString();
    this.dateRange.endDate = this.datepipe.transform(new Date(startDate), 'short');
    this.dateRange.startDate = this.datepipe.transform(new Date(endDate), 'short');
    // this.dateInputForm.controls.endDate.setValue(formatDate(startDate, 'yyyy-MM-dd HH:MM', 'en'));
    // this.dateInputForm.controls.startDate.setValue(formatDate(endDate, 'yyyy-MM-dd', 'en'));
    this.dateInputForm = this.fb.group({
      startDate: ['this.dateRange.startDate', Validators.compose([Validators.required])],
      endDate: [this.dateRange.endDate, Validators.required]
    }, { Validator: this.dateLessThan('dateFrom', 'dateTo') });
  }

  get totalPages() {
    return Math.ceil(this.accountStatements.length / this.pageSize);
  }

  // Load the data for the specific page
  loadPage(page: number) {
    this.currentPage = page;
    this.paginatedStatements()
  }

  // optional methods
  // handlePageChange(event: any) {
  //   if (this.currentPage > event) {
  //     this.previousPage()
  //   } else {
  //     this.nextPage()
  //   }
  // }

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.paginatedStatements()
  //   }
  // }
  //
  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.paginatedStatements()
  //   }
  // }

  // Optional: Create a method to slice the accountStatements based on currentPage
  paginatedStatements() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.accountStatementsToShow = this.accountStatements.slice(start, start + this.pageSize);
  }

  dateInputValues(event: any) {
    this.dateInputForm = event;
    this.getAccountStatement()
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

  get startDate() {
    return this.dateInputForm.get('startDate');
  }

  get endDate() {
    return this.dateInputForm.get('endDate');
  }

  ngOnInit(): void {
    // this.accountStatementWeek();
  }

  getRunningWeekDates() {

    // this.dateInputForm.controls.endDate.setValue( this.datepipe.transform(startDate,'short' ));
    // this.dateInputForm.controls.startDate.setValue(this.datepipe.transform(endDate,'short'));

    // console.log(this.dateInputForm.value);
  }


  // tslint:disable-next-line:typedef
  getAccountStatement() {
    if (this.dateInputForm.invalid) {
      this.isShownStart = true;
      this.isShownEnd = true;
    } else {
      // console.log("this.dateRange", new Date(this.dateInputForm.controls.startDate.value).toISOString());
      // console.log("this.dateRange", new Date());
      if ((this.dateInputForm.controls['startDate'].value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("Start date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else if ((this.dateInputForm.controls['endDate'].value) < '2020-01-01') {
        const translatedResponse = this.toasterTranslationMethod("End date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else if ((this.dateInputForm.controls['startDate'].value) > (this.dateInputForm.controls['endDate'].value)) {
        const translatedResponse = this.toasterTranslationMethod("Please select a valid date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else {
        this.isShownStart = false;
        this.isShownEnd = false;
        this.showLoader = true;
        this.dateRange.startDate = new Date(this.dateInputForm.controls['startDate'].value).toISOString();
        this.dateRange.endDate = new Date(this.dateInputForm.controls['endDate'].value).toISOString();
        this.httpService.accountstatement(this.dateRange, "AccountStatementComponent").subscribe((response: AccountstmtModel[]) => {
          if (response) {
            this.accountStatements = response;
            this.paginatedStatements()
            this.showLoader = false
          }
        })
      }
    }
  }

  accountStatementWeek() {
    this.showLoader = true;
    let curr = new Date();
    let first = curr.getDate();
    let last = first - 6;
    //let endDate = new Date(new Date().toUTCString());
    let endDate = new Date(this.nextDayWithTime);
    let startDate = new Date(new Date(curr.setDate(last)).toUTCString());
    this.dateInputForm = this.fb.group({
      startDate: [startDate, Validators.compose([Validators.required])],
      endDate: [endDate, Validators.required]
    }, { Validator: this.dateLessThan('dateFrom', 'dateTo') });
    this.dateRange.startDate = this.dateInputForm.controls['startDate'].value;
    this.dateRange.endDate = this.dateInputForm.controls['endDate'].value;
    this.httpService.accountstatement(this.dateRange, "AccountStatementComponent").subscribe((response: AccountstmtModel[]) => {
      if (response) {
        this.accountStatements = response;
        this.showLoader = false
      }
      // , error => {
      //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
    })
  }


  // tslint:disable-next-line:typedef
  downloadSportsBets() {

  }


  setDateFormat(setteldDate: any) {
    return formatDate(setteldDate, 'MM/dd/yyyy h:mm:ss a', 'en')
  }

  accountStatementSub(marketID: any, i: any, narration: any) {
    if (narration.includes('Commission')) {
      return
    } else if (marketID == '') {
      return
    } else {
      this.showLoader = true;
      this.httpService.accountstatementsub(marketID, "AccountStatementComponent").subscribe((response: AccountStatementSubReport[]) => {
        if (response) {
          this.accountStatementsSub = response;
          this.accountStatementSubShow = true;
          this.accountStatementShow = false;
          this.showLoader = false
        }
      })
    }
  }

  setDateFormatSub(placedDate: any) {
    return formatDate(placedDate, 'yyyy-MM-dd    h:mm:ss', 'en')
  }

  showAccountStatement() {
    this.accountStatementSubShow = false;
    this.accountStatementShow = true;
  }

  checkRunningBalance(number: any, i: any) {
    if (number < 0) {
      (document.getElementById('runningBalance' + i) as HTMLElement).style.color = '#dc3545';
      return number;
    } else {
      (document.getElementById('runningBalance' + i) as HTMLElement).style.color = '#198754';
      return number;
    }
  }

  checkProfitLossInner(number: any, i: any) {
    if (number < 0) {
      (document.getElementById('runningBalance' + i) as HTMLElement).style.color = '#dc3545';
      return number;
    } else {
      (document.getElementById('runningBalance' + i) as HTMLElement).style.color = '#198754';
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

}
