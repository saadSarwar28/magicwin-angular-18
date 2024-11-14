import { Component, Input, OnInit, } from '@angular/core';
import { _window } from '../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-download-app-modal',
  template: `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-icon xcross-img">
          <img (click)="downloadIconClose()" src="https://iriscdn.b-cdn.net/kheloyar/Xcross.svg" alt="" />
        </div>
        <a [href]="appLinkLive">
          <img width="100%" [src]="appLinkPopupImg" alt="" />
        </a>
      </div>
    </div>
  `,
  styles: [`
    .close-icon {
      height: 16px !important;
    }
    .xcross-img {
      position: absolute;
      right: 5px;
      top: 14px;
    cursor: pointer;
    height: 33px;
    width: 37px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class DownloadAppModalComponent implements OnInit {
  @Input() navMenus: any;
  cdnSportsLanding: string = ''
  appLinkLive: any = 'https://magicwin1.app/game';
  appLinkPopupImg: string = '';

  constructor(
    private dialog: MatDialog
  ) {
    this.cdnSportsLanding = _window().bannercdnLanding;
    if (_window().appLinkPopupImg) {
      this.appLinkPopupImg = _window().appLinkPopupImg;
    }
    if (_window().appLinkLive) {
      this.appLinkLive = _window().appLinkLive;
    }


  }

  ngOnInit(): void { }

  downloadIconClose() {
    this.dialog.closeAll()
  }

}
