import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  BackendService,
  SignUpB2CModel,
  _window,
} from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
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
import { AuthenticateRequest } from '../../models/models';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { usernameAvailabilityValidator } from '../../validators/username-validator';
import { phoneAvailabilityValidator } from '../../validators/phone-number-validator';
import { passwordMatchValidator } from '../../validators/passwordMatchValidator';
import { GenericService } from '../../services/generic.service';
import { SignupTermsConditionComponent } from '../../shared/reuse/signup-terms-condition';
import { MatDialog } from '@angular/material/dialog';
import { UtillsService } from '../../services/utills.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {
  counterInterval: any;
  toasterMessage: any;
  showOtpForm: any = false;
  noInternet: any = false;
  onlineStatus: any = true;
  whatsappText: any = 'Hello, I need an ID of kheloyar.net';
  reff: any;
  whatsAppPhoneNumber: any;
  siteLogo: string = '';
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  otpFormInput = ['input1', 'input2', 'input3', 'input4'];
  @ViewChildren('otpFormRow') rows: any;
  otpForm: FormGroup;
  timeRemaining = 60;
  showLoader = false;
  sitename: string = "";
  injectHotjar: any = {
    show: false,
    key: 0,
  };
  isShowWhatsappSignupPage: boolean = false;

  specificCountry: string = 'in';
  constructor(
    private backendService: BackendService,
    private storageService: StorageService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private renderer2: Renderer2,
    private myTimer: TimerService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toasterService: ToastService,
    private fancyTimer: FancytimerService,
    private scoreTimerService: ScoreTimerService,
    private scoreCardTimerService: ScoreCardTimerService,
    private nextRaceTimer: NextRaceTimerService,
    private markettimer: MarketTimerService,
    private newstimer: NewsTimerService,
    private remainingtimer: RemainingTimerService,
    private titleService: Title,
    private translate: TranslateService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private genericService: GenericService,
    private utilsService: UtillsService

  ) {
    this.siteLogo = _window().siteLogo;
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    if (_window().isshowwhatsappsignuppage) {
      this.isShowWhatsappSignupPage = _window().isshowwhatsappsignuppage;
    }

    if (_window().specificCountryCode) {
      this.specificCountry = _window().specificCountryCode;
    }


    if (_window().injectHotjar) {
      this.injectHotjar = _window().injectHotjar;
      this.injectHotjar = { ..._window().injectHotjar };
    }
    this.reff = localStorage.getItem('Referer');
    this.otpForm = this.toFormGroup(this.otpFormInput);
    if (_window().sendSignupToWhatsapp) {
      this.router.navigate(['/']);
    }
  }
  forWhatsapp() {
    this.utilsService.whatsappForCutomerSupprtOrId("WAB4")
  }
  ngOnDestroy() {
    this.removeRecaptchaBadge();
  }

  @HostListener('window:beforeunload')
  removeRecaptchaBadge() {
    const element = document.getElementsByClassName('grecaptcha-badge')[0];
    if (element) {
      this.renderer2.removeChild(this.document.body, element.parentElement);
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

  isConnected() {
    // if (_window().ping) {
    //   axios
    //     .get(_window().ping)
    //     .then((response) => {
    //       if (response && response.data) {
    //         this.noInternet = response.data == 'PONG' ? false : true;
    //         return;
    //       }
    //     })
    //     .catch((error) => {
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


  removeSpacesInput(control: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleanValue = input.value.replace(/\s+/g, ''); // Remove all spaces
    this.signupForm.get(control)?.setValue(cleanValue, { emitEvent: true }); // Update the form control value
  }


  signupForm!: FormGroup;
  ngOnInit(): void {
    this.initForm()
    if (_window().beforeLoginWAtext) {
      this.whatsappText = _window().beforeLoginWAtext;
    }
    this.createOnline().subscribe((isOnline) => {
      this.onlineStatus = isOnline;
      if (this.onlineStatus) {
        this.isConnected();
      } else {
        this.noInternet = true;
      }
    });
    this.storageService.secureStorage.removeItem('token');
    this.storageService.secureStorage.removeItem('stakes');
    this.storageService.secureStorage.removeItem('client');
    this.scoreCardTimerService.clearTimer();
    this.myTimer.clearTimer();
    this.scoreTimerService.clearTimer();
    this.fancyTimer.clearTimer();
    this.nextRaceTimer.clearTimer();
    this.markettimer.clearTimer();
    this.newstimer.clearTimer();
    this.remainingtimer.clearTimer();
  }

  initForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)], [usernameAvailabilityValidator(this.backendService, this.recaptchaV3Service)]],
      phoneNumber: ['', [Validators.required], [phoneAvailabilityValidator(this.backendService, this.recaptchaV3Service)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      fullName: [''],
      email: [''],
      confirmPassword: ['', Validators.required],
      dob: [''],
      ageCheck: [true, Validators.requiredTrue],
      termsCheck: [true, Validators.requiredTrue],
      OTP: ["3366"],
      countryCode: ["IN"]
    }, {
      validators: passwordMatchValidator // Apply the custom validator here
    })

    setTimeout(() => {
      this.signupForm.get('username')?.reset()  // Reset form after a short delay
      this.signupForm.get('password')?.reset()  // Reset form after a short delay
      this.signupForm.get('confirmPassword')?.reset()  // Reset form after a short delay
    }, 700);
  }
  showModal: boolean = false
  closeModalSignup() {
    this.showModal = !this.showModal;
  }


  get username() {
    return this.signupForm.get('username');
  }
  get fullName() {
    return this.signupForm.get('fullName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get ageCheck() {
    return this.signupForm.get('ageCheck');
  }
  get termsCheck() {
    return this.signupForm.get('termsCheck');
  }
  get OTP() {
    return this.signupForm.get('OTP');
  }
  get countryCode() {
    return this.signupForm.get('countryCode');
  }


  otpResponse = {
    message: "",
  }

  showOtpPopup() {
    if (this.phoneNumber?.errors || this.username?.errors) {
      return
    }

    this.showLoader = true;

    if (this.signupForm.controls['OTP'].hasError('otpRequired')) {
      let CheckRequestOTP: any;
      try {
        this.recaptchaV3Service
          .execute('importantAction')
          .subscribe((recaptcha) => {
            CheckRequestOTP = {
              countryCode: this.countryCode?.value,
              recaptcha,
              PhoneOrEmail: this.phoneNumber?.value,
              IsPhone: true,
            };
            this.backendService
              .RequestOTP('PHONE', CheckRequestOTP)
              .subscribe(
                {
                  next: (response) => {
                    this.showLoader = false;
                    if (response.status) {
                      this.startTimer();
                      this.toasterService.show('Check your Inbox for OTP',
                        { classname: 'bg-success text-light', delay: 3000 }
                      );
                      this.showOtpForm = true;
                    }
                  },
                  error: (error) => this.showLoader = false,
                })
          });
      } catch (error) {
        this.showLoader = false;
        console.log(error);
      }
    } else {
      this.onSubmit();
    }
  }

  ngAfterViewInit(): void {
    if (this.injectHotjar.show) {
      this.injectScript(
        window,
        document,
        'https://static.hotjar.com/c/hotjar-',
        '.js?sv='
      );
    }
  }

  injectScript(h: any, o: any, t: any, j: any, a?: any, r?: any) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: this.injectHotjar.key, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];

    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  }



  passwordShow = {
    passwordIcon: true,
    confPasswordIcon: true,
  }

  async onSubmit() {
    this.showLoader = true
    const otpValues = Object.values(this.otpForm.controls).map(control => control.value);
    const otp = otpValues.join('');
    let affiliationValues: any | undefined;
    if (
      localStorage.hasOwnProperty('affiliationRoute') &&
      typeof localStorage.hasOwnProperty('affiliationRoute') != undefined
    ) {
      affiliationValues = localStorage?.getItem('affiliationRoute');
      affiliationValues = JSON.parse(affiliationValues);
    }

    var d = new Date();
    var pastYear = d.getFullYear() - 18;
    d.setFullYear(pastYear);
    this.signupForm.controls['dob'].setValue(d);
    let SignupOTPModal = new SignUpB2CModel(
      otp,
      this.countryCode?.value,
      this.username?.value,
      this.username?.value,
      this.password?.value,
      this.phoneNumber?.value,
      this.email?.value,
      this.signupForm.controls['dob'].value,
      '',
      null,
      null,
      null,
      null
    );

    if (affiliationValues && affiliationValues.length > 0) {
      SignupOTPModal.option1 =
        affiliationValues[0] !== '' ? affiliationValues[0] : null;
      SignupOTPModal.option2 =
        affiliationValues[1] !== '' ? affiliationValues[1] : null;
      SignupOTPModal.option3 =
        affiliationValues[2] !== '' ? affiliationValues[2] : null;
      SignupOTPModal.option4 = this.reff !== '' ? this.reff : 'SearchBar';
    } else {
      SignupOTPModal.option1 = this.reff !== '' ? this.reff : 'SearchBar';
      SignupOTPModal.option2 = '';
      SignupOTPModal.option3 = '';
    }
    try {
      this.recaptchaV3Service
        .execute('importantAction')
        .subscribe((token) => {
          SignupOTPModal.recaptcha = token;
          this.backendService.SignupRequest(SignupOTPModal).subscribe((resp) => {
            if (resp.status) {
              this.toasterService.show(resp?.message, {
                classname: 'bg-success text-light',
                delay: 1500,
              });
              this.signinMethod();
            } else {
              this.showLoader = false;
              this.toasterService.show(resp?.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          });
        });
    } catch (error) {
      this.showLoader = false;
      console.log(error);
    }

  }

  openTermsModal() {
    this.dialogRef.open(SignupTermsConditionComponent, {
      width: '700px',
      height: '700px',
      maxWidth: '90vw'
    });
  }



  loginModal() {
    this.genericService.openLoginModal();
    this.router.navigate(['/'])
  }
  signinMethod() {
    let c: any;
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.backendService
        .authenticate(
          new AuthenticateRequest(
            this.username?.value,
            this.password?.value,
            token
          ),
          c,
          'LoginComponent'
        )
        .subscribe((resp) => {
          if (resp) {
            this.showLoader = false;
            if (resp.code && resp.code != 200) {
              const translatedResponse = this.toasterTranslationMethod(
                resp.Message
              );
              this.toasterService.show(translatedResponse, {
                classname: 'bg-danger text-light',
                delay: 1500,
              });
            } else if (resp && resp.token) {
              this.storageService.secureStorage.setItem(
                'client',
                resp.userName
              );
              localStorage.setItem('showAgreementOnce', 'showAgreementOnce');
              this.storageService.secureStorage.setItem('token', resp.token);
              this.router.navigate(['home']).then(() => {
                window.location.reload();
              });
            } else {
              if (resp.Code == 500) {
                const translatedResponse = this.toasterTranslationMethod(
                  resp.Message
                );
                this.toasterService.show(translatedResponse, {
                  classname: 'bg-danger text-light',
                  delay: 1500,
                });
                sessionStorage.setItem('token', resp.id);
                this.router.navigate(['/change-password']);
              } else if (resp.Code == 600) {
                const translatedResponse = this.toasterTranslationMethod(
                  resp.Message
                );
                this.toasterService.show(translatedResponse, {
                  classname: 'bg-danger text-light',
                  delay: 1500,
                });
                setInterval(() => {
                  this.startTimer();
                }, 1000);
                this.showOtpForm = true;
              } else if (!resp.status) {
                const translatedResponse = this.toasterTranslationMethod(
                  resp.Message
                );
                this.toasterService.show(translatedResponse, {
                  classname: 'bg-danger text-light',
                  delay: 1500,
                });
              }
            }
          }
          this.showLoader = false
        })


    });
  }
  startCountDown(): any {
    this.timeRemaining -= 1;
    if (this.timeRemaining == 0) {
      clearInterval(this.counterInterval);
      this.timeRemaining = 60;
      this.otpForm.reset();
    }
  }

  timer: any;
  timerInterval: any;
  startTimer() {
    this.timer = 60;
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
  resendOtp() {
    if (this.phoneNumber?.value && this.countryCode?.value) {
      let CheckUserNameModel: any;
      try {
        this.recaptchaV3Service
          .execute('importantAction')
          .subscribe((token) => {
            CheckUserNameModel = {
              countryCode: this.countryCode?.value,
              recaptcha: token,
              username: this.phoneNumber?.value,
            };

            this.backendService
              .CheckUserNameAndPhone('PHONE', CheckUserNameModel)
              .subscribe((response) => {
                if (response.status) {
                  this.startTimer();
                  if (response.otpRequired) {
                    this.toasterService.show(
                      response.message || 'Check your Inbox for OTP',
                      { classname: 'bg-success text-light', delay: 3000 }
                    );
                  }
                }
              })

          });
      } catch (error) {
        this.showLoader = false;
        console.log(error);
      }
    }
  }



  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    if (resp.substring('</br>')) {
      resp = resp.replace(' </br>', '');
    }
    resp = resp.split(/(\d+)/);
    if (resp.length) {
      for (let i = 0; i < resp.length; i++) {
        if (isNaN(resp[i])) {
          this.translate.get(resp[i]).subscribe((res: string) => {
            this.toasterMessage = this.toasterMessage + res;
          });
        } else {
          this.toasterMessage = this.toasterMessage + resp[i];
        }
      }
    } else {
      this.translate.get(resp).subscribe((res: string) => {
        this.toasterMessage = res;
      });
    }
    return this.toasterMessage;
  }

  methodForCountryCode(event: any) {
    // this.signupForm.controls['countryCode'].setValue(event.iso2.toUpperCase())
  }

}


