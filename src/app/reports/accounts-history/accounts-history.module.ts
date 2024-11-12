import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsHistoryRoutingModule } from './accounts-history-routing.module';
import { HistoryHomeComponent } from './history-home/history-home.component';
import { WithdrawalHistoryComponent } from './withdrawal-history/withdrawal-history.component';
import { DepositHistoryComponent } from './deposit-history/deposit-history.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HistoryHomeComponent,
    WithdrawalHistoryComponent,
    DepositHistoryComponent
  ],
  imports: [
    CommonModule,
    AccountsHistoryRoutingModule,
    TranslateModule
  ]
})
export class AccountsHistoryModule { }
