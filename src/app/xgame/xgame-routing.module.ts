import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../services/authguard.service';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { XGameDetailComponent } from './x-game-detail/xgame-detail.component';

const routes: Routes = [
  {
    path: '', component: GamesComponent, children:
      [
        { path: '', component: HomeComponent, canActivate: [AuthguardService] },
        { path: 'xgame/detail/:id', component: XGameDetailComponent, canActivate: [AuthguardService] },
        // {path: '**', component: NotfoundComponent,canActivate:[AuthguardService]}
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XgameRoutingModule {
}
