import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
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
