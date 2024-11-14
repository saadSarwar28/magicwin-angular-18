import { Injectable } from "@angular/core";
import { CheckAuthService } from "./check-auth.service";
import { WalletTimerService } from "./timer.service";
import { _window, BackendService } from "./backend.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  walletDetail: any = new BehaviorSubject(null);

  constructor(
    private checkauthservice: CheckAuthService,
    private walletTimerService: WalletTimerService,
    private bettingservice: BackendService,
    private storageService: StorageService,

  ) {

  }

  loadBalance() {
    if (this.checkauthservice.IsLogin()) {
      this.bettingservice
        .GetWallet('WalletComponent')
        .subscribe(
          {
            next: (resp) => {
              this.walletDetail.next(resp)
            },
            error: (err) => {
              if (err.status == 401) {
                // window.location.href = window.location.origin;
                this.storageService.removeItem('token');
                this.storageService.removeItem('client');
                this.storageService.removeItem('iframeLoggedin')
                localStorage.removeItem('showAgreementOnce');
                localStorage.removeItem('routeCasino');

              } else {
                console.error(JSON.stringify(err));
              }
            }
          }
        )

    }
  }
  walletTimer: any = 1000;
  startWalletTimer() {
    if (_window().walletTimer) {
      this.walletTimer = _window().walletTimer;
    }
    this.walletTimerService.SetTimer(
      setInterval(() => this.loadBalance(), this.walletTimer)
    );
  }

  stopWalletTimer() {
    this.walletTimerService.clearTimer()
  }

}
