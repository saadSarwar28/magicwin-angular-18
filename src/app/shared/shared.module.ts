
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookpositionComponent } from './bookposition/bookposition.component';
import { EventtypeidPipe } from '../pipes/eventtypeid.pipe';
import { FilterBets } from '../pipes/filterbets.pipe';
import { OrderbyrunnerPipe } from '../pipes/orderbyrunner.pipe';
import { ExtractNumberPipe, SafeHTML, SafePipe } from '../pipes/safe.pipe';
import { OrderbyPipe } from '../pipes/orderby.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// import { SignupModalComponent } from './signup-modal/signup-modal.component';

import { DefaultBannerComponent } from '../sports/default-banner/default-banner.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PreloaderComponent } from './preloader/preloader.component';
import { ProductsTabComponent } from './products-tab/products-tab.component';
import { FilterFancyMarketsPipe } from '../pipes/filter-fancy-markets.pipe';
import { ProviderModalComponent } from './provider-modal/provider-modal.component';
import { RoundoffPipe } from '../pipes/roundoff.pipe';
import { MenuitemsComponent } from './menuitems/menuitems.component';
import { ClickOutsideDirective } from '../directives/click-out-side.directive';
import { NewstickerComponent } from './newsticker/newsticker.component';
import {
  LAZYLOAD_IMAGE_HOOKS,
  LazyLoadImageModule,
  ScrollHooks,
} from 'ng-lazyload-image';
import { SortByProviderPipe } from '../pipes/sort-by-provider.pipe';
import { MomentModule } from 'ngx-moment';
import { DaysFormatUpcomingPipe } from '../pipes/days-format-upcoming-pipe';
import { CricketscorecardComponent } from '../sports/cricketscorecard/cricketscorecard.component';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { AbbreviateNumberPipe } from '../pipes/abbreviateNumber.pipe';
import { RecentMarketsComponent } from './recent-markets/recent-markets.component';
import { TruncPipe } from '../pipes/trunc.pipe';
import { ReverseTimePipe } from '../pipes/reverse-time.pipe';
import { RemoveUnderscorePipe } from '../pipes/removeUnderscore.pipe';
import { MarketNamePipe } from '../pipes/marketnameVs.pipe';
import { VirtualCricketComponent } from '../sports/virtual-cricket/virtual-cricket.component';
import { VirtualScorePipe } from '../pipes/virtualScore.pipe';
// import { MatDialogModule } from '@angular/material/dialog';
import { StreamComponent } from './stream.component';
import { SkeltonLoaderComponent } from './skelton-loader/skelton-loader.component';
import { ProviderBannerComponent } from './provider-banner/provider-banner.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    // SidebarComponent,
    // BookpositionComponent,
    // EventtypeidPipe,
    // AbbreviateNumberPipe,
    // ReverseTimePipe,
    // FilterBets,
    // // SignupModalComponent,
    // // CreatepinComponent,
    // FooterComponent,
    // DefaultBannerComponent,
    // PreloaderComponent,
    // ProductsTabComponent,
    // FilterFancyMarketsPipe,
    // ProviderModalComponent,
    // RacetodayscardComponent,
    // MenuitemsComponent,
    // ClickOutsideDirective,
    // NewstickerComponent,
    // SortByProviderPipe,
    // DaysFormatUpcomingPipe,
    // CricketscorecardComponent,
    // GroupByPipe,
    // RecentMarketsComponent,
    // // ChangepinmodalComponent,
    // MarketNamePipe,
    // VirtualScorePipe,
    // StreamComponent,
    // SafeHTML,

    // ProviderBannerComponent,
    // ExtractNumberPipe
  ],
  imports: [

    // CommonModule,
    // RouterModule,
    // TranslateModule,
    // FormsModule,
    // ReactiveFormsModule,
    // CarouselModule,
    // LazyLoadImageModule,
    // MomentModule,
    // MatDialogModule
  ],
  exports: [
    // SidebarComponent,
    // BookpositionComponent,
    // EventtypeidPipe,
    // FilterBets,
    // AbbreviateNumberPipe,
    // ReverseTimePipe,
    // // SignupModalComponent,
    // FooterComponent,
    // DefaultBannerComponent,
    // PreloaderComponent,
    // ProductsTabComponent,
    // FilterFancyMarketsPipe,
    // ProviderModalComponent,
    // RacetodayscardComponent,
    // MenuitemsComponent,
    // NewstickerComponent,
    // SortByProviderPipe,
    // CricketscorecardComponent,
    // DaysFormatUpcomingPipe,
    // GroupByPipe,
    // ClickOutsideDirective,
    // MarketNamePipe,
    // VirtualScorePipe,
    // StreamComponent,
    // SafeHTML,
    // ProviderBannerComponent,
    // ExtractNumberPipe
    // CreatepinComponent,
    // ChangepinmodalComponent,
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
})
export class SharedModule { }
