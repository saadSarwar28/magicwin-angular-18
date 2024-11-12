import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupGuard } from '../services/signup.gaurd';
import { IsB2CGuard } from '../services/isB2c.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent, canActivate: [SignupGuard, IsB2CGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
