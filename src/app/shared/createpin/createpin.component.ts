import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { minLengthNumberValidator } from '../../validators/minLengthValidator';
import { patternValidator } from '../../validators/patternValidators';
import { pinMatchValidator } from '../../validators/pin-matchValidators';
import { _window, BackendService } from '../../services/backend.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastService } from '../../services/toast.service';
import { stat } from 'fs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-createpin',
  templateUrl: './createpin.component.html',
  styleUrls: ['./createpin.component.scss',]
})
export class CreatepinComponent implements OnInit {
  siteLoader: any;
  @Output() valueEmitted = new EventEmitter<boolean>(false);
  constructor(
    private backendService: BackendService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toasterService: ToastService,
    private dialogRef: MatDialogRef<CreatepinComponent>,
    private platformService: PlatformService

  ) {
    if (this.platformService.isBrowser()) {

      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader
      }
    }
  }
  isPin: boolean = true
  isConfirmPin: boolean = true
  createPinForm = new FormGroup({
    pin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), patternValidator()])),
    confirmPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), patternValidator()])),

  }, { validators: pinMatchValidator })
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
  }
  onPasswordChange() {

    if (this.createPinForm.controls.confirmPin?.value && this.createPinForm.controls.pin?.value) {
      if (this.createPinForm.controls.confirmPin.value === this.createPinForm.controls.pin.value) {
        this.createPinForm.controls.confirmPin.setErrors(null);
      } else {
        this.createPinForm.controls.confirmPin.setErrors({ mismatch: true });
      }
    }
  }

  get pin() {
    return this.createPinForm.get('pin');
  }
  get confirmPin() {
    return this.createPinForm.get('confirmPin');
  }

  closeModal() {
    this.dialogRef.close({
      success: true
    })
  }
  loading: boolean = false
  submit() {

    if (this.createPinForm.invalid) {
      Object.keys(this.createPinForm.controls).forEach(field => {
        const control = this.createPinForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      })
    } else {
      this.loading = true
      this.recaptchaV3Service
        .execute('importantAction')
        .subscribe((token) => {
          let body = {
            recaptcha: token,
            otp: this.createPinForm?.value.pin
          }
          this.backendService.createPin(body, "CreatepinComponent").subscribe((res: any) => {
            if (res.status) {
              this.toasterService.show(res.message, {
                classname: 'bg-success text-light',
                delay: 1500,
              });
              this.closeModal()
            }
            else {
              this.toasterService.show(res.message, {
                classname: 'bg-danger text-light',
                delay: 1500,
              });
            }
            this.loading = false
          })
        })
    }
  }


  ngOnInit(): void {
  }


}
