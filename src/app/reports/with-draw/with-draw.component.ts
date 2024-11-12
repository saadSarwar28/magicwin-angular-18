import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { BackendService, _window } from 'src/app/services/backend.service';
import {
  RequetedAmount,
} from 'src/app/models/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { minLengthNumberValidator } from 'src/app/validators/minLengthValidator';
import { UtillsService } from 'src/app/services/utills.service';
import { WalletService } from 'src/app/services/wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatepinComponent } from 'src/app/shared/createpin/createpin.component';
import { ChangepinmodalComponent } from 'src/app/shared/changepinmodal/changepinmodal.component';
@Component({
  selector: 'app-with-draw',
  templateUrl: './with-draw.component.html',
  styleUrls: ['./with-draw.component.scss'],
})
export class WithDrawComponent implements OnInit {
  showLoader = false;
  showWithDrawForm: any = true;
  withDrawText: any =
    'The bonus amount can be used to place bets across the platform and the winnings can be withdrawn. A player can use bonus amount to place bets and play games on Kheloyar. If the withdrawals are pending from the bank, it may take upto 72 banking hours for your transaction to clear. If a user only deposits and attempts to withdraw the money without placing a single bet, 100% of the amount will be withheld due to suspicious activity. If this is repeated, no withdrawal will be given to the user.';
  responseMessage: any;
  kycExists: any = false;
  imageUrl: any;
  imageBlob: Blob | undefined;
  withDraws: any;
  banks: any;
  paymentDetails: any;
  manualPaymentReqestParam: any = { fleName: '', contentType: '' };
  toasterMessage: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  withdrawNoteL1: any;
  withdrawNoteL2: any;
  withdrawNoteL3: any;
  withdrawNoteL4: any;
  withDrawAmounts: any = [];
  withdrawAdd: any = [];
  isBetVoro = false
  isWithdrawLink = false
  withdrawExist: any = [];
  minimumWithdrawalLimit: any;
  showPinOptions: boolean = false;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private reportService: BackendService,
    private toasterService: ToastService,
    private checkauthservice: CheckAuthService,
    private translate: TranslateService,
    private gaService: GoogleAnalyticsService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private utillServices: UtillsService,
    private walletService: WalletService,
    private dialog: MatDialog
  ) {
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().minimumWithdrawalLimit) {
      this.minimumWithdrawalLimit = _window().minimumWithdrawalLimit;
    }

    if (_window().showPinOptions) {
      this.showPinOptions = _window().showPinOptions;
    }
    if (_window().isBetVoro) {
      this.isBetVoro = _window().isBetVoro;
    }
    if (_window().isWithdrawLink) {
      this.isWithdrawLink = _window().isWithdrawLink;
    }
  }
  checkPin: number = 0;
  clientPhone: any = '';
  ngOnInit(): void {
    this.bankAccountForm.controls.withdrawPin?.setValue(
      this.showPinOptions ? '' : '8787'
    );
    this.getPinData();
    this.getExisingBanks();
    if (_window().withDrawText) {
      this.withDrawText = _window().withDrawText;
    }
    if (_window().withdrawOption) {
      this.withDrawAmounts = typeof (_window().withdrawOption) == 'string' ? JSON.parse(_window().withdrawOption) : _window().withdrawOption;
    }
    if (_window().withdrawExist) {
      this.withdrawExist = _window().withdrawExist;
    }
    if (_window().withdrawAdd) {
      this.withdrawAdd = _window().withdrawAdd;
    }
    if (!this.checkauthservice.IsLogin()) {
      this.utillServices.openLoginModal()
    } else {
      this.getWithDrawHistory();
      // this.getExisingBanks();
      this.showLoader = true;
      this.loadBalance();
      if (_window().enableKYC == true) {
        this.checkKYC();
      } else {
        this.showWithDrawForm = false;
      }
    }
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
  }
  onInputChange2(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
  }
  onSubmitWithDraw() {
    if (this.withDrawForm.invalid) {
      Object.keys(this.withDrawForm.controls).forEach((field) => {
        const control = this.withDrawForm.get(field);
        control?.markAsTouched({ onlySelf: true });
        return;
      });
    } else if (
      this.withDrawForm.controls.amount.value < _window().minimumWithdrawalLimit
    ) {
      const translatedResponse = this.toasterTranslationMethod(
        'minimumWithdrawalLimit'
      );
      this.toasterService.show(
        translatedResponse + _window().minimumWithdrawalLimit,
        { classname: 'bg-danger text-light', delay: 3000 }
      );
      return;
    }
    // else if (this.withDrawForm.controls.amount.value < 500) {
    //   const translatedResponse = this.toasterTranslationMethod('minimumwithdrawlimit');
    //   this.toasterService.show(translatedResponse, { classname: 'bg-danger text-light', delay: 3000 });
    //   return
    // }
    else {
      try {
        this.recaptchaV3Service
          .execute('importantAction')
          .subscribe((token: any) => {
            this.showLoader = true;
            let RequetedAmount: RequetedAmount;
            RequetedAmount = {
              accountNo: this.withDrawForm.controls.account.value,
              amount: this.withDrawForm.controls.amount.value,
              id: this.bnkId,
              recaptcha: token,
            };
            this.reportService
              .WithdrawRequest(RequetedAmount)
              .then((resp: any) => {
                this.gaService.eventEmitter('withdraw', 'payment', 'click');
                const translatedResponse = this.toasterTranslationMethod(
                  resp?.message
                );
                if (resp?.status == true) {
                  if (this.isBetVoro) {
                    if (this.isWithdrawLink) {
                      if (resp.url) {
                        window.open(resp.url, '_blank');
                      } else {
                        this.toasterService.show(translatedResponse, {
                          classname: 'bg-danger text-white',
                          delay: 3000,
                        });
                      }
                    } else {
                      this.toasterService.show(translatedResponse, {
                        classname: 'bg-success text-white',
                        delay: 3000,
                      });
                    }
                  } else {
                    this.toasterService.show(translatedResponse, {
                      classname: 'bg-success text-white',
                      delay: 3000,
                    });
                  }
                  this.getWithDrawHistory();
                } else {
                  this.toasterService.show(translatedResponse, {
                    classname: 'bg-danger text-white',
                    delay: 3000,
                  });
                }
              })
              .finally(() => (this.showLoader = false));
          });
      } catch (error) {
        this.showLoader = false;
        console.log(error);
      }
    }
  }

  getWithDrawHistory() {
    this.reportService.GetWithdrawRequests().then((data) => {
      if (data) {
        this.withDraws = data;
      }
    });
  }
  getPinData() {
    this.utillServices.configData.subscribe(() => {
      this.showPin = this.utillServices.checkPin;
    })
  }

  activeAmount: number = 0;
  paymentOptions = [
    { id: 0, value: 'Bank' },
    // { id: 1, value: 'PayTM' },
    // { id: 1, value: 'UPI' },
    // { id: 1, value: 'G Pay' },
    // { id: 1, value: 'PhonePe' },
    // { id: 1, value: 'QR Pay' },
  ];

  public withDrawForm = new FormGroup({
    amount: new FormControl('', Validators.compose([Validators.required])),
    account: new FormControl('', Validators.compose([Validators.required])),
    accountHolder: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
  });

  get amount() {
    return this.withDrawForm.get('amount');
  }
  get account() {
    return this.withDrawForm.get('account');
  }

  submit() {
    if (this.bankAccountForm.invalid) {
      Object.keys(this.bankAccountForm.controls).forEach((field) => {
        const control = this.bankAccountForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    } else {
      try {
        this.recaptchaV3Service
          .execute('importantAction')
          .subscribe((token: any) => {
            this.showLoader = true;
            let ClientkBankAccounts;
            ClientkBankAccounts = {
              accountNo: this.bankAccountForm.controls.accountNumber.value,
              accountHolderName:
                this.bankAccountForm.controls.accountHolderName.value,
              iFSCCode: this.bankAccountForm.controls.ifscCode.value,
              bankName: this.bankAccountForm.controls.bankName.value,
              branchName: this.bankAccountForm.controls.branchName.value,
              accountType: '',
              widthdrawpin: this.bankAccountForm.controls.withdrawPin.value,
              type: this.bankAccountForm.controls.type.value,
              recaptcha: token,
            };
            this.reportService
              .AddBankAccount(ClientkBankAccounts)
              .then((data) => {
                if (data && data.status == true) {
                  const translatedResponse = this.toasterTranslationMethod(
                    data?.message
                  );
                  this.toasterService.show(translatedResponse, {
                    classname: 'bg-success text-light',
                    delay: 3000,
                  });
                  this.bankAccountForm.reset();
                  this.getExisingBanks();
                } else {
                  const translatedResponse = this.toasterTranslationMethod(
                    data?.message
                  );
                  this.toasterService.show(translatedResponse, {
                    classname: 'bg-danger text-light',
                    delay: 3000,
                  });
                }
              })
              .finally(() => {
                this.showLoader = false;
              });
          });
      } catch (error) {
        this.showLoader = false;
        console.log(error);
      }
    }
  }

  existingBankAccounts: any[] = [];
  showPin: any = 2;
  getExisingBanks() {
    this.showLoader = true;
    this.reportService
      .GetBankAccounts()
      .then((data: any) => {
        if (data) {
          if (data && data.banks.length > 0) {
            this.selectedTab = 'existing';
          } else {
            this.selectedTab = 'add';
            if (this.showPin == 0 && this.showPinOptions) {
              this.openCreatePinModal();
            }
          }
          if (data.banks.length > 0) {
            this.existingBankAccounts = data.banks;
            this.existingBankAccounts = this.existingBankAccounts.filter(
              (bank: { type: string }) => bank?.type == 'Bank'
            );
            this.selectedAccount = data.banks[0];
            this.withDrawForm.controls.account.setValue(
              data.banks[0]?.accountNo
            );
            this.withDrawForm.controls.accountHolder.setValue(
              data.banks[0]?.accountHolderName
            );
            this.bnkId = data.banks[0].id;
            // this.showPin = data.otpRequired;

          } else {
            this.existingBankAccounts = [];
            const translatedResponse = this.toasterTranslationMethod(
              'Please create a bank account first'
            );
            this.toasterService.show(translatedResponse, {
              classname: 'bg-danger text-light',
              delay: 3000,
            });
          }
        }
      })
      .finally(() => (this.showLoader = false));
  }

  onDeleteAccount(accountNumber: any) {
    try {
      // this.recaptchaV3Service.execute('importantAction')
      //   .subscribe((token: any) => {
      this.showLoader = true;
      this.reportService
        .RemoveBankAccount(accountNumber)
        .then((data) => {
          if (data && data.status == true) {
            const translatedResponse = this.toasterTranslationMethod(
              data?.message
            );
            this.toasterService.show(translatedResponse, {
              classname: 'bg-success text-light',
              delay: 3000,
            });
            this.bankAccountForm.reset();

            this.getExisingBanks();
          } else {
            const translatedResponse = this.toasterTranslationMethod(
              data?.message
            );
            this.toasterService.show(translatedResponse, {
              classname: 'bg-danger text-light',
              delay: 3000,
            });
          }
        })
        .finally(() => {
          this.showLoader = false;
        });
      // })
    } catch (error) {
      this.showLoader = false;
      console.log(error);
    }
  }

  bankAccountForm = new FormGroup({
    accountNumber: new FormControl(
      '+9254545455545',
      Validators.compose([Validators.required, minLengthNumberValidator(5)])
    ),
    bankName: new FormControl('', Validators.compose([Validators.required])),
    accountHolderName: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
    branchName: new FormControl(''),
    ifscCode: new FormControl(
      '',
      Validators.compose([Validators.required, minLengthNumberValidator(5)])
    ),
    withdrawPin: new FormControl('',
      Validators.compose([Validators.required, minLengthNumberValidator(4)])
    ),
    // accountType: new FormControl(this.accountTypes[0].value, Validators.compose([Validators.required])),
    type: new FormControl(
      this.paymentOptions[0].value,
      Validators.compose([Validators.required])
    ),
  });

  get accountNumber() {
    return this.bankAccountForm.get('accountNumber');
  }
  get bankName() {
    return this.bankAccountForm.get('bankName');
  }
  get accountHolderName() {
    return this.bankAccountForm.get('accountHolderName');
  }
  get branchName() {
    return this.bankAccountForm.get('branchName');
  }
  get ifscCode() {
    return this.bankAccountForm.get('ifscCode');
  }
  get withdrawPin() {
    return this.bankAccountForm.get('withdrawPin');
  }
  get accountType() {
    return this.bankAccountForm.get('accountType');
  }
  get type() {
    return this.bankAccountForm.get('type');
  }
  changeTab(tab: any) {

    this.selectedTab = tab;
    if (this.showPin == 0 && this.selectedTab == 'add' && this.showPinOptions) {
      this.openCreatePinModal();
    }
  }
  selectedTab: any = 'existing';
  bnkId: any = '';
  selectedAccount: any = {};
  selectAccount(bank: any) {
    this.selectedAccount = bank;
    this.withDrawForm.controls.account.setValue(bank?.accountNo);
    this.withDrawForm.controls.accountHolder.setValue(bank?.accountHolderName);
    this.bnkId = bank.id;
  }

  loadBalance() {
    if (navigator.onLine == true && document.hidden == false) {
      this.walletService.loadBalance()
    }
  }
  // numberOnly(event): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }
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

  checkKYC() {
    this.showLoader = true;
    this.reportService
      .CheckKYC('WithDrawComponent')
      .then((data) => {
        if (data?.status == false) {
          if (data?.redirect == undefined) {
            this.showWithDrawForm = true;
            this.responseMessage = data?.message;
            this.toasterService.show(data?.message, {
              classname: 'bg-danger text-light',
              delay: 3000,
            });
          } else {
            this.toasterService.show(data?.message, {
              classname: 'bg-danger text-light',
              delay: 3000,
            });
            this.router.navigate([`/reports/${data?.redirect}`]);
          }
        } else {
          this.showWithDrawForm = false;
        }
      })
      .finally(() => (this.showLoader = false));
  }

  openCreatePinModal() {
    const dialogRef = this.dialog.open(CreatepinComponent, {
      width: '500px',
      maxWidth: '94vw',
      panelClass: 'login-dialog',
    });

    // Instead of .then(), use .afterClosed().subscribe()
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.showPin = 1
      } else {
        console.log('Dialog was closed without result');
      }
    });


  }

  openChangePinModal() {

    const dialogRef = this.dialog.open(ChangepinmodalComponent, {
      width: '500px',
      maxWidth: '94vw',
      panelClass: 'login-dialog',
    })

    // Instead of .then(), use .afterClosed().subscribe()
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog was closed with result:', result);
      } else {
        console.log('Dialog was closed without result');
      }
    });

  }
}
