import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService, _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { ToastService } from '../../services/toast.service';
import { FileParameter } from '../../models/models';
import { Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { CircleTimerComponent } from '@flxng/circle-timer';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UtillsService } from '../../services/utills.service';
import Tesseract from 'tesseract.js';
@Component({
  selector: 'app-auto-deposit',
  templateUrl: './auto-deposit.component.html',
  styleUrls: ['./auto-deposit.component.scss'],
})
export class AutoDepositComponent implements OnInit, AfterViewInit {
  @ViewChild('fileupload') fileupload!: ElementRef;
  @ViewChild('timerr') timerr!: CircleTimerComponent;

  startDate = Date.now() - 15 * 1000; // current time minus 15 seconds
  duration = 60 * 1000; // 1 minute
  amountToShow: number | any = 0;
  currentpath: any = 'bank-transfer';
  utrToShow: any;
  selectedType: any;
  submitted: boolean = false;
  depositAmounts: number[] = [];
  checkType: any;
  bankresp: any = [];
  selectedIndex: number = 0;
  displayNotes: boolean = false;
  upiDepositVideos: boolean = false;
  showUTRLoader: boolean = false;
  selectedOptionData: any;
  configData: any;
  gmt: any;
  ifscdynamic: any;
  depositSettings: any;
  options: any;
  autoDepositNotes: any;
  userLocation: any;
  whatsappData: any;
  whatsappLinkQD: string = '';
  minimumDepositLimit: number = 100;
  depositRequests: any[] = [];
  extractedText: any;
  fetchedUTR: any;
  siteLoader: any;
  MinUsdt: any;
  usdtMultiply: number = 93;
  usdtCurrency: string = 'USDT';
  depositMaxAmount: any = [];
  bankThemeCard: any = [];
  waData: any
  uploadType: any = 'SLIP_UPLOAD';
  howToTransferTutorials = ''
  showTransferTutoriolVideos = false

  constructor(
    private clipBoard: Clipboard,
    private translate: TranslateService,
    private router: Router,
    private utillsService: UtillsService,
    private checkauthservice: CheckAuthService,
    private reportService: BackendService,
    private toasterService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private gaService: GoogleAnalyticsService
  ) {
    if (_window().usdtMultiply) {
      this.usdtMultiply = _window().usdtMultiply;
    }
    if (_window().howToTransferTutorials) {
      this.howToTransferTutorials = _window().howToTransferTutorials;
    }
    if (_window().showTransferTutoriolVideos) {
      this.showTransferTutoriolVideos = _window().showTransferTutoriolVideos;
    }
    if (_window().uploadType) {
      this.uploadType = _window().uploadType;
    }
    if (_window().usdtCurrency) {
      this.usdtCurrency = _window().usdtCurrency;
    }
    if (_window().MinUsdt) {
      this.MinUsdt = _window().MinUsdt;
    }
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().depositAmounts) {
      this.depositAmounts = typeof (_window().depositAmounts) == 'string' ? JSON.parse(_window().depositAmounts) : _window().depositAmounts;
    }
    if (_window().minimumDepositLimit) {
      this.minimumDepositLimit = _window().minimumDepositLimit;
    }

    if (_window().upiDepositVideos) {
      this.upiDepositVideos = _window().upiDepositVideos;
    }
    if (_window().depositMaxAmount) {
      this.depositMaxAmount = _window().depositMaxAmount;
    }
    this.utillsService.bannerData.subscribe((data: any) => {
      if (data) {
        this.bankThemeCard = this.utillsService.returnFormatedData(data, 'bankThemeCard')
      }
    })
    this.utillsService.configData.subscribe((data: any) => {
      if (data) {
        this.waData = this.utillsService.returnFormatedData(data, 'deposit')
      }
    });
  }
  ngAfterViewInit(): void { }
  get placeholderText(): string {
    if (this.depositType === 'USDT') {
      return `1 USDT = ${this.usdtMultiply} ${this.usdtCurrency}`;
    }
    return '0';
  }
  get placeholderText2(): string {
    if (this.depositType === 'USDT') {
      return `10 Digit USDT Reference No`;
    }
    return '6 to 12 Digits UTR Number';
  }
  getDetails() {
    this.reportService
      .ManualPaymentHistory()
      .subscribe((data) => {
        if (data) {
          this.depositRequests = data;
        }
      })

  }

  depositType: string = '';
  selectedData;
  pTypeIndex = 0;
  bnkID: any = '';

  selectOption(index: number, pTypeIndex: number, type: string) {
    this.selectedIndex = index;
    this.pTypeIndex = pTypeIndex;
    this.selectedData = this.bankresp[pTypeIndex].detail[index];
    this.bnkID = this.bankresp[pTypeIndex].detail[index].id;
    this.depositType = type;
    this.upiForm.reset();
    this.manualPaymentReqestParam.fileName = '';
    this.imageUrl = ""
    if (this.depositType == "Whatsapp") {
      this.DepositNotes = this.autoDepositNotes
    } else {
      this.DepositNotes = this.manualDepositNotes
    }


  }

  manualPaymentReqestParam: any = { fleName: '', contentType: '' };
  imageUrl: any;
  imageBlob: Blob | undefined;
  walletVal: any;
  sizeTooBig: any = false;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  upiForm = new FormGroup({
    amount: new FormControl('', Validators.compose([Validators.required])),
    utrTransactionId: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
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
  manualDepositNotes: any[] = []
  DepositNotes;
  errorMessage: boolean = false
  ngOnInit(): void {
    this.getDetails();
    this.loadBankDetails()
    let userLocation: any = this.utillsService.getCurrentCountry();
    this.ifscdynamic = userLocation === 'PK' ? 'IBAN Number' : 'IFSC Code';
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.autoDepositNotes = Array.from(d).filter(
          (x: any) => x.type === 'autoDepositNotes'
        );
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


  }
  reloadBankDetails() {
    this.utillsService.getDepositDetails()
  }

  loadBankDetails() {
    this.utillsService.bankDetails
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.bankresp = data
          this.errorMessage = this.utillsService.errorMessage
          if (this.bankresp.length > 1) {
            this.filterForUPI();
            this.selectedType = this.bankresp[1].depositType;
            this.selectedData = this.bankresp[1];
            this.depositType = this.bankresp[1].depositType;
            this.selectOption(0, 1, this.depositType);
          } else {
            this.selectedType = this.bankresp[0].depositType;
            this.selectedData = this.bankresp[0];
            this.depositType = this.bankresp[0].depositType;
            this.selectOption(0, 0, this.depositType);
          }
          this.selectedOptionData = this.bankresp.filter(
            (item) => item.depositType === this.selectedType
          )[0];
          this.whatsappData = this.bankresp.filter(
            (item) => item.depositType === 'Whatsapp'
          )[0];
          if (
            this.whatsappData &&
            this.whatsappData.detail &&
            this.whatsappData.detail.length > 0
          ) {
            this.whatsappLinkQD = this.whatsappData.detail[0].accountHolderName;
          }
        }
      })
  }



  filterForUPI() {
    // Find the index of "UPI" in the array
    const upiIndex = this.bankresp.findIndex(
      (item) => item.depositType == 'UPI'
    );

    // If "UPI" is found and it's not already at the second index (index 1)
    if (upiIndex !== -1 && upiIndex !== 1) {
      // Swap the elements at the upiIndex and the second index
      [this.bankresp[upiIndex], this.bankresp[1]] = [
        this.bankresp[1],
        this.bankresp[upiIndex],
      ];
    }

    // return this.bankresp;
  }



  get amount() {
    return this.upiForm.get('amount');
  }
  get wallet() {
    return this.upiForm.get('wallet');
  }
  get utrTransactionId() {
    return this.upiForm.get('utrTransactionId');
  }

  downloadQRCodePic() {
    var url = this.upiForm.controls.wallet.value;
    window.open(url);
  }

  backToPage() {
    this.startLoading = false;
    this.upiForm.reset();
    this.imageUrl = '';
    this.manualPaymentReqestParam.fileName = ""
    this.depositStatus = ''
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
      this.upiForm.controls['utrTransactionId'].patchValue(formattedId);
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
  makePayment() {
    this.submitted = true;
    if (!this.imageUrl || !this.manualPaymentReqestParam.fileName) {
      this.toasterService.show("Please Upload Your Payment Receipt", {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
      return
    }

    this.amountToShow = this.upiForm.controls.amount.value;
    this.utrToShow = this.upiForm.controls.utrTransactionId.value;
    if (this.checkauthservice.IsLogin()) {
      if (this.upiForm.invalid) {
        Object.keys(this.upiForm.controls).forEach((field) => {
          const control = this.upiForm.get(field);
          control?.markAsTouched({ onlySelf: true });
          if (this.upiForm.controls.amount.errors) {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            return;
          }
        });
      } else {
        try {

          if (this.depositType === 'Whatsapp') {
            this.manualDeposit()
          } else {
            this.autoDeposit()
          }
        } catch (error) {
          this.startLoading = false;
          console.log(error);
        }
      }
    } else {
      this.toasterService.show('Please login to continue', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }
  }

  manualDeposit() {
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
            this.upiForm.controls.amount.value,
            this.uploadType,
            this.upiForm.controls.utrTransactionId.value,
            token
          )
          .subscribe((resp) => {
            if (resp && resp?.status == true) {
              this.startLoading = true;
              this.startTimer();
              this.checkPaymentStatusManually(resp?.transactionId);
              this.upiForm.controls.wallet.setValue(this.walletVal);
              this.gaService.eventEmitter('deposit', 'payment', 'click');
              this.toasterService.show(resp?.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              this.upiForm.reset();
              this.imageUrl = '';
              this.manualPaymentReqestParam.fileName = ""
            } else {
              this.startLoading = false;
              this.toasterService.show(resp?.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          })

      });
  }

  autoDeposit() {
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
            this.depositType === 'USDT' ? this.usdtMultiply * Number(this.upiForm.controls.amount.value) : Number(this.upiForm.controls.amount.value),
            this.depositType,
            this.upiForm.controls.utrTransactionId.value,
            token,
            this.bnkID
          )
          .subscribe((resp) => {
            if (resp && resp?.status == true) {
              this.startLoading = true;
              this.startTimer();
              this.checkPaymentStatusManually(resp?.transactionId);
              this.upiForm.reset();
              this.imageUrl = '';
              this.manualPaymentReqestParam.fileName = ""
              this.upiForm.controls.wallet.setValue(this.walletVal);
              this.gaService.eventEmitter('deposit', 'payment', 'click');
              this.toasterService.show(resp?.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            } else {
              this.startLoading = false;
              this.toasterService.show(resp?.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          })

      });
  }



  startLoading: boolean = false

  timerValue: number = 10;
  depositStatus: string = '';
  customPaymentCheckInterval: any;
  checkPaymentStatusManually(id) {
    this.customPaymentCheckInterval = setInterval(() => {
      this.timerValue = this.timerValue - 1;
      if (this.timerValue == 0) {
        this.timerValue = 10;
        this.reportService
          .manualPaymentStatus(id, '')
          .subscribe((resp) => {
            if (resp && resp?.message != 'Pending') {
              if (!resp?.message.includes('Processing')) {
                this.depositStatus = resp?.message;
                this.timerr.complete();
                this.getDetails();
                this.startLoading = false
                clearInterval(this.customPaymentCheckInterval);
              }
              this.gaService.eventEmitter('deposit', 'payment', 'click');
              this.toasterService.show(resp?.message, {
                classname:
                  resp?.message != 'Rejected'
                    ? 'bg-success text-light'
                    : 'bg-danger text-light',
                delay: 3000,
              });
              this.manualPaymentReqestParam.fileName = null;
              this.imageUrl = null;
              (<HTMLInputElement>document.getElementById('paytm_image')).value =
                '';
              this.upiForm.reset();
            }
          });
      }
    }, 1000);
  }

  copyWallet(value: any) {
    navigator.clipboard.writeText(value)
      .then(() => {
        this.toasterService.show(`Copied ${value}`, {
          classname: 'bg-success text-light',
          delay: 1000,
        });
      })
      .catch((error) => {
        this.toasterService.show(`Not copied, its empty`, {
          classname: 'bg-danger text-light',
          delay: 1000,
        });
      });
  }

  uploadPicture(event: any, element: any) {
    var reader = new FileReader();
    let accept = ["png", "jpg", "jpeg"]
    let type = event.target.files[0].type.split('/')[1].toLowerCase()
    if (accept.includes(type)) {
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
          // this.showUTRLoader = false;
        };
        this.showUTRLoader = false;
        var reader = new FileReader();
        this.imageBlob = event.target.files;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.imageUrl = reader.result;
        };
        this.showUTRLoader = false;
      }

    } else {
      this.toasterService.show(
        'Allowed file type JPG,JPEG,PNG',
        { classname: 'bg-danger text-light', delay: 1000 }
      );
    }

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

  getDepositMaxAmount() {
    const maxAmount = this.depositMaxAmount?.find(
      (x) => x.depositType == this.depositType
    );
    return maxAmount?.maxAmount ? maxAmount.maxAmount : null;
  }

  forWhatsappDeposit() {
    this.utillsService.whatsappForWithDrawOrDeposit('deposit');
  }



  forWhatsapp() {
    if (this.whatsappLinkQD) {
      if (
        this.whatsappLinkQD.includes('http') ||
        this.whatsappLinkQD.includes('.t.me')
      ) {
        window.open(
          this.whatsappLinkQD.startsWith('http')
            ? this.whatsappLinkQD
            : 'http://' + this.whatsappLinkQD,
          '_blank'
        );
      } else if (this.whatsappLinkQD.startsWith('+')) {
        window.open('https://wa.me/' + this.whatsappLinkQD, '_blank');
      }
    }
  }

}
