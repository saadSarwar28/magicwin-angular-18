import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasinosRoutingModule } from './casinos-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { ProvidersComponent } from "./providers/providers.component";
import { CasinoFiltersComponent } from "./casino-filters/casino-filters.component";
import { SharedModule } from "../shared/shared.module";
import { CasinoComponent } from "./casino.component";
import { CasinoTwentyFourSevenComponent } from "./casino-twenty-four-seven/casino-twenty-four-seven.component";
import { CustomMessageModalComponent } from "./custom-message-modal/custom-message-modal.component";
import { CasinoGamesComponent } from "./casino-games/casino-games.component";
// import { GamesByCatagoryComponent } from "./games-by-catagory/games-by-catagory.component";
import { CasinoFilterMenusComponent } from "./casino-filter-menus/casino-filter-menus.component";
import { CasinoSearchComponent } from "./casino-search/casino-search.component";
import { GamePopupComponent } from "../game-popup/game-popup.component";
// import { IndianCasinoComponent } from "./indian-casino/indian-casino.component";
import { CasinoPopularComponent } from "./casino-popular/casino-popular.component";
import { CasinoBannersComponent } from "./casino-banners/casino-banners.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
// import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";
import { FormsModule } from "@angular/forms";
import { CasinoSearchMobileModalComponent } from './casino-search-mobile-modal/casino-search-mobile-modal.component';


@NgModule({
  declarations: [
    CasinoComponent,
    CasinoTwentyFourSevenComponent,
    CasinoGamesComponent,
    ProvidersComponent,
    CustomMessageModalComponent,
    CasinoFiltersComponent,
    // GamesByCatagoryComponent,
    CasinoFilterMenusComponent,
    CasinoSearchComponent,
    GamePopupComponent,
    // IndianCasinoComponent,
    CasinoPopularComponent,
    CasinoBannersComponent,
    CasinoSearchMobileModalComponent,
  ],
  imports: [
    CommonModule,
    // SharedModule,
    CasinosRoutingModule,
    TranslateModule,
    LazyLoadImageModule,
    // NgxMatIntlTelInputModule,
    CarouselModule,
    FormsModule,
  ],
  exports: [
    CasinoFiltersComponent
  ]
})
export class CasinosModule { }
