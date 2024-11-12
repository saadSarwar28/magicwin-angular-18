import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from "../../services/generic.service";
import { ProviderModalComponent } from "../../shared/provider-modal/provider-modal.component";
import { UtillsService } from "../../services/utills.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { _window, BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-casino-filter-menus',
  templateUrl: './casino-filter-menus.component.html',
  styleUrls: ['./casino-filter-menus.component.scss'],
})
export class CasinoFilterMenusComponent implements OnInit {
  providersData: any[] = [];
  toggleGamePro: boolean = true;
  toggleCasinoPro: boolean = true;
  min: number = 0;
  max: number = 0;
  casinosArr: any[] = [];
  casinosShown: any[] = []
  constructor(
    private sportservice: BackendService,
    private router: Router,
    private genericModalService: GenericService,
    private deviceService: DeviceDetectorService,
    private utillsService: UtillsService,
    private bottomSheet: MatBottomSheet

  ) { }
  deviceInfo: any;
  tableId: string | undefined;
  providerModalArr: string[] = [];
  tempCasino: any;
  allProviders: any[] = [];
  providersShown: any[] = []
  ngOnInit(): void {
    if (_window().providerModalArr) {
      this.providerModalArr = typeof (_window().providerModalArr) == 'string' ? JSON.parse(_window().providerModalArr) : _window().providerModalArr
    }
    this.sportservice
      .casinoProviders()
      .then((res: any) => {
        if (res) {
          this.allProviders = [];
          this.providersData = res;
          for (const iterator of this.providersData) {
            for (const item of iterator.data) {
              this.allProviders.push(item);
            }
          }
          if (this.deviceService.isMobile(navigator.userAgent)) {
            this.providersShown = this.allProviders.slice(0, 10)
          } else {
            this.providersShown = this.allProviders
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          // this.loading = false;
        }, 500);
      });

    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        let arr: any = Array.from(resp).filter((x: any) => x.type === "CasinoNav")
        if (arr && arr.length > 0 && arr[0].data && arr[0].data.length > 0) {
          this.casinosArr = arr[0].data
        }
        if (this.deviceService.isMobile(navigator.userAgent)) {
          this.casinosShown = this.casinosArr.slice(0, 10)
        } else {
          this.casinosShown = this.casinosArr
        }
      }
    })

    if (!this.deviceService.isMobile(navigator.userAgent)) {
      this.toggleGamePro = false
      this.toggleCasinoPro = false
    }
  }

  closeModal() {
    this.bottomSheet.dismiss();
  }

  routeToGame(link: string) {
    this.closeModal();
    this.router.navigate([link]);
  }

  // stopPropogation(event:any){
  //   console.log("event",event)
  //   event.stopPropagation();
  // }

  routeToCasino(casino: any) {
    //
    this.closeModal();
    this.tempCasino = casino;
    if (this.providerModalArr.includes(casino.abbr)) {
      this.openProviderModal();
      return;
    }
    this.navigateToGame();
  }

  navigateToGame() {
    let casino: any = this.tempCasino;
    if (casino.abbr == 'BF') {
      this.router.navigate(['/games']);
    } else if (casino.direct) {
      this.router.navigate(['/casino/detail/' + casino.abbr]);
    } else {
      this.router.navigate(['/casino/providers/' + casino.abbr]);
    }
    this.closeModal();
  }

  openProviderModal() {
    this.genericModalService.openPopup(
      ProviderModalComponent,
      { marketId: null, marketName: null },
      'medium-popup',
      (value: any) => this.handleProviderModal(value)
    )
  }

  handleProviderModal(value: boolean) {
    if (value) {
      this.navigateToGame();
    }
  }

  toggleProviders() {
    if (this.providersShown.length == this.allProviders.length) {
      this.providersShown = this.allProviders.slice(0, 10)
    } else {
      this.providersShown = this.allProviders
    }
  }

  toggleGameTypes() {
    if (this.casinosShown.length == this.casinosArr.length) {
      this.casinosShown = this.casinosArr.slice(0, 10)
    } else {
      this.casinosShown = this.casinosArr
    }
  }
}
