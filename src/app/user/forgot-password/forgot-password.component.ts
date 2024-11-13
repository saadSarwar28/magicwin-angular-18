import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService, _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { FancytimerService, MarketTimerService, NewsTimerService, NextRaceTimerService, RemainingTimerService, ScoreCardTimerService, ScoreTimerService, TimerService } from '../../services/timer.service';
import { ToastService } from '../../services/toast.service';
import { AuthenticateRequest, } from '../../models/models';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { TranslateService } from '@ngx-translate/core';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  stakeButtonsObject = {
    stakeVal1: 1,
    stakeVal2: 1,
    stakeVal3: 1,
    stakeVal4: 1,
    stakeVal5: 1,
    stakeVal6: 1,
    stakeVal7: 1,
    stakeVal8: 1,
    stakeVal9: 1,
    stakeVal10: 1,
    maxStake: 1,
    minStake: 1,
  }
  counterInterval: any;
  otpRequestResponse: any;
  lsItem: any;
  toasterMessage: any;
  siteLogo: string = ''

  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  specificCountry: string = 'in';

  constructor(private signService: BackendService, private translate: TranslateService, private router: Router, @Inject(DOCUMENT) private document: Document,
    private recaptchaV3Service: ReCaptchaV3Service,
    private myTimer: TimerService,
    private scoreTimerService: ScoreTimerService,
    private scoreCardTimerService: ScoreCardTimerService,
    private nextRaceTimer: NextRaceTimerService,
    private markettimer: MarketTimerService,
    private newstimer: NewsTimerService,
    private remainingtimer: RemainingTimerService,
    private fancyTimer: FancytimerService,
    private renderer2: Renderer2,
    private genericService: GenericService,
    private storageService: StorageService, private toasterService: ToastService) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().specificCountryCode) {
      this.specificCountry = _window().specificCountryCode;
    }
    this.siteLogo = _window().siteLogo;
    this.otpForm = this.toFormGroup(this.otpFormInput);
  }
  toFormGroup(elements: any[]) {
    const group: any = {};
    elements.forEach(key => {
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
  requestIdForgotPassword: any = ''
  otpForm: FormGroup;
  showOtpForm = false;
  signUpScreen: any = [true, false];
  timeRemaining = 60;
  hideLoginForm: any = false;
  separateDialCode = true;
  enterPhoneNumberScreen: any = true;
  phoneNumberFromBackEnd: any;
  showOtpError: any = false
  otpError: any = 'Please enter your otp'
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });
  newPassword: boolean = false;
  confPassword: boolean = false
  showLoader = false;
  showLengthError = false;
  passwordStrength: any = Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');

  public signupForm = new FormGroup({
    fullName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])),
    username: new FormControl('', { validators: Validators.compose([Validators.required,]), updateOn: 'blur' }),
    password: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(8)]) }),
    confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
  });

  ngOnInit(): void {
    this.lsItem = 'darker_theme'
    this.renderer2.addClass(this.document.body, 'light-theme');
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

  onPasswordChange() {

    if (this.password?.value && this.confirmPassword?.value) {
      if (this.password.value === this.confirmPassword.value) {
        this.confirmPassword.setErrors(null);

      } else {
        this.confirmPassword.setErrors({ mismatch: true });
      }
    }
  }

  showLengthErrorMethod(event: any) {
    this.showLengthError = false;
    if (event.target.value.length > 3) {
      this.showLengthError = true
    }
  }


  signinMethod() {
    let c: any
    this.signService.authenticate(new AuthenticateRequest(String(this.signupForm.controls['username'].value), String(this.signupForm.controls['password'].value)), c, "LoginComponent")
      .subscribe(
        {

          next: (resp) => {
            if (resp) {
              if (resp.code && resp.code != 200) {
                const translatedResponse = this.toasterTranslationMethod(resp.message);
                this.signupForm.setErrors({ 'Invalid': translatedResponse });
                return;
              }
              else if (resp && resp.token) {
                this.storageService.secureStorage.setItem('client', resp.userName)
                this.storageService.secureStorage.setItem('token', resp.token)
                localStorage.setItem('showAgreementOnce', 'showAgreementOnce');
                this.showLoader = false;
                this.router.navigate(['sports']).then(() => {
                  window.location.reload();
                });
                return
              }
              else {
                if (resp.Code == 500) {
                  this.toasterService.show(resp.Message, { classname: 'bg-danger text-light', delay: 1500 });
                  sessionStorage.setItem("token", resp.id);
                  this.router.navigate(['/change-password']);
                } else if (resp.Code == 600) {
                  this.hideLoginForm = true;
                  setInterval(() => {
                    this.startCountDown();
                  }, 1000);
                  this.showOtpForm = true;
                }
                else if (!resp.status) {
                  const translatedResponse = this.toasterTranslationMethod(resp.message);
                  this.signupForm.controls['username'].setErrors({ 'error': translatedResponse });
                }
              }
            }
            this.showLoader = false
          },
          error: (er) => {
            this.showLoader = false
            if (er.response.message) {
              const translatedResponse = this.toasterTranslationMethod(er.response.message);
              this.signupForm.setErrors({ 'Invalid': translatedResponse });
            }
          },
        }
      )
  }

  private mapStackButtons(stakes: any) {
    this.stakeButtonsObject.stakeVal1 = stakes.Stake1;
    this.stakeButtonsObject.stakeVal2 = stakes.Stake2;
    this.stakeButtonsObject.stakeVal3 = stakes.Stake3;
    this.stakeButtonsObject.stakeVal4 = stakes.Stake4;
    this.stakeButtonsObject.stakeVal5 = stakes.Stake5;
    this.stakeButtonsObject.stakeVal6 = stakes.Stake6;
    this.stakeButtonsObject.stakeVal7 = stakes.Stake7;
    this.stakeButtonsObject.stakeVal8 = stakes.Stake8;
    this.stakeButtonsObject.minStake = stakes.minStake;
    this.stakeButtonsObject.maxStake = stakes.maxStake;
    this.storageService.secureStorage.setItem('stakes', JSON.stringify(stakes))
  }


  startCountDown(): any {
    this.timeRemaining -= 1;
    if (this.timeRemaining == 0) {
      this.signUpScreen = [true, false];
      window.clearInterval(this.counterInterval);
      this.timeRemaining = 60;
      this.otpForm.reset();
    }
  }
  ngOnDestroy(): void {
    const element = document.getElementsByClassName('grecaptcha-badge')[0];
    if (element) {
      this.renderer2.removeChild(this.document.body, element.parentElement);
    }
    if (this.counterInterval) {
      window.clearInterval(this.counterInterval)
    }
  }

  checkUserName() {
    this.requestIdForgotPassword = null
    if (this.signupForm.controls?.username.errors) {
      const control = this.signupForm.get('username');
      control?.markAsTouched({ onlySelf: true });
      return
    }
    let ClientGetPhoneNumber: any;
    ClientGetPhoneNumber = {
      username: this.signupForm.controls?.username?.value
    }
    try {
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token) => {
          ClientGetPhoneNumber.recaptcha = token;
          this.signService.Getphonenumber(ClientGetPhoneNumber).subscribe(resp => {
            if (resp?.status == false) {
              this.signupForm.controls['username'].setErrors({ 'error': resp.message });
            }
            else {
              this.enterPhoneNumberScreen = true;
              this.requestIdForgotPassword = resp?.requestId;
              this.phoneNumberFromBackEnd = resp?.message
            }
          })
        });
    } catch (error) {
      this.showLoader = false;
      console.log(error)
    }
  }
  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  checkUserPhone() {
    this.requestIdForgotPassword = this.getUUID()
    if (this.signupForm.controls.phoneNumber.errors?.['required']) {
      const translatedResponse = this.toasterTranslationMethod("Phone Number is required");
      this.signupForm.controls['phoneNumber'].setErrors({ 'error': translatedResponse });
      return
    }
    if (this.signupForm.controls.phoneNumber.errors?.['validatePhoneNumber']) {
      const translatedResponse = this.toasterTranslationMethod("Please enter a valid phone number");
      this.signupForm.controls['phoneNumber'].setErrors({ 'error': translatedResponse });
      return
    }
    let UserPhoneCheckingForOTP: any;
    UserPhoneCheckingForOTP = {
      username: this.signupForm.controls?.phoneNumber?.value,
      phoneoremail: this.signupForm.controls?.phoneNumber?.value,
      otp: '',
      requestId: this.requestIdForgotPassword
    }
    try {
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token) => {
          UserPhoneCheckingForOTP.recaptcha = token;
          this.signService.Checkuserphone(this.requestIdForgotPassword, UserPhoneCheckingForOTP).subscribe(resp => {
            //  this.signUpScreen = [false, true];

            if (resp?.status == false) {

              const translatedResponse = this.toasterTranslationMethod(resp.message);
              this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light', delay: 3000 });
              //  this.signupForm.controls['phoneNumber'].setErrors({ 'error': translatedResponse });
            }
            else {
              const successResponse = this.toasterTranslationMethod(resp.message);
              this.toasterService.show(successResponse, { classname: 'bg-success text-light', delay: 1500 });
              this.requestIdForgotPassword = null
              this.requestIdForgotPassword = resp?.requestId;
              this.signUpScreen = [false, true];
              this.counterInterval = setInterval(() => {
                this.startCountDown();
              }, 1000);
            }
          })
        });
    } catch (error) {
      this.showLoader = false;
      console.log(error)
    }
  }

  verifyotp() {
    this.otpError = 'Please enter your otp to proceed'
    this.showOtpError = false;
    if (this.otpForm.invalid) {
      this.showOtpError = true;
      return
    }
    let UserPhoneCheckingForOTP: any;
    UserPhoneCheckingForOTP = {
      otp: this.otpForm.controls["input1"].value.toString() + this.otpForm.controls["input2"].value.toString() + this.otpForm.controls["input3"].value.toString() + this.otpForm.controls["input4"].value.toString(),
      username: this.signupForm.controls?.phoneNumber?.value,
      phoneoremail: this.signupForm.controls?.phoneNumber?.value,
      requestId: this.requestIdForgotPassword
    }
    try {
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token) => {
          UserPhoneCheckingForOTP.recaptcha = token;
          this.signService.Verifyotpphone(this.requestIdForgotPassword, UserPhoneCheckingForOTP).subscribe(resp => {
            if (resp?.status == false) {
              this.showOtpError = true;
              this.otpError = resp?.message
            }
            else {
              this.requestIdForgotPassword = resp?.requestId;
              this.signUpScreen = [false, false];
              if (this.counterInterval) {
                window.clearInterval(this.counterInterval)
              }
            }
          })
        });
    } catch (error) {
      this.showLoader = false;
      console.log(error)
    }
  }

  updatePassword() {
    //Checking whether all fields in form is valid or not
    if (this.signupForm.controls?.password.errors) {
      const control = this.signupForm.get('password');
      control?.markAsTouched({ onlySelf: true });
    }
    if (this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value) {
      const translatedResponse = this.toasterTranslationMethod("Password and confirm password should be same");
      this.signupForm.controls['confirmPassword'].setErrors({ 'error': translatedResponse });
      return
    }

    let UserPhoneCheckingForOTP: any;
    UserPhoneCheckingForOTP = {
      username: this.signupForm.controls?.phoneNumber?.value,
      phoneoremail: this.signupForm.controls?.phoneNumber?.value,
      requestId: this.requestIdForgotPassword,
      newPassword: this.signupForm.controls.password.value
    }
    try {
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token) => {
          UserPhoneCheckingForOTP.recaptcha = token;
          this.signService.Newpassword(this.requestIdForgotPassword, UserPhoneCheckingForOTP).subscribe(resp => {
            if (resp?.status == false) {
              this.signupForm.controls['password'].setErrors({ 'error': resp.message });
            }
            else {
              this.toasterService.show(resp?.message!, { classname: 'bg-success text-light', delay: 1500 });
              window.location.href = "/home"
            }
          })
        });
    } catch (error) {
      this.showLoader = false;
      console.log(error)
    }
  }
  toasterTranslationMethod(resp: any) {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    if (resp) {
      if (resp?.substring('</br>')) {
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
  }

  openLoginModal() {
    this.router.navigate(['/sports']).then(() => {
      this.genericService.openLoginModal()
    })
  }
}
