import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { CasinoBetsInputModel, MyBetsInputModel, SportsResult } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckAuthService } from '../../services/check-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { futureDateRestictedValidator } from '../../validators/restrict-future-date-validator';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss']
})
export class ResultsComponent implements OnInit {
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  showLoader = false;
  date: any;
  maxDate: string = ""
  filterType: CasinoBetsInputModel = new CasinoBetsInputModel(new Date(), "1");
  dateInputForm = new FormGroup({
    startDate: new FormControl('', [Validators.required, futureDateRestictedValidator]),
  })
  games = [
    {
      "value": "0",
      "text": "Fancy"
    },
    {
      "value": "1",
      "text": "Soccer"
    },
    {
      "value": "2",
      "text": "Tennis"
    },
    {
      "value": "3",
      "text": "Golf"
    },
    {
      "value": "4",
      "text": "Cricket"
    },
    {
      "value": "5",
      "text": "Rugby Union"
    },
    {
      "value": "6",
      "text": "Boxing"
    },
    {
      "value": "7",
      "text": "Horse Racing"
    },
    {
      "value": "8",
      "text": "Motor Sport"
    },
    {
      "value": "10",
      "text": "Special Bets"
    },
    {
      "value": "11",
      "text": "Cycling"
    },
    {
      "value": "12",
      "text": "Rowing"
    },
    {
      "value": "1477",
      "text": "Rugby League"
    },
    {
      "value": "3503",
      "text": "Darts"
    },
    {
      "value": "3988",
      "text": "Athletics"
    },
    {
      "value": "4339",
      "text": "Greyhound Racing"
    },
    {
      "value": "6231",
      "text": "Financial Bets"
    },
    {
      "value": "6422",
      "text": "Snooker"
    },
    {
      "value": "6423",
      "text": "American Football"
    },
    {
      "value": "7511",
      "text": "Baseball"
    },
    {
      "value": "7522",
      "text": "Basketball"
    },
    {
      "value": "7523",
      "text": "Hockey"
    },
    {
      "value": "7524",
      "text": "Ice Hockey"
    },
    {
      "value": "7525",
      "text": "Sumo Wrestling"
    },
    {
      "value": "8888",
      "text": "Ezugi Casino"
    },
    {
      "value": "9999",
      "text": "SuperSpade Casino"
    },
    {
      "value": "61420",
      "text": "Australian Rules"
    },
    {
      "value": "66599",
      "text": "Hurling"
    },
    {
      "value": "72382",
      "text": "Pool"
    },
    {
      "value": "136332",
      "text": "Chess"
    },
    {
      "value": "256284",
      "text": "Trotting"
    },
    {
      "value": "300000",
      "text": "Commonwealth Games"
    },
    {
      "value": "315220",
      "text": "Poker"
    },
    {
      "value": "451485",
      "text": "Winter Sports"
    },
    {
      "value": "468328",
      "text": "Handball"
    },
    {
      "value": "606611",
      "text": "Netball"
    },
    {
      "value": "620576",
      "text": "Swimming"
    },
    {
      "value": "627555",
      "text": "Badminton"
    },
    {
      "value": "665978",
      "text": "Gaelic Football"
    },
    {
      "value": "678378",
      "text": "International Rules"
    },
    {
      "value": "982477",
      "text": "Bridge"
    },
    {
      "value": "998916",
      "text": "Yachting"
    },
    {
      "value": "998917",
      "text": "Volleyball"
    },
    {
      "value": "998919",
      "text": "Bowls"
    },
    {
      "value": "998920",
      "text": "Floorball"
    },
    {
      "value": "1444073",
      "text": "Exchange Poker"
    },
    {
      "value": "1938544",
      "text": "Backgammon"
    },
    {
      "value": "2030972",
      "text": "GAA Sports"
    },
    {
      "value": "2152880",
      "text": "Gaelic Games"
    },
    {
      "value": "2264869",
      "text": "International Markets"
    },
    {
      "value": "2378961",
      "text": "Politics"
    },
    {
      "value": "26420387",
      "text": "Mixed Martial Arts"
    },
    {
      "value": "27388198",
      "text": "Current Affairs"
    },
    {
      "value": "27454571",
      "text": "E-Sports"
    }
  ]
    ;
  results: SportsResult[] = [];
  resultsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  p = 0;
  firstGame: any;
  dateRangeFilterTypeBets: MyBetsInputModel = {
    filterType: 'settled',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  };
  toasterMessage: any;

  constructor(private storageService: StorageService, private translate: TranslateService, private checkauthservice: CheckAuthService, private httpService: BackendService, private toasterService: ToastService, private router: Router) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }

  ngOnInit(): void {
    this.maxDate = formatDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en');
    if (this.checkauthservice.IsLogin()) {
      // this.getWeekResults();
      this.date = (formatDate(this.filterType.date, 'yyyy-MM-dd', 'en'));
    }

  }

  onChange(event: any) {
    this.filterType.filterType = event.target.value;
  }

  getResults() {
    // if ((document.getElementById('resultsDate') as HTMLInputElement).value !== '') {
    // this.filterType.date = (document.getElementById('resultsDate') as HTMLInputElement).value;
    // this.filterType.date = new Date(this.dateInputForm.controls.startDate.value).toISOString();
    // this.dateRange.endDate = new Date(this.dateInputForm.controls.endDate.value).toISOString();
    // }
    this.showLoader = true;
    const body = {
      date: new Date(`${this.dateInputForm.controls['endDate'].value}T${this.dateInputForm.controls['endTime'].value}`).toISOString(),
      filterType: this.dateInputForm.controls['filterType'].value.value
    }
    this.httpService.results(body, "ResultsComponent").subscribe((response: SportsResult[]) => {
      if (response) {
        if (response.length === 0) {
          this.toasterService.show('No data found', { classname: 'bg-danger text-light' });
        }
        this.results = response;
        this.paginatedReports()
        this.showLoader = false
      }
    })
  }

  getWeekResults() {
    this.showLoader = true;
    this.httpService.results(this.filterType, "ResultsComponent").subscribe((response: SportsResult[]) => {
      if (response) {
        this.results = response;
      }
      this.showLoader = false
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

  dateInputValues(event: any) {
    this.dateInputForm = event;
    this.getResults()
  }

  get totalPages() {
    return Math.ceil(this.results.length / this.pageSize);
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
    this.resultsToShow = this.results.slice(start, start + this.pageSize);
  }
}

