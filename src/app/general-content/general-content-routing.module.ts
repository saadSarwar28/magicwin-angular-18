import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
// import { GeneralHeaderComponent } from './general-header/general-header.component';
// import { OnlineChatComponent } from './online-chat/online-chat.component';
// import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
// import { PromotionsAndBonusComponent } from './promotions-and-bonus/promotions-and-bonus.component';
import { TermsAndCondiitonsComponent } from './terms-and-condiitons/terms-and-condiitons.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';
import { RuleComponent } from './rule/rule.component';
// import { VideoModalComponent } from './video-modal/video-modal.component';

const routes: Routes = [
  // {
  // path: '', component: GeneralHeaderComponent, children: [
  { path: 'terms-conditions/:id', component: TermsAndCondiitonsComponent },
  // { path: 'responsible-gambling', component: TermsAndCondiitonsComponent },
  // { path: 'promotions', component: PromotionsAndBonusComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'about-us', component: ContactComponent },
  // { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'faq', component: FaqComponent },
  // { path: 'chat', component: OnlineChatComponent },
  // { path: 'video-modal', component: VideoModalComponent }
  // ]
  // }
  { path: 'tutorial', component: TutorialPageComponent },
  { path: 'rule', component: RuleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralContentRoutingModule { }
