import { Component, OnInit } from '@angular/core';
import { BackendService, _window } from '../../../services/backend.service';
import { CheckAuthService } from '../../../services/check-auth.service';
import { ToastService } from '../../../services/toast.service';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-withdrawal-history',
  templateUrl: './withdrawal-history.component.html',
  styleUrls: ['./withdrawal-history.component.scss']
})
export class WithdrawalHistoryComponent implements OnInit {

  withDraws: any = [];
  showLoader = false;
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
      this.genericService.openLoginModal();
    } else {
      this.getWithDrawHistory();
    }
  }

  getWithDrawHistory() {
    this.showLoader = true
    this.reportService.GetWithdrawRequests().subscribe((data => {
      if (data) {
        this.withDraws = data;
      }
      this.showLoader = false
    }))
  }

}
