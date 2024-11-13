import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangePassword } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { ToastService } from '../../services/toast.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';


@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styles: [`
    .change-password-heading {
      color: var(--change-password-heading-clr);
    }
  `]
})
export class ChangePasswordComponent implements OnInit {
  toasterMessage: any;

  currentPassword: boolean = false;
  newPassword: boolean = false;
  confirmPassword: boolean = false
  constructor(private reportsService: BackendService, private toasterService: ToastService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service, private checkauthservice: CheckAuthService, private translate: TranslateService) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
  }
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  showLoader = false;
  siteLoader: string = ''

  public passwordForm = new FormGroup({
    current_pass: new FormControl('', [Validators.required]),
    new_pass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    confirm_pass: new FormControl('', [Validators.required])
  });


  get current_pass() {
    return this.passwordForm.get('current_pass');
  }

  get new_pass() {
    return this.passwordForm.get('new_pass');
  }

  get confirm_pass() {
    return this.passwordForm.get('confirm_pass');
  }

  onPasswordChange() {

    if (this.confirm_pass?.value && this.new_pass?.value) {
      if (this.confirm_pass.value === this.new_pass.value) {
        this.confirm_pass.setErrors(null);

      } else {
        this.confirm_pass.setErrors({ mismatch: true });
      }
    }
  }

  OldPassCompare() {

    // if(this.current_pass?.value && this.new_pass?.value) {
    //   if (this.new_pass.value === this.current_pass.value) {
    //     this.new_pass.setErrors({ matching: true });

    //   } else {
    //     this.new_pass.setErrors(null);
    //   }
    // }
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.controls["confirm_pass"].value !== this.passwordForm.controls["new_pass"].value) {
        this.passwordForm.controls['confirm_pass'].setErrors({ 'error': 'Password and confirm password should be same' });
      } else {
        this.recaptchaV3Service.execute('importantAction')
          .subscribe((token) => {
            this.passwordForm.controls.current_pass.setValue(this.passwordForm.controls.current_pass.value.replaceAll(' ', ''));
            this.passwordForm.controls.new_pass.setValue(this.passwordForm.controls.new_pass.value.replaceAll(' ', ''));
            this.showLoader = true;
            this.reportsService.ChangePassword(new ChangePassword(this.passwordForm.controls["current_pass"].value, this.passwordForm.controls["new_pass"].value, token), "ChangePasswordComponent").subscribe((resp: any) => {
              if (resp?.status == true) {
                this.showLoader = false;
                const translatedResponse = this.toasterTranslationMethod(resp?.message);
                this.toasterService.show(translatedResponse, { classname: 'bg-success text-light' });
                this.passwordForm.reset()
              }
              else {
                this.passwordForm.controls['current_pass'].setErrors({ 'error': resp?.message ? resp?.message : resp?.split('_').join(' ') });
              }
            })
          })
      }

    }

  }


  ngOnInit(): void {
    if (!this.checkauthservice.IsLogin()) {
      this.router.navigate(['sports']);
    }
  }

  visibilityPass: any = {
    currentPass: false,
    newPass: false,
    confirmPass: false,

  };

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
}
