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
        .GetWallet()
        .subscribe((resp) => {
          this.walletDetail.next(resp)
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
