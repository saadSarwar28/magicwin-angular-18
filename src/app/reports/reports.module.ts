import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { AccountStatementComponent } from "./accountStatement/accountStatement.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ActivityLogsComponent } from "./activityLogs/activityLogs.component";
import { FancyBetsComponent } from "./fancyBets/fancyBets.component";
import { ResultsComponent } from "./results/results.component";
import { SportsBetsComponent } from "./sportsBets/sportsBets.component";
import { PlStatementComponent } from "./plStatement/plStatement.component";
import { XgBetsComponent } from "./xgBets/xgBets.component";
import { CasinoBetsComponent } from "./casinoBets/casinoBets.component";
import { StakeButtonsComponent } from "./stakeButtons/stakeButtons.component";
import { ChangePasswordComponent } from "./changePassword/changePassword.component";

import { ReportsTopNavComponent } from "./reports-top-nav/reports-top-nav.component";
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WithDrawComponent } from './with-draw/with-draw.component';
import { DirectiveModule } from '../directives/directive.module';
import { ReportsInputComponent } from './reports-input/reports-input.component';
import { ReportsComponent } from './reports.component';
import { CustomPaginationComponent } from "./custom-pagination/custom-pagination.component";


@NgModule({
  declarations: [
    AccountStatementComponent,
    ActivityLogsComponent,
    CasinoBetsComponent,
    FancyBetsComponent,
    PlStatementComponent,
    ResultsComponent,
    ReportsInputComponent,
    SportsBetsComponent,
    StakeButtonsComponent,
    XgBetsComponent,
    ChangePasswordComponent,
    ReportsTopNavComponent,
    WithDrawComponent,
    ReportsComponent,
    CustomPaginationComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ReportsRoutingModule,
    TranslateModule,
    DirectiveModule
  ], providers: [DatePipe]
})
export class ReportsModule {
}
