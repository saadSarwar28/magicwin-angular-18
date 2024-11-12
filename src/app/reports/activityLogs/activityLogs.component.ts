import { Component, OnInit } from '@angular/core';
import { ActivityLogs } from 'src/app/models/models';
import { BackendService, _window } from 'src/app/services/backend.service';
import { ToastService } from 'src/app/services/toast.service';
import { formatDate } from "@angular/common";
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { Router } from '@angular/router';
import * as M from "materialize-css";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-activityLogs',
  templateUrl: './activityLogs.component.html',
  styleUrls: ['../accountStatement/accountStatement.component.scss']
})
export class ActivityLogsComponent implements OnInit {

  activityLogs: ActivityLogs[] = [];
  logsToShow!: any; // This will hold the API data
  currentPage = 1; // Track the current page
  pageSize = 10; // Number of records per page
  p = 0;
  showLoader = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  constructor(private storageService: StorageService, private router: Router, private httpService: BackendService, private toasterService: ToastService, private checkauthservice: CheckAuthService) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    this.activityLogs = [];
  }

  ngOnInit(): void {
    if (this.checkauthservice.IsLogin()) {
      this.getActivityLog();
    }
  }


  // tslint:disable-next-line:typedef
  getActivityLog() {
    this.showLoader = true
    this.httpService.activity("ActivityLogsComponent").then((response: ActivityLogs[]) => {
      this.activityLogs = response;
      this.paginatedReports()
    }).catch(error => {
      if (error.status == 401) {
        // this.router.navigate(['/signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin

      } else {
        console.log(error);
      }
      this.toasterService.show(error, { classname: 'bg-danger text-light' });
    }).finally(() => this.showLoader = false);
  }

  dateFormat(loginDateTime: any) {
    return formatDate(loginDateTime * 1000, 'MM/dd/yyyy h:mm:ss a', 'en')

  }

  get totalPages() {
    return Math.ceil(this.activityLogs.length / this.pageSize);
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.paginatedReports()
  }

  paginatedReports() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.logsToShow = this.activityLogs.slice(start, start + this.pageSize);
  }
}
