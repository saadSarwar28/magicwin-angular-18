import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientStake } from 'src/app/models/models';
import { BackendService, _window } from 'src/app/services/backend.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stakeButtons',
  templateUrl: './stakeButtons.component.html',
  styles: [`
    .btn-label {
      color: var(--reports-stake-buttons-label-clr);
    }
    .stake-buttons-heading {
      color: var(--reports-stake-buttons-heading-clr);
    }
    .update-stake-btn {
      color: var(--reports-stake-buttons-submit-clr) !important;
      background: var(--reports-stake-buttons-submit-background-clr);
    }
  `]
})
export class StakeButtonsComponent implements OnInit {
  stackButtons: any;
  showLoader = false;
  minStackValue: number = 0;
  maxStackValue: number = 0
  p = 0;
  toasterMessage: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  constructor(private storageService: StorageService, private recaptchaV3Service: ReCaptchaV3Service, private checkauthservice: CheckAuthService, private backendService: BackendService, private toasterService: ToastService, private router: Router,
    private translate: TranslateService) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().minStackValue) {
      this.minStackValue = _window().minStackValue;
    }
    if (_window().maxStackValue) {
      this.maxStackValue = _window().maxStackValue;
    }
  }

  omit_special_char(event: any) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  public stackForm = new FormGroup({
    Stake1: new FormControl('', Validators.required),
    Stake2: new FormControl('', Validators.required),
    Stake3: new FormControl('', Validators.required),
    Stake4: new FormControl('', Validators.required),
    Stake5: new FormControl('', Validators.required),
    Stake6: new FormControl('', Validators.required),
    Stake7: new FormControl('', Validators.required),
    Stake8: new FormControl('', Validators.required),

  })
  ngOnInit(): void {
    if (this.checkauthservice.IsLogin()) {
      this.stackButtons = {};
      this.getStackButtons();
    }
  }

  get Stake1() { return this.stackForm.get('Stake1'); }
  get Stake2() { return this.stackForm.get('Stake2'); }
  get Stake3() { return this.stackForm.get('Stake3'); }
  get Stake4() { return this.stackForm.get('Stake4'); }
  get Stake5() { return this.stackForm.get('Stake5'); }
  get Stake6() { return this.stackForm.get('Stake6'); }
  get Stake7() { return this.stackForm.get('Stake7'); }
  get Stake8() { return this.stackForm.get('Stake8'); }


  // tslint:disable-next-line:typedef
  getStackButtons() {
    this.showLoader = true;
    this.backendService.stakesGet("StakeButtonsComponent").then((response: ClientStake) => {
      if (response) {
        this.stackButtons = response;
      }
    }).catch(err => {
      if (err.status == 401) {
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err);
        const translatedResponse = this.toasterTranslationMethod(err);
        this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light' });
      }
    }).finally(() => this.showLoader = false);
  }

  hasDuplicates(obj) {
    const seen = new Set();
    for (const value of Object.values(obj)) {
      if (seen.has(value)) {
        return true;
      }
      seen.add(value);
    }
    return false;
  }
  updateStackButtons() {
    try {
      const duplicatesExist = this.hasDuplicates(this.stackForm.value);
      if (duplicatesExist) {
        this.toasterService.show('Stake Values are same', { classname: 'bg-danger text-light' });
        return
      }
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token: any) => {
          this.showLoader = true;
          this.backendService.stakesPost(this.stackButtons, "StakeButtonsComponent", token).then(response => {
            if (response) {
              let btn = this.checkauthservice.getstaks();
              let stackeValues = {
                ...btn,
                stakeVal1: this.stackButtons.Stake1,
                stakeVal2: this.stackButtons.Stake2,
                stakeVal3: this.stackButtons.Stake3,
                stakeVal4: this.stackButtons.Stake4,
                stakeVal5: this.stackButtons.Stake5,
                stakeVal6: this.stackButtons.Stake6,
                stakeVal7: this.stackButtons.Stake7,
                stakeVal8: this.stackButtons.Stake8
              }
              this.mapStackButtons(stackeValues)
              const translatedResponse = this.toasterTranslationMethod(response);
              this.toasterService.show(translatedResponse, { classname: 'bg-success text-light' });
            }
          }).catch(err => {
            if (err.status == 401) {
              // this.router.navigate(['signin']);
              this.storageService.secureStorage.removeItem('token');
              window.location.href = window.location.origin
            } else {
              console.log(err)
              this.toasterService.show(err, { classname: 'bg-danger text-light' });
            }
          }).finally(() => this.showLoader = false);
        })
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

  private mapStackButtons(stakes: any) {
    this.storageService.secureStorage.setItem('stakes', JSON.stringify(stakes))
  }
}
