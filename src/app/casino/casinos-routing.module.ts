import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from "./providers/providers.component";
import { CasinoTwentyFourSevenComponent } from "./casino-twenty-four-seven/casino-twenty-four-seven.component";
import { CasinoComponent } from "./casino.component";
import {NotfoundComponent} from "../sports/notfound/notfound.component";
import {CasinoGamesComponent} from "./casino-games/casino-games.component";

const routes: Routes = [
  {
    path: '',
    component: CasinoTwentyFourSevenComponent,
  },
  {
    path: 'providers',
    component: ProvidersComponent
  },
  {
    path: 'casino-games/:id',
    component: CasinoGamesComponent
  },
  {
    path: ':id',
    component: CasinoTwentyFourSevenComponent
  },
  {
    path: 'catagory/:id',
    component: CasinoTwentyFourSevenComponent,
  },
  {
    path: 'detail/:providercode/:gameid',
    component: CasinoComponent
  },
  {
    path: 'get/:id',
    component: CasinoTwentyFourSevenComponent,
  },
  {
    path: 'providers/:id',
    component: CasinoGamesComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasinosRoutingModule {
}
