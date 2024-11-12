import { SportsModule } from './../sports/sports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { SignupComponent } from './signup/signup.component';
import { DirectiveModule } from '../directives/directive.module';

@NgModule({
  declarations: [

    ForgotPasswordComponent,
    SignupComponent,
  ],
  imports: [
    NgxMatIntlTelInputComponent,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    TranslateModule,
    SportsModule,
    DirectiveModule
  ],

})
export class UserModule { }
