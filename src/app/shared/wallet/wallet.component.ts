import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor() {

  }

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance() {

  }
}
