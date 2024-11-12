

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountStatementComponent } from './accountStatement/accountStatement.component';
import { ActivityLogsComponent } from './activityLogs/activityLogs.component';
import { CasinoBetsComponent } from './casinoBets/casinoBets.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { FancyBetsComponent } from './fancyBets/fancyBets.component';
import { PlStatementComponent } from './plStatement/plStatement.component';
import { SportsBetsComponent } from './sportsBets/sportsBets.component';
import { XgBetsComponent } from './xgBets/xgBets.component';
import { StakeButtonsComponent } from './stakeButtons/stakeButtons.component';
import { ResultsComponent } from './results/results.component';
import { AuthguardService } from '../services/authguard.service';
import { WithDrawComponent } from './with-draw/with-draw.component';
import { IsB2CGuard } from '../services/isB2c.guard';
import { ReportsComponent } from './reports.component';
const routes: Routes = [
  {
    path: '', component: ReportsComponent, children:
      [
        { path: 'accountstatement', component: AccountStatementComponent, canActivate: [AuthguardService] },
        { path: 'activitylogs', component: ActivityLogsComponent, canActivate: [AuthguardService] },
        { path: 'casinobets', component: CasinoBetsComponent, canActivate: [AuthguardService] },
        { path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthguardService] },
        { path: 'fancybets', component: FancyBetsComponent, canActivate: [AuthguardService] },
        { path: 'plstatement', component: PlStatementComponent, canActivate: [AuthguardService] },
        { path: 'sportsbets', component: SportsBetsComponent, canActivate: [AuthguardService] },
        { path: 'stakebuttons', component: StakeButtonsComponent, canActivate: [AuthguardService] },
        { path: 'xgbets', component: XgBetsComponent, canActivate: [AuthguardService] },
        { path: 'results', component: ResultsComponent, canActivate: [AuthguardService] },
        {
          path: 'history',
          loadChildren: () => import('./accounts-history/accounts-history.module').then(m => m.AccountsHistoryModule),
          canActivate: [AuthguardService, IsB2CGuard]
        },
        { path: 'withdraw', component: WithDrawComponent, canActivate: [AuthguardService, IsB2CGuard] },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
