import { Component, OnInit } from '@angular/core';
import { BackendService, _window } from '../../../services/backend.service';
import { CheckAuthService } from '../../../services/check-auth.service';
// import { ToastService } from '../../services/toast.service';
// import * as M from "materialize-css";
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.scss']
})
export class DepositHistoryComponent implements OnInit {

  depositRequests: any = [];
  showLoader = false
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  siteLoader: string = ''
  constructor(private checkauthservice: CheckAuthService,
    private reportService: BackendService,
    private genericService: GenericService
  ) { }

  ngOnInit(): void {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (!this.checkauthservice.IsLogin()) {
      // this.router.navigate(['signin']);
      this.genericService.openLoginModal();
    } else {
      this.showLoader = true
      this.reportService.ManualPaymentHistory().subscribe((data => {
        if (data) {
          this.depositRequests = data;
          this.showLoader = false
        }
      }))
    }
  }

}
