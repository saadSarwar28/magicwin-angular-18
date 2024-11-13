import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateRequest } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { DOCUMENT } from '@angular/common';
import {
  FancytimerService,
  MarketTimerService,
  NewsTimerService,
  NextRaceTimerService,
  RemainingTimerService,
  ScoreCardTimerService,
  ScoreTimerService,
  TimerService,
} from '../../services/timer.service';
import { ToastService } from '../../services/toast.service';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UtillsService } from '../../services/utills.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginTermsConditionComponent } from '../reuse/login-terms-condition';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  showLoader: boolean = false;
  showDemoIdBtn: boolean = false;
  visibility: any;
  isb2c: boolean = _window().isb2c;
  isshowforgotpassword: boolean = _window().isshowforgotpassword;
  lsItem: any;
  termsCheck: boolean = false;
  termsChecked: boolean = true;
  passwordIcon: boolean = false;
  siteLogo: string = '';
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  sitename: string = '';
  constructor(
    private backendService: BackendService,
    private storageService: StorageService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private myTimer: TimerService,
    private toasterService: ToastService,
    private fancyTimer: FancytimerService,
    private scoreTimerService: ScoreTimerService,
    private scoreCardTimerService: ScoreCardTimerService,
    private nextRaceTimer: NextRaceTimerService,
    private markettimer: MarketTimerService,
    private newstimer: NewsTimerService,
    private remainingtimer: RemainingTimerService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private gaService: GoogleAnalyticsService,
    private utillsService: UtillsService,
    private checkAuthService: CheckAuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialog
  ) {
    this.siteLogo = _window().siteLogoLoginModal;
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().cdnImagesUrl) {
      this.sitename = _window().sitename;
    }
    let demoUser = _window().demoUsername;
    let demoPass = _window().demoPassword;
    if (demoUser && demoPass) {
      this.showDemoIdBtn = true;
    } else {
      this.showDemoIdBtn = false;
    }
    if (_window().isHideDemoOnApp) {
      this.isHideDemoOnApp = _window().isHideDemoOnApp;
    }
  }

  toFormGroup(elements: any[]) {
    const group: any = {};
    elements.forEach((key) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  otpKeyUpEvent(event: any, index: any) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.otpFormInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  otpFormInput = ['input1', 'input2', 'input3', 'input4'];
  @ViewChildren('otpFormRow') rows: any;
  otpForm!: FormGroup;
  showOtpForm: boolean = false;
  timeRemaining = 60;
  timeRemainingId: any;
  hideLoginForm: any = false;
  noInternet: any = false;
  count: any = 1;
  onlineStatus: boolean = true;

  loginForm!: FormGroup;
  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      terms: [true],
    });
    this.otpForm = this.toFormGroup(this.otpFormInput);
    setTimeout(() => {
      this.loginForm.get('username')?.reset(); // Reset form after a short delay
      this.loginForm.get('password')?.reset(); // Reset form after a short delay
    }, 700);
  }
  closeLoginModal() {
    this.dialogRef.closeAll(); // Close the dialog
    localStorage.removeItem('routeCasino');
  }

  routeToSignup() {
    let isWhatsappLink: boolean = _window().isWhatsappLink ?? false;
    let isShowSignUp: boolean = _window().isShowSignUp ?? true;
    let isb2c: boolean = _window().isb2c;

    if (isb2c && isShowSignUp && !isWhatsappLink) {
      this.router.navigate(['/user/signup']);
    } else if (isWhatsappLink && isShowSignUp) {
      this.utillsService.whatsappForCutomerSupprtOrId('WAB4');
    }
    this.closeLoginModal();
  }

  termsModal() {
    this.dialogRef.open(LoginTermsConditionComponent, {
      width: '500px',
      maxWidth: '95vw',
      height: '70vh',
    });
  }

  isConnected() {
    // if (_window().ping) {
    //   axios
    //     .get(_window().ping)
    //     .then((response: any) => {
    //       if (response && response.data) {
    //         this.noInternet = response.data == 'PONG' ? false : true;
    //         return;
    //       }
    //     })
    //     .catch((error: any) => {
    //       console.log(error);
    //     });
    // }
  }
  createOnline() {
    return merge<any>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
  isLogin: boolean = false;
  isHideDemoOnApp: boolean = false;
  hideDemoButton: boolean = false;
  ngOnInit(): void {
    this.initForm();
    this.createOnline().subscribe((isOnline) => {
      this.onlineStatus = isOnline;
      if (this.onlineStatus) {
        this.isConnected();
      } else {
        this.noInternet = true;
      }
    });
    // this.isConnected();
    this.isLogin = this.checkAuthService.IsLogin();
    if (!this.isLogin && this.isHideDemoOnApp) {
      this.hideDemoButton = this.utillsService.checkUserAgent();
    }
    this.lsItem = this.storageService
      .getItem('theme')
      ?.toString();
    this.storageService.removeItem('token');
    this.storageService.removeItem('stakes');
    this.storageService.removeItem('client');
    this.scoreCardTimerService.clearTimer();
    this.myTimer.clearTimer();
    this.scoreTimerService.clearTimer();
    this.fancyTimer.clearTimer();
    this.nextRaceTimer.clearTimer();
    this.markettimer.clearTimer();
    this.newstimer.clearTimer();
    this.remainingtimer.clearTimer();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  @ViewChild('inpUsername') elementRefInput: ElementRef | undefined;
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.log(event);
  //   this.router.navigate(["sports"]);
  // }
  onclose() {
    localStorage.removeItem('routeCasino');
    // window.location.reload()
  }
  isModalOpen = false;
  openOtpModal() {
    this.isModalOpen = true;
  }

  removeRoute() {
    let route = localStorage.getItem('routeCasino');
    if (route !== null) {
      localStorage.removeItem('routeCasino');
    }
  }
  loginWithDemo() {
    let demoUser = _window().demoUsername;
    let demoPass = _window().demoPassword;
    let fbtoken = localStorage.getItem('fbtoken');
    if (demoUser && demoPass) {
      this.showLoader = true;
      let c: any;
      try {
        this.recaptchaV3Service
          .execute('importantAction')
          .subscribe((token) => {
            this.backendService
              .authenticate(
                new AuthenticateRequest(demoUser, demoPass, token, fbtoken),
                c,
                'LoginComponent'
              )
              .subscribe((resp) => {
                if (resp) {
                  if (resp.code && resp.code != 200) {
                    this.loginForm.setErrors({ Invalid: resp.message });
                    return;
                  } else if (resp && resp.token) {
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
                    this.showLoader = false;
                    this.redirectToRoute();
                  } else {
                    if (resp.Code == 500) {
                      this.toasterService.show(resp.Message, {
                        classname: 'bg-danger text-light',
                        delay: 1500,
                      });
                      sessionStorage.setItem('token', resp.id);
                      this.router.navigate(['/change-password']);
                    } else if (resp.Code == 600) {
                      this.timeRemainingId = setInterval(() => {
                        this.startCountDown();
                      }, 1000);
                      this.showOtpForm = true;
                    } else if (!resp.status) {
                      this.loginForm.controls['username'].setErrors({
                        error: resp.message,
                      });
                    }
                  }
                }
                this.showLoader = false
              }, er => {
                if (er.response && er.response.message) {
                  this.loginForm.setErrors({ Invalid: er.response.message });
                } else {
                  this.loginForm.setErrors({ Invalid: er.response });
                }

              }

              )

          });
      } catch (error) {
        this.showLoader = false;
        console.log(error);
      }
    }
  }

  redirectToRoute() {
    const storedData = localStorage.getItem('routeCasino');
    if (storedData !== null) {
      const parsedObject = JSON.parse(storedData);
      if (parsedObject?.menuItem) {
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  }

  onSubmit() {
    if (this.loginForm.controls['password'].value.includes('”')) {
      this.loginForm.setErrors({ Invalid: 'Password in wrong format' });
      return;
    }
    if (!navigator.onLine) {
      this.toasterService.show('Check you Internet Connection', {
        classname: 'bg-danger text-light',
        delay: 5000,
      });
      return;
    }
    //Autofill Handling
    if (this.loginForm.controls['username'].value === '') {
      if (this.elementRefInput?.nativeElement.value.length > 0) {
        this.loginForm.controls['username'].setValue(
          this.elementRefInput?.nativeElement.value
        );
      }
    }
    try {
      this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
        if (token && token.length > 0) {
          if (this.loginForm.valid) {
            this.showLoader = true;
            let c: any;
            this.loginForm.controls['username'].setValue(
              this.loginForm.controls['username'].value.replaceAll(' ', '')
            );
            this.loginForm.controls['password'].setValue(
              this.loginForm.controls['password'].value.replaceAll(' ', '')
            );
            let fbtoken = localStorage.getItem('fbtoken');
            this.backendService
              .authenticate(
                new AuthenticateRequest(
                  this.loginForm.controls['username'].value,
                  this.loginForm.controls['password'].value,
                  token,
                  fbtoken
                ),
                c,
                'LoginComponent'
              )
              .subscribe((resp) => {
                if (resp) {
                  if (resp.code && resp.code != 200) {
                    this.loginForm.setErrors({ Invalid: resp.message });
                    return;
                  } else if (resp && resp.token) {
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
                    this.showLoader = false;
                    this.redirectToRoute();
                  } else {
                    if (resp.Code == 500) {
                      this.toasterService.show(resp.Message, {
                        classname: 'bg-danger text-light',
                        delay: 1500,
                      });
                      sessionStorage.setItem('token', resp.id);

                      this.utillsService.password =
                        this.loginForm.controls['password'].value;
                      // this.router.navigate(['/change-password']);
                    } else if (resp.Code == 600) {
                      this.timeRemainingId = setInterval(() => {
                        this.startCountDown();
                      }, 1000);
                      this.showOtpForm = true;
                    } else if (!resp.status) {
                      this.loginForm.controls['username'].setErrors({
                        error: resp.message,
                      });
                    }
                  }
                }
                this.showLoader = false
              }, er => {
                if (er.response && er.response.message) {
                  this.loginForm.setErrors({ Invalid: er.response.message });
                } else {
                  this.loginForm.setErrors({ Invalid: er.response });
                }
              }

              )


            // });
          } else {
            this.loginForm.markAllAsTouched();
          }
        } else {
          this.document.location.reload();
        }
      });
    } catch (error) {
      this.showLoader = false;
      console.log(error);
    }
  }

  startCountDown(): any {
    this.timeRemaining -= 1;
    if (this.timeRemaining == 0) {
      if (this.timeRemainingId) {
        clearInterval(this.timeRemainingId);
      }
      this.timeRemaining = 60;
      this.otpForm.reset();
    }
  }

  otpResponse = {
    message: '',
  };
  sendOtp() {
    this.otpResponse.message = '';
    if (this.otpForm.invalid) return;
    const otpValues = Object.values(this.otpForm.controls).map(
      (control) => control.value
    );
    const otp = otpValues.join('');
    this.showLoader = true;
    this.backendService
      .authenticate(
        new AuthenticateRequest(
          this.loginForm.controls['username'].value,
          this.loginForm.controls['password'].value
        ),
        otp,
        'LoginComponent'
      )
      .subscribe((resp) => {
        if (resp) {
          if (resp.code && resp.code != 200) {
            this.otpResponse.message = resp.message;
          } else if (resp && resp.token) {
            this.storageService.setItem('client', resp.userName);
            this.storageService.setItem('token', resp.token);
            localStorage.setItem('showAgreementOnce', 'showAgreementOnce');
            this.showLoader = false;
            this.redirectToRoute();
          } else {
            if (resp.Code == 500) {
              this.otpResponse.message = resp.message;
              this.toasterService.show(resp.Message, {
                classname: 'bg-danger text-light',
                delay: 1500,
              });
              this.clearTimerInterval();
              sessionStorage.setItem('token', resp.id);
              this.router.navigate(['/change-password']);
            } else if (resp.Code == 600) {
              this.timeRemainingId = setInterval(() => {
                this.startCountDown();
              }, 1000);
              this.showOtpForm = true;
            } else if (resp.Code == 700) {
              this.clearTimerInterval();
              this.otpResponse.message = resp.message;
              this.toasterService.show(resp.Message, {
                classname: 'bg-danger text-light',
                delay: 1500,
              });
            } else if (!resp.status) {
              this.clearTimerInterval();
              this.otpResponse.message = resp.message;
              this.toasterService.show(resp.message, {
                classname: 'bg-danger text-light',
                delay: 1500,
              });
            }
          }
        }
        this.showLoader = false

      }, er => {
        if (er.response.message) {
          this.clearTimerInterval();
          this.otpResponse.message = er.response.message;
        }
        this.showLoader = false
      }

      )

  }

  clearTimerInterval() {
    clearInterval(this.timeRemainingId);
  }
}
