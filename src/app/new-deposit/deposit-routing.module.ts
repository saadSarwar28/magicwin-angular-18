import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { InstantDepositComponent } from './instant-deposit/instant-deposit.component';
import { AuthguardService } from 'src/app/services/authguard.service';
import { ManualDepositComponent } from './manual-deposit/manual-deposit.component';
import { AutoDepositComponent } from './auto-deposit/auto-deposit.component';

const routes: Routes = [
  {
    path: '',
    component: DepositComponent,
    children: [

      {
        path: 'instant',
        component: InstantDepositComponent,
      },
      {
        path: 'manual',
        component: ManualDepositComponent,
      },
      {
        path: 'auto',
        component: AutoDepositComponent,

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRoutingModule { }
