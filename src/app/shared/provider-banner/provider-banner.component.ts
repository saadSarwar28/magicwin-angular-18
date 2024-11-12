import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { _window } from 'src/app/services/backend.service';
import { UtillsService } from 'src/app/services/utills.service';

@Component({
  selector: 'app-provider-banner',
  templateUrl: './provider-banner.component.html',
  styleUrls: ['./provider-banner.component.scss'],
})
export class ProviderBannerComponent implements OnInit {
  @Input() bannerData: any;
  cdnSportsLanding: string = '';
  constructor(private router: Router, public utillsService: UtillsService) {
    this.cdnSportsLanding = _window().bannercdnLanding;
  }

  ngOnInit(): void {}

  routeToMulti(item: any) {
    if (this.isWhatsAppLink(item?.link)) {
      if (item?.link.includes('+')) {
        window.open('https://wa.me/' + item.link, '_blank');
      } else {
        this.router.navigateByUrl(item.link);
      }
    } else {
      this.utillsService.routeToLink(item);
    }
  }

  isWhatsAppLink(link: any) {
    if (
      link.includes('http') ||
      link.includes('.t.me') ||
      link.startsWith('+')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
