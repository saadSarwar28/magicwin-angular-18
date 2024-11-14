import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticateRequest } from '../../models/models';
import { BackendService } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';
import { GenericService } from '../../services/generic.service';
import { ToastService } from '../../services/toast.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha'; // Add this import
import { GoogleAnalyticsService } from '../../services/google-analytics.service'; // Add this import
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login-signup-buttons',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login-signup-buttons.component.html',
  styleUrl: './login-signup-buttons.component.scss',
  providers: [
    ReCaptchaV3Service,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LfaGQQeAAAAAHGQ_EEv9PWEu8pQE_suL2WUSL7h' }
  ]
})
export class LoginSignupButtonsComponent implements OnInit{
  isLogin: boolean = false
  showDemoIdBtn: boolean = false
  isHideDemoOnApp: boolean = false
  hideDemoButton: boolean = false;
  isb2c: boolean = _window().isb2c;
  isWhatsappLink: boolean = _window().isWhatsappLink  ?? false;
  isShowSignUp: boolean = _window().isShowSignUp ?? true;
  demoUser: any
  demoPass: any
  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private storageService: StorageService,
    private backendService: BackendService,
    private gaService: GoogleAnalyticsService,
    private toastService: ToastService,
    private router: Router,
    private checkauthService: CheckAuthService,
    private utillsService: UtillsService,
    private genericService: GenericService,
  ) {
  }
  ngOnInit(): void {
    this.demoUser = _window().demoUsername;
    this.demoPass = _window().demoPassword;
    this.isLogin = this.checkauthService.IsLogin();
    if (!this.isLogin && this.isHideDemoOnApp) {
      this.hideDemoButton = this.utillsService.checkUserAgent();
    }
    if (this.demoUser && this.demoPass) {
      this.showDemoIdBtn = true;
    } else {
      this.showDemoIdBtn = false;
    }
  }



  forWhatsAppSupport() {
    this.utillsService.whatsappForCutomerSupprtOrId('WAB4');
  }


  openLoginModal() {
    this.genericService.openLoginModal()
    if (this.router.url == '/user/signup') {
      this.router.navigate(['/'])
    }
  }


  loginWithDemo() {

    try {
      this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
        if (this.demoUser && this.demoPass) {
          // this.showLoader = true;
          let c;
          this.backendService
            .authenticate(
              new AuthenticateRequest(this.demoUser, this.demoPass, token),
              c,
              'LoginComponent'
            )
            .subscribe((resp) => {
              if (resp) {
                if (resp && resp.token) {
                  this.gaService.eventEmitter(
                    'login',
                    'engagement',
                    'click',
                    'login_success'
                  );
                  this.storageService.setItem(
                    'client',
                    resp.userName
                  );
                  localStorage.setItem(
                    'showAgreementOnce',
                    'showAgreementOnce'
                  );
                  this.storageService.setItem(
                    'token',
                    resp.token
                  );
                  window.location.reload();
                  return;
                } else if (resp.status === false) {
                  this.toastService.show(resp.message, {
                    classname: 'bg-danger text-light',
                    delay: 1500,
                  });
                } else {
                  if (resp.Code == 500) {
                    this.toastService.show(resp.Message, {
                      classname: 'bg-danger text-light',
                      delay: 1500,
                    });
                    sessionStorage.setItem('token', resp.id);
                    this.router.navigate(['/change-password']);
                  }
                }
              }
            })
            // .catch((er) => {
            //   if (er.response && er.response.message) {
            //     this.toastService.show(er.response.messagee, {
            //       classname: 'bg-danger text-light',
            //       delay: 1500,
            //     });
            //   } else {
            //     this.toastService.show(er.response, {
            //       classname: 'bg-danger text-light',
            //       delay: 1500,
            //     });
            //   }
            // });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
