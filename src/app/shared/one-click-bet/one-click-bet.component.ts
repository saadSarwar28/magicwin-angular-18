import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { StorageService } from '../../services/storage.service';
import { UtillsService } from '../../services/utills.service';
@Component({
  selector: 'app-one-click-bet',
  templateUrl: './one-click-bet.component.html',
  styleUrls: ['./one-click-bet.component.scss'],
})
export class OneClickBetComponent implements OnInit {
  ocbButonsArray: any;
  OCBEnabled: boolean = false;
  selectedOCBValue: any;
  @Output() oneClickEmit: EventEmitter<any> = new EventEmitter();
  constructor(
    private checkauthservice: CheckAuthService,
    private storageService: StorageService,
    private utilsService: UtillsService
  ) {
    this.ocbButonsArray = this.checkauthservice.getstaks();
    //
    this.OCBEnabled =
      this.storageService.secureStorage.getItem('OCB') == null
        ? false
        : this.storageService.secureStorage.getItem('OCB');
    if (this.storageService.secureStorage.getItem('OCBSelectedVal') === null) {
      this.storageService.secureStorage.setItem(
        'OCBSelectedVal',
        this.ocbButonsArray.stakeVal1
      );
    }
    this.selectedOCBValue =
      this.storageService.secureStorage.getItem('OCBSelectedVal');
    let valueExist = false;
    for (let key in this.ocbButonsArray) {
      if (key.startsWith('stakeVal')) {
        if (this.selectedOCBValue == this.ocbButonsArray[key]) {
          valueExist = true;
          break;
        }
      }
    }
    if (!valueExist) {
      this.storageService.secureStorage.setItem(
        'OCBSelectedVal',
        this.ocbButonsArray.stakeVal1
      );
      this.selectedOCBValue =
        this.storageService.secureStorage.getItem('OCBSelectedVal');
    }

    this.utilsService.OCBEnabled.next(this.OCBEnabled);
  }

  ngOnInit(): void { }
  OCBSetting() {

    this.OCBEnabled = !this.OCBEnabled;
    this.storageService.secureStorage.setItem('OCB', this.OCBEnabled);
    this.utilsService.OCBEnabled.next(this.OCBEnabled);
    if (!this.OCBEnabled) {
      this.oneClickEmit.emit();
    }
  }
  OCBSettingValue(e: any) {
    if (e.target.checked) {
      this.selectedOCBValue = e.target.value;
    }
  }

  save() {
    this.storageService.secureStorage.setItem(
      'OCBSelectedVal',
      this.selectedOCBValue
    );
    this.oneClickEmit.emit();
  }

}
