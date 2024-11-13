import { VideoPlayerComponent } from './video-player/video-player.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet/wallet.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookpositionComponent } from './bookposition/bookposition.component';
import { PartialBetslipComponent } from './partial-betslip/partial-betslip.component';
import { EventtypeidPipe } from '../pipes/eventtypeid.pipe';
import { FilterBets } from '../pipes/filterbets.pipe';
import { OrderbyrunnerPipe } from '../pipes/orderbyrunner.pipe';
import { ExtractNumberPipe, SafeHTML, SafePipe } from '../pipes/safe.pipe';
import { ShortennumPipe } from '../pipes/shortennum.pipe';
import { OrderbyPipe } from '../pipes/orderby.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { FooterComponent } from '../sports/footer/footer.component';
import { DefaultBannerComponent } from '../sports/default-banner/default-banner.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PreloaderComponent } from './preloader/preloader.component';
import { ProductsTabComponent } from './products-tab/products-tab.component';
import { FilterFancyMarketsPipe } from '../pipes/filter-fancy-markets.pipe';
import { OddsbuttonComponent } from './reuse/oddsbutton.component';
import { ProviderModalComponent } from './provider-modal/provider-modal.component';
import { NavBottomComponent } from './nav-bottom/nav-bottom.component';
import { RacetodayscardComponent } from '../sports/racetodayscard/racetodayscard.component';
import { RoundoffPipe } from '../pipes/roundoff.pipe';
import { MenuitemsComponent } from './menuitems/menuitems.component';
import { ClickOutsideDirective } from '../directives/click-out-side.directive';
import { NewstickerComponent } from './newsticker/newsticker.component';
import { VideoPlayerComponentTut } from './video-player-tut/video-player-tut.component';
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
import { CashoutBetslipComponent } from './cashout-betslip/cashout-betslip.component';
import { RecentMarketsComponent } from './recent-markets/recent-markets.component';
import { TruncPipe } from '../pipes/trunc.pipe';
import { ReverseTimePipe } from '../pipes/reverse-time.pipe';
import { CreatepinComponent } from './createpin/createpin.component';
import { ChangepinmodalComponent } from './changepinmodal/changepinmodal.component';
import { RemoveUnderscorePipe } from '../pipes/removeUnderscore.pipe';
import { MarketNamePipe } from '../pipes/marketnameVs.pipe';
import { BlogsComponent } from './blogs/blogs.component';
import { ListBlogComponent } from './blogs/list-blog/list-blog.component';
import { TeamsScoreComponent } from './reuse/teams-score.component';
import { MatchStartTimeComponent } from './reuse/matchStartTime.component';
import { NavMenusComponent } from './reuse/nav-menus.component';
import { LoginSignButtonsComponent } from './reuse/login-sigup.-buttons.component';
import { VirtualCricketComponent } from '../sports/virtual-cricket/virtual-cricket.component';
import { VirtualScorePipe } from '../pipes/virtualScore.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { StreamComponent } from './stream.component';
import { DownloadAppModalComponent } from "./show-download-app-modal/download-app-modal.component";
import { SkeltonLoaderComponent } from './skelton-loader/skelton-loader.component';
import { ProviderBannerComponent } from './provider-banner/provider-banner.component';
@NgModule({
  declarations: [
    SidebarComponent,
    BookpositionComponent,
    WalletComponent,
    PartialBetslipComponent,
    EventtypeidPipe,
    OrderbyrunnerPipe,
    SafePipe,
    RemoveUnderscorePipe,
    OrderbyPipe,
    ShortennumPipe,
    AbbreviateNumberPipe,
    ReverseTimePipe,
    FilterBets,
    // SignupModalComponent,
    // CreatepinComponent,
    FooterComponent,
    DefaultBannerComponent,
    VideoPlayerComponent,
    VideoPlayerComponentTut,
    PreloaderComponent,
    ProductsTabComponent,
    FilterFancyMarketsPipe,
    OddsbuttonComponent,
    ProviderModalComponent,
    NavBottomComponent,
    RacetodayscardComponent,
    RoundoffPipe,
    MenuitemsComponent,
    ClickOutsideDirective,
    NewstickerComponent,
    SortByProviderPipe,
    TruncPipe,
    DaysFormatUpcomingPipe,
    CricketscorecardComponent,
    GroupByPipe,
    CashoutBetslipComponent,
    RecentMarketsComponent,
    // ChangepinmodalComponent,
    MarketNamePipe,
    TeamsScoreComponent,
    MatchStartTimeComponent,
    NavMenusComponent,
    LoginSignButtonsComponent,
    VirtualCricketComponent,
    VirtualScorePipe,
    StreamComponent,
    DownloadAppModalComponent,
    SafeHTML,

    ProviderBannerComponent,
    ExtractNumberPipe
  ],
  imports: [
    SkeltonLoaderComponent,
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    LazyLoadImageModule,
    MomentModule,
    MatDialogModule
  ],
  exports: [
    WalletComponent,
    SidebarComponent,
    OrderbyPipe,
    BookpositionComponent,
    PartialBetslipComponent,
    WalletComponent,
    EventtypeidPipe,
    OrderbyrunnerPipe,
    SafePipe,
    RemoveUnderscorePipe,
    ShortennumPipe,
    FilterBets,
    AbbreviateNumberPipe,
    ReverseTimePipe,
    PartialBetslipComponent,
    // SignupModalComponent,
    FooterComponent,
    DefaultBannerComponent,
    VideoPlayerComponent,
    VideoPlayerComponentTut,
    PreloaderComponent,
    ProductsTabComponent,
    FilterFancyMarketsPipe,
    OddsbuttonComponent,
    ProviderModalComponent,
    NavBottomComponent,
    RacetodayscardComponent,
    RoundoffPipe,
    MenuitemsComponent,
    NewstickerComponent,
    SortByProviderPipe,
    TruncPipe,
    CashoutBetslipComponent,
    CricketscorecardComponent,
    DaysFormatUpcomingPipe,
    GroupByPipe,
    ClickOutsideDirective,
    MarketNamePipe,
    TeamsScoreComponent,
    MatchStartTimeComponent,
    NavMenusComponent,
    LoginSignButtonsComponent,
    VirtualCricketComponent,
    VirtualScorePipe,
    StreamComponent,
    SafeHTML,
    ProviderBannerComponent,
    ExtractNumberPipe
    // CreatepinComponent,
    // ChangepinmodalComponent,
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
})
export class SharedModule { }
