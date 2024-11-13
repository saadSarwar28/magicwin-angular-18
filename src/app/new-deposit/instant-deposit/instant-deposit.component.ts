import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService, _window } from '../../services/backend.service';
import { GrezPayInputModel, PaymentRequestModel } from '../../models/models';
import { ToastService } from '../../services/toast.service';
import { NavigationEnd, Router } from '@angular/router';
import { CheckAuthService } from '../../services/check-auth.service';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { UtillsService } from '../../services/utills.service';

@Component({
  selector: 'app-instant-deposit',
  templateUrl: './instant-deposit.component.html',
  styleUrls: ['./instant-deposit.component.scss'],
})
export class InstantDepositComponent implements OnInit {
  isIphone: boolean = false;
  @ViewChild('shaniPayContent', { static: true }) shaniPayContent:
    | ElementRef
    | undefined;
  @ViewChild('paymentTypeSelection', { static: true }) paymentTypeSelection:
    | ElementRef
    | undefined;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  siteLoader: any;
  payType: string = '';
  depositDrawAmounts: any;
  instantSign: boolean = false;

  constructor(
    private utillsService: UtillsService,
    private translate: TranslateService,
    private storageService: StorageService,
    private checkauthservice: CheckAuthService,
    private router: Router,
    private clipBoard: Clipboard,
    private reportService: BackendService,
    private toasterService: ToastService,
    private gaService: GoogleAnalyticsService
  ) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    // if (_window().payType) {
    //   this.payType = _window().payType;
    // }
    if (_window().instantSign) {
      this.instantSign = _window().instantSign;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().depositDrawAmounts) {
      this.depositDrawAmounts = typeof (_window().depositDrawAmounts) == 'string' ? JSON.parse(_window().depositDrawAmounts) : _window().depositDrawAmounts;
    }
    if (_window().paymentMethod == 2) {
      if (!_window().Layer) {
        // let s = document.createElement('script');
        // s.setAttribute('src', _window().layer);
        // document.getElementsByTagName('head')[0].appendChild(s);
      }
    }

    this.reloadRouteCheck();
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        const route = v.urlAfterRedirects.split('/');
        if (route[5]) {
          this.globalPaymentGateWay = route[5];
        }
      }
    });
  }

  reloadRouteCheck() {
    const route = this.router.url.split('/');
    if (route[5]) {
      this.globalPaymentGateWay = route[5];
    }
  }

  manualPaymentReqestParam: any = { fleName: '', contentType: '' };
  userDetails: any;
  showLoader: any = false;
  shaniPaymentGateWayData: any;
  toasterMessage: any;
  paymentMethod: string = '';
  paymentMethodTypes: any = [];
  globalPaymentGateWay: any;

  @ViewChild('htmlForm') htmlForm: ElementRef | undefined;
  formToSubmit = new FormGroup({
    PAY_ID: new FormControl(),
    ORDER_ID: new FormControl(),
    AMOUNT: new FormControl(),
    TXNTYPE: new FormControl(),
    CUST_SHIP_NAME: new FormControl(),
    CUST_PHONE: new FormControl(),
    CUST_EMAIL: new FormControl(),
    CURRENCY_CODE: new FormControl(),
    RETURN_URL: new FormControl(),
    HASH: new FormControl(),
  });

  paymentForm = new FormGroup({
    emailAddress: new FormControl(''),
    phoneNumber: new FormControl(''),
    payment: new FormControl('', Validators.compose([Validators.required])),
  });

  get payment() {
    return this.paymentForm.get('payment');
  }
  ngOnInit(): void {
    this.utillsService.configData.subscribe((data: any) => {
      if (data) {
        let PGData = data.find((item) => item.type === 'PG');
        let checkType = PGData.data[0].id;
        let link = PGData.data[0].link;
        if (checkType > 2) {
          this.payType = link
        }
      }
    });
    const isIOS =
      navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1;
    if (isIOS) {
      this.isIphone = true;
    } else {
      this.isIphone = false;
    }
    if (this.checkauthservice.IsLogin()) {
      this.reportService
        .pyamentgetway_GET()
        .subscribe((data) => {
          if (data) {
            this.userDetails = data;
            // this.paymentMethodTypes = (Object.keys(this.userDetails.paymentOptions));
            // this.globalPaymentGateWay = (Object.values(this.userDetails.paymentOptions)[0]);
            // this.selectPaymentType()
          }
        })

    } else {
      this.storageService.secureStorage.removeItem('token');
      this.storageService.secureStorage.removeItem('stakes');
      this.storageService.secureStorage.removeItem('client');
      this.toasterService.show('Please login to continue', {
        classname: 'bg-danger text-light',
        delay: 1500,
      });
      setTimeout(() => {
        this.router.navigate(['signin']).then(() => {
          window.location.href = window.location.href;
        });
      }, 1500);
    }
  }




  async makepaymentNew() {
    //Checking whether all fields in form is valid or not
    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach((field) => {
        const control = this.paymentForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    } else if (
      this.paymentForm.controls.payment.value < _window().minInstantDeposit
    ) {
      const translatedResponse = this.toasterTranslationMethod(
        'minimumdepositlimit'
      );
      this.toasterService.show(
        translatedResponse + _window().minInstantDeposit,
        { classname: 'bg-danger text-light', delay: 3000 }
      );
      return;
    } else {
      this.showLoader = true;
      let model = new PaymentRequestModel(
        this.paymentForm.controls.payment.value,
        this.userDetails?.phone,
        this.userDetails?.email
      );
      let res: any;
      res = await this.reportService.pyamentgetway_POST(
        model,
        `/exchangeapi/${this.payType}`
      );
      if (res.status) {
        if (this.isIphone) {
          this.showLoader = false;
          window.location.href = res.checkout_url
            ? res.checkout_url
            : res.message;
        } else {
          this.showLoader = false;
          window.open(
            res.checkout_url ? res.checkout_url : res.message,
            '_blank'
          );
        }
      } else {
        this.showLoader = false;
        this.toasterService.show(res.message || 'Error In Request', {
          classname: 'bg-danger text-light',
        });
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
}
