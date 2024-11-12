import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { UtillsService } from '../../services/utills.service';

@Component({
  selector: 'app-popular-banners',
  templateUrl: './popular-banners.component.html',
  styleUrls: []
})
export class PopularBannersComponent implements OnInit {
  topPopularData: any[] = []
  cdnSportsLanding: string = '';
  defaultImage: string = '';
  isMagicwin: boolean = false

  constructor(
    public utillsService: UtillsService,
    private genericService: GenericService,
    private checkauthservice: CheckAuthService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.cdnSportsLanding = _window().bannercdnLanding;

    this.isMagicwin = _window().isMagicwin;
    if (_window().gameLoader) {
      this.defaultImage = _window().gameLoader;
    }
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.topPopularData = this.utillsService.returnFormatedData(d, 'TOP_Popular')
      }
    });
  }

  routeToLink(item: any) {
    if (
      !this.checkauthservice.IsLogin() &&
      item.link.includes('casino/detail')
    ) {
      this.genericService.openLoginModal();
    } else {
      this.router.navigate([item.link]);
    }
  }
}
