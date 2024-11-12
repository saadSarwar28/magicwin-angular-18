import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentSportsComponent } from './current-sports/current-sports.component';
import { MysportsComponent } from './mysports.component';
import { RouterModule, Routes } from '@angular/router';
import { FavCasinoComponent } from './fav-casino/fav-casino.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: MysportsComponent }];
@NgModule({
  declarations: [MysportsComponent, CurrentSportsComponent, FavCasinoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MysportsModule {}
