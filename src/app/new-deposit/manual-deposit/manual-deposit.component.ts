import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { BackendService, _window } from 'src/app/services/backend.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { FileParameter, PaymentRequestModel } from 'src/app/models/models';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { DepositMethodService } from '../services/deposit-method.service';
import { CircleTimerComponent } from '@flxng/circle-timer';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UtillsService } from 'src/app/services/utills.service';
import Tesseract from 'tesseract.js';
@Component({
  selector: 'app-manual-deposit',
  templateUrl: './manual-deposit.component.html',
  styleUrls: ['./manual-deposit.component.scss'],
})
export class ManualDepositComponent implements OnInit {
  @ViewChild('fileupload') fileupload: ElementRef | undefined;
  @ViewChild('timerr') timerr!: CircleTimerComponent;

  startDate = Date.now() - 15 * 1000; // current time minus 15 seconds
  duration = 60 * 1000; // 1 minute
  amountToShow: number = 0;
  utrToShow: any;
  submitted: boolean = false;
  depositAmounts: number[] = [];
  minimumDepositLimit: number = 100;
  waData: any;
  manualDepositNotes: any;
  siteLoader: any;
  showUTRLoader: boolean = false;
  extractedText: any;
  fetchedUTR: any;
  uploadType: any = 'SLIP_UPLOAD';
  whatsappLinkQD: string = '';
  bankThemeCard: any = [];

  constructor(
    private clipBoard: Clipboard,
    private translate: TranslateService,
    private depositMethodService: DepositMethodService,
    private router: Router,
    private storageService: StorageService,
    private checkauthservice: CheckAuthService,
    private reportService: BackendService,
    private toasterService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private utillsService: UtillsService,
    private gaService: GoogleAnalyticsService
  ) {
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().uploadType) {
      this.uploadType = _window().uploadType;
    }
    if (_window().depositAmounts) {
      this.depositAmounts = typeof (_window().depositAmounts) == 'string' ? JSON.parse(_window().depositAmounts) : _window().depositAmounts;
    }

    if (_window().minimumDepositLimit) {
      this.minimumDepositLimit = _window().minimumDepositLimit;
    }
    if (_window().bankThemeCard) {
      this.bankThemeCard = _window().bankThemeCard;
    }
  }
  ngAfterViewInit(): void {
    //this.timerr.start();
  }
  manualPaymentReqestParam: any = { fleName: '', contentType: '' };
  imageUrl: any;
  imageBlob: Blob | undefined;
  walletVal: any;
  showLoader = false;
  sizeTooBig: boolean = false;
  depositLoader: boolean = false;
  depositRequests: any[] = [];
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  paytmForm = new FormGroup({
    amount: new FormControl('', Validators.compose([Validators.required])),
    utrTransactionId: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
    wallet: new FormControl(''),
  });

  onTimerComplete() {
    setTimeout(() => {
      this.startTimer();
      //this.notify.showInfo("Please Wait, We are Verifying the Transaction.", "Processing");
      this.toasterService.show('Processing, Please wait...', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }, 1000);
  }
  updateTime() {
    if (this.timerr.isTicking()) {
      return;
    }
    this.startTimer();
  }
  startTimer() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      this.timerr.start();
    }, 300);
  }
  forWhatsapp() {
    this.utillsService.whatsappForWithDrawOrDeposit('deposit');
  }

  getDetails() {
    this.reportService
      .ManualPaymentHistory()
      .then((data) => {
        if (data) {
          this.depositRequests = data;
        }
      })
      .finally(() => (this.depositLoader = false));
  }
  ngOnInit(): void {
    this.getDetails();
    this.depositLoader = true;
    this.utillsService.configData.subscribe((data: any) => {
      if (data) {
        this.waData = data.find((item) => item.type === 'deposit');
      }
    });
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.manualDepositNotes = Array.from(d).filter(
          (x: any) => x.type === 'manualDepositNotes'
        );
      }
    });
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (!this.checkauthservice.IsLogin()) {
      this.router.navigate(['sports']);
      this.toasterService.show('Please login to continue', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }

    this.reportService
      .getDepositDetails('upi')
      .then((data) => {
        if (data && data.length > 0) {
          let whatsappData = data.filter(
            (item) => item.depositType === 'Whatsapp'
          )[0];
          if (
            whatsappData &&
            whatsappData.detail &&
            whatsappData.detail.length > 0
          ) {
            this.whatsappLinkQD = whatsappData.detail[0].accountHolderName;
          }
        }
      })
      .finally(() => { });
  }

  get amount() {
    return this.paytmForm.get('amount');
  }
  get wallet() {
    return this.paytmForm.get('wallet');
  }
  get utrTransactionId() {
    return this.paytmForm.get('utrTransactionId');
  }

  downloadQRCodePic() {
    var url = this.paytmForm.controls.wallet.value;
    window.open(url);
  }

  extractText(file: File) {
    this.showUTRLoader = true;
    Tesseract.recognize(file, 'eng')
      .then(({ data: { text } }) => {
        this.extractedText = text;
        this.extractTransactionId(text);
      })
      .catch((err) => {
        console.error(err);
        this.showUTRLoader = false;
      });
  }
  utrRegex: any = /\b4\s*\d(?:\s*\d){8,10}\b(?!\S)/;
  // amtRegix: any = /\b[₹¥]?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b\s*INR|\bINR\s*[₹¥]?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b/g
  extractTransactionId(text: string) {
    const transactionIdRegex = this.utrRegex;
    const transactionIdMatch = text.match(transactionIdRegex);
    if (transactionIdMatch) {
      const formattedId = transactionIdMatch[0].replace(/\s/g, '');
      this.paytmForm.controls['utrTransactionId'].patchValue(formattedId);
      this.fetchedUTR = formattedId;
      this.showUTRLoader = false;
      this.toasterService.show('Auto Fetched UTR', {
        classname: 'bg-success text-light',
        delay: 1000,
      });
    } else {
      this.showUTRLoader = false;
      this.toasterService.show('Unable to Auto Fetch UTR', {
        classname: 'bg-danger text-light',
        delay: 1000,
      });
    }
    this.showUTRLoader = false;
    // this.extractAmount(text);
  }
  backToPage() {
    this.receivedResponseOfPayment = 'loading';
    this.showLoader = false;
    this.paytmForm.reset();
    this.imageUrl = '';
  }
  makePayment() {
    this.submitted = true;
    if (!this.imageUrl) {
      return;
    }

    this.amountToShow = this.paytmForm.controls.amount.value;
    this.utrToShow = this.paytmForm.controls.utrTransactionId.value;
    if (this.checkauthservice.IsLogin()) {
      if (this.paytmForm.invalid) {
        Object.keys(this.paytmForm.controls).forEach((field) => {
          const control = this.paytmForm.get(field);
          control?.markAsTouched({ onlySelf: true });
          if (this.paytmForm.controls.amount.errors) {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            return;
          }
        });
      } else if (!this.manualPaymentReqestParam.fileName) {
        this.toasterService.show(this.toasterMessage, {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
        this.showUTRLoader = false;
        return;
      } else {
        try {
          this.recaptchaV3Service
            .execute('importantAction')
            .subscribe((token: any) => {
              let data = new FileParameter(
                this.manualPaymentReqestParam.data,
                this.manualPaymentReqestParam.contentType
              );
              data.data = new Blob([this.manualPaymentReqestParam.data], {
                type: this.manualPaymentReqestParam.contentType,
              });
              data.fileName = this.manualPaymentReqestParam.fileName;
              this.reportService
                .manualPayment_POST(
                  data,
                  this.paytmForm.controls.amount.value,
                  this.uploadType,
                  this.paytmForm.controls.utrTransactionId.value,
                  token
                )
                .then((resp) => {
                  if (resp && resp?.status == true) {
                    this.getDetails();
                    this.checkPaymentStatusManually(resp?.transactionId);
                    this.showLoader = true;
                    this.startTimer();
                    // this.gaService.eventEmitter('deposit', 'payment', 'click');
                    this.toasterService.show(resp?.message, {
                      classname: 'bg-success text-light',
                      delay: 3000,
                    });
                  } else {
                    this.showLoader = false;
                    this.toasterService.show(resp?.message, {
                      classname: 'bg-danger text-light',
                      delay: 3000,
                    });
                  }
                })
                .finally(() => {
                  this.paytmForm.controls.wallet.setValue(this.walletVal);
                });
            });
        } catch (error) {
          this.showLoader = false;
          console.log(error);
        }
      }
    } else {
      this.router.navigate(['signin']);
      this.toasterService.show('Please login to continue', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }
  }

  timerValue: number = 10;
  receivedResponseOfPayment: string = 'loading';
  customPaymentCheckInterval: any;
  checkPaymentStatusManually(id) {
    this.customPaymentCheckInterval = setInterval(() => {
      this.timerValue = this.timerValue - 1;
      if (this.timerValue == 0 && this.receivedResponseOfPayment == 'loading') {
        this.timerValue = 10;
        this.reportService.manualPaymentStatus(id, 'phonepe').then((resp) => {
          if (
            resp &&
            (resp?.message == 'Accepted' ||
              resp?.message == 'Success' ||
              resp?.message == 'Approved ' ||
              resp?.message == 'Rejected')
          ) {
            //this.timerr.complete();
            this.getDetails();
            clearInterval(this.customPaymentCheckInterval);
            this.receivedResponseOfPayment = resp?.message;
            this.gaService.eventEmitter('deposit', 'payment', 'click');
            this.toasterService.show(resp?.message, {
              classname:
                resp?.message == 'Accepted' ||
                  resp?.message == 'Success' ||
                  resp?.message == 'Approved '
                  ? 'bg-success text-light'
                  : 'red accent-3 text-light',
              delay: 3000,
            });
            this.manualPaymentReqestParam.fileName = null;
            this.imageUrl = null;
            (<HTMLInputElement>document.getElementById('paytm_image')).value =
              '';
            this.paytmForm.reset();
            this.showLoader = false;
          }
        });
      }
    }, 1000);
  }

  copyWallet(value: any) {
    if (value) {
      this.clipBoard.copy(value);
      this.toasterService.show(`Copied ${value}`, {
        classname: 'bg-success text-light',
        delay: 1000,
      });
    } else {
      this.toasterService.show(`Not copied, its empty`, {
        classname: 'bg-danger text-light',
        delay: 1000,
      });
    }
  }

  uploadPicture(event: any, element: any) {
    var reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      if (Math.ceil(event.target.files[0].size / 1024 / 1024) > 5) {
        this.sizeTooBig = true;
        this.imageUrl = null;
        element.value = '';
        this.manualPaymentReqestParam = { fleName: '', contentType: '' };
        if (this.fileupload) {
          this.fileupload.nativeElement.value = '';
        }
        this.toasterService.show(
          'Kindly choose a file of size upto 2MB to proceed.',
          { classname: 'bg-danger text-light', delay: 1000 }
        );
        this.showUTRLoader = false;
        return;
      }
      this.manualPaymentReqestParam.fileName = event.target.files[0].name;
      this.manualPaymentReqestParam.contentType = event.target.files[0].type;

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (target) => {
        this.imageUrl = target;
        this.extractText(this.imageUrl.target.result);
        this.manualPaymentReqestParam.data = this.imageUrl.target.result;
      };
      this.showUTRLoader = false;
    }
    var reader = new FileReader();
    this.imageBlob = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
    this.showUTRLoader = false;
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  toasterMessage: any = '';
  toasterTranslationMethod() {
    this.toasterMessage = '';
    const selectedLanguage = localStorage.getItem('locale');
    if (selectedLanguage !== null) {
      this.translate.use(selectedLanguage);
      this.translate.setDefaultLang(selectedLanguage);
    }
    this.translate
      .get('kindlychooseafiletoproceed')
      .subscribe((res: string) => {
        this.toasterMessage = res;
      });
    return this.toasterMessage;
  }
}
