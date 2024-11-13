import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { CasinoBetsInputModel, CasinoOrders, MyBetsInputModel } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { futureDateRestictedValidator } from '../../validators/restrict-future-date-validator';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-casinoBets',
  templateUrl: './casinoBets.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss']
})
export class CasinoBetsComponent implements OnInit {
  stackButtons: any;
  showLoader = false;
  dateRange = {
    startDate: null,
    endDate: null
  };
  dateRangeFilterTypeBets: MyBetsInputModel;
  // dateRangeFilterTypeBets = {
  //   filterType: '',
  //   startDate: null,
  //   endDate: null
  // };
  dateAndFilterBets: CasinoBetsInputModel = {
    filterType: 'SETTLED',
    date: new Date().toISOString()
  };
  accountStatements = [];
  fancyBets = [];
  xgBets = [];
  casinoBets: CasinoOrders[] = [];
  betsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  profitLoss = [];
  filters = ['SETTLED', 'MATCHED', 'CANCEL', 'VOIDED', 'LAPSED'];
  sportsBets = [];
  activityLogs = [];
  results = [];
  p = 0;
  isShownDate: any = false;
  toasterMessage: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  maxDate: string = ""
  constructor(private storageService: StorageService, private checkauthservice: CheckAuthService,
    private translate: TranslateService, private httpService: BackendService, private toasterService: ToastService, private router: Router) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    this.dateRangeFilterTypeBets = new MyBetsInputModel("SETTLED", new Date(), new Date());
  }

  ngOnInit(): void {

    this.maxDate = formatDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en');
    //this.getRunningWeekDates();
    if (this.checkauthservice.IsLogin()) {
      // this.casinoBetsWeek();
    }
    this.dateInputForm.controls.date.setValue(this.dateAndFilterBets.date);
  }

  dateInputForm = new FormGroup({
    date: new FormControl('', [Validators.required, futureDateRestictedValidator]),
  })

  get date() {
    return this.dateInputForm.get('date');
  }

  dateInputValues(event: any) {
    this.dateInputForm = event;
    this.getCasinoBets()
  }

  getCasinoBets() {
    if (this.dateInputForm.invalid) {
      this.isShownDate = true;
    } else {
      if ((this.dateInputForm.controls['endDate'].value) < new Date('2020-01-01')) {
        const translatedResponse = this.toasterTranslationMethod("Selected date is too old date");
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      } else {
        this.isShownDate = false;
        this.showLoader = true;
        // this.dateAndFilterBets.date = (document.getElementById('startdate') as HTMLInputElement).value;
        // this.dateAndFilterBets.date = new Date(this.dateAndFilterBets.date).toISOString();
        const body = {
          date: new Date(`${this.dateInputForm.controls['endDate'].value}T${this.dateInputForm.controls['endTime'].value}`).toISOString(),
          filterType: this.dateInputForm.controls['filterType'].value
        }
        this.httpService.casinobets(body, "CasinoBetsComponent").subscribe((response: CasinoOrders[]) => {
          if (response) {
            if (response.length === 0) {
              this.toasterService.show('No data found', { classname: 'bg-danger text-light' });
            }
            this.showLoader = false
            this.casinoBets = response;
            this.paginatedReports()
          }
          // }, error => {
          //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
        })
      }
    }
  }

  casinoBetsWeek() {
    this.showLoader = true;
    this.httpService.casinobets(this.dateAndFilterBets, "CasinoBetsComponent").subscribe((response: CasinoOrders[]) => {
      if (response) {
        this.casinoBets = response;
        this.showLoader = false
        this.paginatedReports()
      }
      // }, error => {
      //   this.toasterService.show(error, {classname: 'bg-danger text-light'});
    })
  }

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
    return Math.ceil(this.casinoBets.length / this.pageSize);
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
    this.betsToShow = this.casinoBets.slice(start, start + this.pageSize);
  }

}
