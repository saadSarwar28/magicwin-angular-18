

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateRequest } from '../../models/models';
import { _window, BackendService } from '../../services/backend.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-login-signup-buttons',
  template: `
  <div class="login-component-btns-compo">
  <div class="button-group">
    <ng-container *ngIf="showDemoIdBtn && !hideDemoButton">
    <div class="btn demo-submit fs-lap-15" (click)="loginWithDemo()" ><a>Demo</a> </div>
    </ng-container>
      <div class="login-signup-group" >
      <div class="btn login-submit fs-lap-13"  (click)="openLoginModal()" ><i class="bi bi-box-arrow-in-left sm-fs-15"></i> Login</div>
  <div class="btn signup-submit fs-lap-13" *ngIf="(isb2c && isShowSignUp && !isWhatsappLink)" routerLink="/user/signup"><i class="bi bi-person-plus sm-fs-15"></i> Signup</div>
  <div class="btn signup-submit fs-lap-13" *ngIf="isWhatsappLink && isShowSignUp" (click)="forWhatsAppSupport()"><i class="bi bi-person-plus sm-fs-15"></i> Signup</div>
      </div>
      </div>
</div>
`,
  styles: [
    `
    .login-component-btns-compo {
  .button-group {
    display: flex;
    align-items: center;
    position: relative;
    .btn {
      display: flex;
      border: none;
      padding: 15px 25px;
      cursor: pointer;
      transition: background 0.3s ease, color 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 49.97px;
      flex-direction: column;
      font-weight :var(--demo-login-font-weight);
      .bi {
        font-size: 19px;
        margin-bottom: -6px;
      }
    }
    .demo-submit {
      background: var(--demo-login-bg);
      margin-right: 11px;
      border-radius: 8px;
      border: 3px solid var(--demo-border-clr);
      color: var(--demo-login-clr);
      &:hover {
        background: var(--demo-login-bg);
      }
    }
    .login-submit {
      background: var(--login-btn-bg);
      border-radius: 5px 0px 0px 5px;
      color: var(--loginClr);
      i {
        color: var(--login-btn-icon-clr);
      }
    }
    .signup-submit {
      background: var(--signup-btn-bg);
      border-radius: 0px 3px 3px 0px;
      color: var(--signup-btn-clr);
      i {
        color: var(--signup-btn-icon-clr);
      }
      &:hover {
        background: var(--signup-btn-bg);
      }
    }
    .login-signup-group {
      display: flex;
      border: 2px solid var(--login-signup-group-border-clr);
      border-radius: 8px;
    }
  }


}
@media (min-width: 992px) and (max-width: 1400px) {
  .button-group {
    button {
      padding: 1px 16px !important;
      height: 45.97px !important;
    }
  }
}

@media(max-width:768px){
  .button-group {
      .btn {
        padding: 15px 16px !important;
        font-size: 10px !important;
        height: 33.97px !important;
      }
      .demo-submit {
        margin-right: 7px !important;
      }
    }

}
@media (max-width: 430px) {
    .button-group {
      .btn {
        padding: 10px 7px !important;
        font-size: 13px !important;
        height: 30.97px !important;
      }
      .demo-submit {
        margin-right: 7px !important;
      }
      .demo-submit {
        height: 33.97px !important;
      }
    }
}

  `
  ]
})
export class LoginSignButtonsComponent implements OnInit {
  isLogin: boolean = false
  showDemoIdBtn: boolean = false
  isHideDemoOnApp: boolean = false
  hideDemoButton: boolean = false;
  isb2c: boolean = _window().isb2c;
  isWhatsappLink: boolean = _window().isWhatsappLink ?? false;
  isShowSignUp: boolean = _window().isShowSignUp ?? true;
  demoUser: any
  demoPass: any
  constructor(private recaptchaV3Service: ReCaptchaV3Service,
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
          let c: any;
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
                  this.storageService.secureStorage.setItem(
                    'client',
                    resp.userName
                  );
                  localStorage.setItem(
                    'showAgreementOnce',
                    'showAgreementOnce'
                  );
                  this.storageService.secureStorage.setItem(
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
            }, er => {
              if (er.response && er.response.message) {
                this.toastService.show(er.response.messagee, {
                  classname: 'bg-danger text-light',
                  delay: 1500,
                });
              } else {
                this.toastService.show(er.response, {
                  classname: 'bg-danger text-light',
                  delay: 1500,
                });
              }
            }

            )

        }
      });
    } catch (error) {
      console.log(error);
    }
  }





}


