import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralContentRoutingModule } from './general-content-routing.module';
import { TermsAndCondiitonsComponent } from './terms-and-condiitons/terms-and-condiitons.component';
import { ContactComponent } from './contact/contact.component';
// import { PromotionsAndBonusComponent } from './promotions-and-bonus/promotions-and-bonus.component';
// import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { FaqComponent } from './faq/faq.component';
import { TranslateModule } from '@ngx-translate/core';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';
import { SharedModule } from '../shared/shared.module';
import { RuleComponent } from './rule/rule.component';
// import { GeneralHeaderComponent } from './general-header/general-header.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { SharedModule } from '../shared/shared.module';
// import { OnlineChatComponent } from './online-chat/online-chat.component';

@NgModule({
  declarations: [
    TermsAndCondiitonsComponent,
    ContactComponent,
    // PromotionsAndBonusComponent,
    // PaymentMethodsComponent,
    FaqComponent,
    TutorialPageComponent,
    // GeneralHeaderComponent,
    // OnlineChatComponent,
    RuleComponent,
  ],
  imports: [
    CommonModule,
    GeneralContentRoutingModule,
    TranslateModule,
    SharedModule,
  ],
})
export class GeneralContentModule {}
