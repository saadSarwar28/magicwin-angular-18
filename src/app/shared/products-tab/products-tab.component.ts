import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  BackendService,
  CasinoRequest,
  _window,
} from 'src/app/services/backend.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { ToastService } from 'src/app/services/toast.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.css'],
})
export class ProductsTabComponent implements OnInit {
  deviceInfo: any;
  navOpen: boolean = false;
  ele: HTMLElement | undefined;
  constructor(
    public router: Router,
    private toastService: ToastService,
    private checkauthservice: CheckAuthService,
    private deviceService: DeviceDetectorService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit(): void { }

  loadSportsBook() {
    if (!this.checkauthservice.IsLogin()) {
      this.toastService.show('Login to view games', {
        classname: 'bg-danger text-light',
        delay: 1500,
      });

    } else {
      let sportsBookNew = typeof (_window().sportsbookParameter) == 'string' ? JSON.parse(_window().sportsbookParameter) : _window().sportsbookParameter
      this.router.navigate([
        `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid
        }`,
      ]);
      return;
    }
  }

  ngAfterViewInit() {
    // var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, {
    //   draggable: false,
    //   preventScrolling: true,
    //   onCloseEnd: () => {
    //     console.log('close');
    //     this.navOpen = false;
    //   },
    //   onOpenStart: () => {
    //     console.log('opesadasdn');
    //     this.navOpen = true;
    //     if (this.ele?.style.display === 'block') {
    //       this.ele.style.display = 'none';
    //     }
    //   },
    // });
  }

  sidenavclose() {
    // console.warn('called');
    if (this.navOpen) {
      var elems = document.querySelector('#nav-mobile');

      var instances = M.Sidenav.getInstance(elems);

      instances.close();
      // this.navOpen = false;
      //
    }
  }
}
