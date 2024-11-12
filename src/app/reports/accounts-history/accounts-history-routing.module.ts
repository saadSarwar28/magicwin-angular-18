import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { DepositHistoryComponent } from './deposit-history/deposit-history.component';
import { HistoryHomeComponent } from './history-home/history-home.component';
import { WithdrawalHistoryComponent } from './withdrawal-history/withdrawal-history.component';

const routes: Routes = [
  {
    path: '', component: HistoryHomeComponent,
    children: [
      { path: '', redirectTo: 'withdraw-history', pathMatch: "full", canActivate: [AuthguardService] },
      { path: 'withdraw-history', component: WithdrawalHistoryComponent, canActivate: [AuthguardService] },
      { path: 'deposit-history', component: DepositHistoryComponent, pathMatch: "full", canActivate: [AuthguardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsHistoryRoutingModule { }
