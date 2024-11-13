import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { InstantDepositComponent } from './instant-deposit/instant-deposit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ManualDepositComponent } from './manual-deposit/manual-deposit.component';
import { AutoDepositComponent } from './auto-deposit/auto-deposit.component';
import { DirectiveModule } from '../directives/directive.module';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    DepositComponent,
    InstantDepositComponent,
    ManualDepositComponent,
    AutoDepositComponent,
  ],
  imports: [
    CommonModule,
    DepositRoutingModule,
    ReactiveFormsModule,
    TranslateModule,

    DirectiveModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DepositModule { }
