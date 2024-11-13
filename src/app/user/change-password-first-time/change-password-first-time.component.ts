import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from '../../models/models';
import { BackendService, _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UtillsService } from '../../services/utills.service';
@Component({
  selector: 'app-change-password-first-time',
  templateUrl: './change-password-first-time.component.html',
  styleUrls: ['./change-password-first-time.component.scss'],
})
export class ChangePasswordFirstTimeComponent implements OnInit {
  confirmPasswordIcon: boolean = false;
  passwordIcon: boolean = false;

  constructor(
    private storageService: StorageService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private reportsService: BackendService,
    private toasterService: ToastService,
    private router: Router,
    private utillsService: UtillsService
  ) {
    this.siteLogo = _window().siteLogo;

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
  }
  siteLogo: string = '';
  noInternet: any = false;

  showLoader = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  public passwordForm = new FormGroup({
    current_pass: new FormControl(this.utillsService.password, [
      Validators.required,
    ]),
    new_pass: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirm_pass: new FormControl('', [Validators.required]),
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
    // if (this.confirm_pass?.value && this.new_pass?.value) {
    //   if (this.confirm_pass.value === this.new_pass.value) {
    //     this.confirm_pass.setErrors(null);
    //   } else {
    //     this.confirm_pass.setErrors({ mismatch: true });
    //   }
    // }
    this.passwordForm.controls.current_pass?.setValue(
      this.utillsService.password
    );
  }

  OldPassCompare() {
    // if (this.current_pass?.value && this.new_pass?.value) {
    //   if (this.new_pass.value === this.current_pass.value) {
    //     this.new_pass.setErrors({ matching: true });
    //   } else {
    //     this.new_pass.setErrors(null);
    //   }
    // }
  }

  onSubmit() {
    ``;
    if (
      this.passwordForm.controls.new_pass.value !=
      this.passwordForm.controls.confirm_pass.value
    ) {
      this.passwordForm.controls['confirm_pass'].reset;
      this.passwordForm.controls['confirm_pass'].setErrors({
        error: 'Password and confirm password should be same',
      });
      return;
    } else {
      this.passwordForm.controls['confirm_pass'].setErrors(null);
    }
    if (this.passwordForm.controls['current_pass'].value != '') {
      this.passwordForm.controls['current_pass'].setErrors(null);
    }
    if (this.passwordForm.invalid) {
      Object.keys(this.passwordForm.controls).forEach((field) => {
        const control = this.passwordForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    } else {
      try {
        this.recaptchaV3Service
          .execute('importantAction')
          .subscribe((token: any) => {
            this.showLoader = true;
            if (this.passwordForm.valid) {
              if (
                this.passwordForm.controls['confirm_pass'].value !==
                this.passwordForm.controls['new_pass'].value
              ) {
                this.passwordForm.controls['confirm_pass'].setErrors({
                  error: 'Password and confirm password should be same',
                });
              } else {
                this.passwordForm.controls.current_pass.setValue(
                  this.passwordForm.controls.current_pass.value.replaceAll(
                    ' ',
                    ''
                  )
                );
                this.passwordForm.controls.new_pass.setValue(
                  this.passwordForm.controls.new_pass.value?.replaceAll(' ', '') || ''
                );
                this.reportsService
                  .changePassword_First(
                    new ChangePassword(
                      this.passwordForm.controls['current_pass'].value,
                      this.passwordForm.controls['new_pass'].value || '',
                      token
                    )
                  )
                  .subscribe(
                    {
                      next: (resp) => {
                        if (resp.status) {
                          sessionStorage.removeItem('token');
                          this.toasterService.show(resp.message, {
                            classname: 'bg-success text-light',
                          });
                          this.showLoader = false;
                          this.passwordForm.reset();
                          this.onclose();
                          this.router.navigate(['/']);
                        } else {
                          this.passwordForm.controls['current_pass'].setErrors({
                            error: resp.message,
                          });
                        }
                        this.showLoader = false
                      },
                      error: (err) => {
                        this.showLoader = false
                        if (err.status == 401) {
                          this.storageService.secureStorage.removeItem('token');
                          window.location.href = window.location.origin;

                        } else {
                          console.log(err);
                        }
                      },
                    }
                  )

              }
            }
          });
      } catch (error) {
        this.showLoader = false;
        console.log(error);
      }
    }
  }

  lsItem: any;
  ngOnInit(): void {
    this.storageService.secureStorage.removeItem('token');
  }


  onclose() {

  }
}
