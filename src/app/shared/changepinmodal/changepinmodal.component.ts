import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { _window, BackendService } from 'src/app/services/backend.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtillsService } from 'src/app/services/utills.service';
import { minLengthNumberValidator } from 'src/app/validators/minLengthValidator';
import { patternValidator } from 'src/app/validators/patternValidators';
import { pinMatchValidator } from 'src/app/validators/pin-matchValidators';

@Component({
  selector: 'app-changepinmodal',
  templateUrl: './changepinmodal.component.html',
  styleUrls: ['./changepinmodal.component.scss'],
})
export class ChangepinmodalComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('otpInput1, otpInput2, otpInput3, otpInput4')
  otpInputs!: QueryList<ElementRef>;
  siteLoader: any;
  isDisabled = true;
  constructor(
    private backendService: BackendService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toasterService: ToastService,
    private utillServices: UtillsService,
    private dialogRef: MatDialog
  ) {
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
  }
  isPin: boolean = true;
  isConfirmPin: boolean = true;
  changePinForm = new FormGroup(
    {
      pin: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          minLengthNumberValidator(4),
          Validators.maxLength(4),
          Validators.minLength(4),
          patternValidator(),
        ])
      ),
      confirmPin: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4),
          patternValidator(),
        ])
      ),
      phone: new FormControl(''),
    },
    { validators: pinMatchValidator }
  );



  get pin() {
    return this.changePinForm.get('pin');
  }
  get confirmPin() {
    return this.changePinForm.get('confirmPin');
  }
  get phone() {
    return this.changePinForm.get('phone');
  }
  clientPhone: any = ''
  ngOnInit(): void {
    this.utillServices.configData.subscribe(() => {
      this.clientPhone = this.utillServices.clientPhone;
    })
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
  }

  onPasswordChange() {

    if (this.changePinForm.controls.confirmPin?.value && this.changePinForm.controls.pin?.value) {
      if (this.changePinForm.controls.confirmPin.value === this.changePinForm.controls.pin.value) {
        this.changePinForm.controls.confirmPin.setErrors(null);
      } else {
        this.changePinForm.controls.confirmPin.setErrors({ mismatch: true });
      }
    }
  }
  ngAfterViewInit() {
    this.resetOtpInputs();
  }

  ngOnDestroy(): void {
    this.resetOtpInputs();
  }

  resetOtpInputs(): void {
    this.otpInputs.forEach((input) => (input.nativeElement.value = ''));
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.otpInputs.length) {
      this.otpInputs.toArray()[index].nativeElement.focus();
    }
  }
  onKeyPress(event: KeyboardEvent): void {
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0 && index > 1) {
      this.otpInputs.toArray()[index - 2].nativeElement.focus();
    }
  }

  submit() {
    if (this.changePinForm.invalid) {
      Object.keys(this.changePinForm.controls).forEach((field) => {
        const control = this.changePinForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    } else {
      this.loading = true;
      this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
        let body = {
          recaptcha: token,
          withdrawPin: this.changePinForm?.value.pin,
          otp: this.otpInputs
            .map((input) => input.nativeElement.value)
            .join(''),
        };
        this.backendService
          .ResetWithdrawpin(body, 'ResetWithdrawpin')
          .then((res: any) => {
            if (res.status) {
              this.toasterService.show(res.message, {
                classname: 'bg-success text-light',
                delay: 1500,
              });
              this.closeModal();
            } else {
              this.toasterService.show(res.message, {
                classname: 'bg-danger text-light',
                delay: 1500,
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  }
  loading: boolean = false;
  loadingOtp: boolean = false;
  getOtp() {
    this.loadingOtp = true;
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      let body = {
        recaptcha: token,
      };
      this.backendService
        .RequestWithDrawPin(body, 'RequestWithDrawPin')
        .then((res: any) => {
          if (res.status) {
            this.toasterService.show(res.message, {
              classname: 'bg-success text-light',
              delay: 1500,
            });
          } else {
            this.toasterService.show(res.message, {
              classname: 'bg-danger text-light',
              delay: 1500,
            });
          }
        })
        .finally(() => {
          this.loadingOtp = false;
        });
    });
  }
  closeModal() {
    this.dialogRef.closeAll()
    this.resetOtpInputs();
  }
}
