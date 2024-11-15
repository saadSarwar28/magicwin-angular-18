import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class WalletComponent implements OnInit {
  paymentDetails: any;
  sendingrequest = false;

  constructor(
    private platformService: PlatformService
  ) {

  }

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      this.loadBalance();
    }
  }

  loadBalance() {

  }
}
