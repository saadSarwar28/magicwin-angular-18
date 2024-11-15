import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { GenericService } from '../services/generic.service';
import { BackendService, CasinoRequest } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { iFrameResizer } from '../../assets/lmtScore/sports-radar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../services/platform.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css'],
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class ModalComponentComponent implements OnInit {
  loading = true;
  iframeurl: any;
  isDetail = false;
  marginToShowProductsTab: boolean = false;
  deviceInfo: any;
  iframeLoad: boolean = false;
  isLoggedIn: boolean = false;
  providerCode: string = '';
  gameId: string | undefined = '';
  tableId: string | undefined;
  listener: any;
  getHeight: any = 0;
  currentPlatform: any = '';
  winOrMob: any = '';
  PlatformOS: any = '';
  showMsg: any = '';
  showWhatsapp: boolean = true;
  previousRoute!: string;
  isGameError!: boolean;
  gameInvalidTokenMsg!: any;
  isLobby!: boolean;
  type: any;
  constructor(
    private modalService: ModalService,
    private toastService: ToastService,
    private genericService: GenericService,
    private sportservice: BackendService,
    private deviceService: DeviceDetectorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialog,
    private platformService: PlatformService

  ) {
    if (this.platformService.isBrowser()) {

      setTimeout(() => {

        this.loading = false;
        iFrameResizer('state')
      }, 1500);
    }
  }
  getPlatform() {
    var platform = ["Win32", "Android", "iOS"];

    for (var i = 0; i < platform.length; i++) {

      if (navigator.platform.indexOf(platform[i]) > - 1) {

        this.winOrMob = platform[i];
      }
    }
  }
  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      if (this.data) {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.loadCasino(
          this.data.provider,
          this.data.gameId,
          this.data.tableId
        )
      }
      this.getPlatform()
      this.deviceInfo = this.deviceService.getDeviceInfo();
      // alert(this.deviceInfo.browser);
      this.currentPlatform = this.deviceInfo.browser;
      this.PlatformOS = this.deviceInfo.os;
    }
  }




  closeModal() {
    this.dialogRef.closeAll();
  }


  loadCasino(providerCode: string, gameId: string | undefined, tableId?: string | undefined) {
    this.sportservice.gameUrl = undefined;

    this.sportservice
      .sSCasino_POST(
        new CasinoRequest(
          providerCode,
          undefined,
          gameId,
          !this.isLoggedIn,
          this.deviceInfo.deviceType,
          undefined,
          tableId
        ),

      )
      .subscribe((x) => {
        if (x.url) {
          this.loading = true;
          this.iframeurl = x.url;
          if (this.isLobby && this.providerCode == 'QTC' && this.type == 'live') {
            this.iframeurl += '/games/wl-liveCasinoGames/wl.games.liveCasinoGames';
          }
        } else {
          this.toastService.show(Object.keys(x.msg).length > 0 ? x.msg.message || x.msg : x.msg || x.message, {
            classname: 'bg-danger text-light',
            delay: 5000
          });
          let checkObject = typeof x.msg === 'object';
          let message = '';
          if (checkObject) {
            message = x.msg.message
          }
          else if (x.message) {
            message = x.message
          }
          else {
            message = x.msg
          }
          if (this.gameInvalidTokenMsg) {
            this.showMsg = this.gameInvalidTokenMsg.description;
            this.isGameError = false;
          } else {
            this.isGameError = true;
            this.showMsg = message;
          }

        }
      })

  }

  loadIframe() {
    setTimeout(() => {
      this.iframeLoad = true;
    }, 1000);
  }
}
