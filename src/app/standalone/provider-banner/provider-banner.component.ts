import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-provider-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './provider-banner.component.html',
  styleUrl: './provider-banner.component.scss'
})
export class ProviderBannerComponent {
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
