import { Component, OnInit } from '@angular/core';
import { CheckAuthService } from "../../services/check-auth.service";
import { Router } from "@angular/router";
import { GenericService } from "../../services/generic.service";
import { _window } from "../../services/backend.service";
import { UtillsService } from "../../services/utills.service";

@Component({
  selector: 'app-casino-banners',
  template: `
    <div class="image-container" >
      <img *ngFor="let item of data" (click)="route(item.link)"
           [src]="bannerCdn + '/banners/' + item.id + '.png'" alt="Image 1" class="img-card" width="100%" draggable="false">
    </div>
  `,
  styles: [
    `
      .image-container {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 0px;
        overflow-x: scroll;
        scrollbar-width: none;
      }

      .img-card {
        width: 33.3%;
        min-width: 350px;
        cursor: pointer;
      }
    `
  ]
})
export class CasinoBannersComponent implements OnInit {

  data: any
  bannerCdn = ''

  constructor(
    private authService: CheckAuthService,
    private router: Router,
    private genericPopUpService: GenericService,
    private utilsService: UtillsService
  ) {
  }

  ngOnInit(): void {
    // if (_window().banner1) {
    //   this.data = _window().banner1
    //   console.log(this.data)
    // }

    if (_window().bannercdnLanding) {
      this.bannerCdn = _window().bannercdnLanding
    }

    this.utilsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.data = this.utilsService.returnFormatedData(d, 'casino banner')
        // Array.from(d).filter(
        //   (x: any) => x.type ===
        // )
      }
    })
  }

  route(link: string) {
    if (this.authService.IsLogin()) {
      this.router.navigate([link])
    } else {
      this.genericPopUpService.openLoginModal()
    }
  }

}
