import { Component, OnInit } from '@angular/core';

import { BackendService, CasinoRequest } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GamePopupService } from '../services/game-popup.service';
import { GenericService } from '../services/generic.service';
@Component({
  selector: 'app-game-popup',
  templateUrl: './game-popup.component.html',
  styleUrls: ['./game-popup.component.css']
})
export class GamePopupComponent implements OnInit {
  data: any = {}
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
    private toastService: ToastService,
    private genericService: GenericService,
    private sportservice: BackendService,
    private deviceService: DeviceDetectorService,

  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.loadCasino(
        this.data.provider,
        this.data.gameId,
        this.data.tableId
      )
    }

  }


  closeModal() {
    this.genericService.closeGameModal()
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
        undefined
      )
      .then((x) => {
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
      .catch((err) => {
        this.toastService.show((this.gameInvalidTokenMsg.description ?? err), {
          classname: 'bg-danger text-light',
          delay: 1500,
        });

        if (err.status == 401) {
          this.genericService.openLoginModal();
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        // document.getElementById("overlay-loader")!.style.display = "none";
        setTimeout(() => {
          this.loading = false;
          this.iframeLoad = true;
        }, 500);
      });
  }

  loadIframe() {
    setTimeout(() => {
      this.iframeLoad = true;
    }, 1000);
  }
}
