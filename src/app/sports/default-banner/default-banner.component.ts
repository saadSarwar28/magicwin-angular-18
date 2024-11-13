import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import { _window } from '../../services/backend.service';
import { UtillsService } from 'src/app/services/utills.service';
@Component({
  selector: 'app-default-banner',
  templateUrl: './default-banner.component.html',
  styleUrls: ['./default-banner.component.scss'],
})
export class DefaultBannerComponent implements OnInit {
  bannerurl: any;
  isCheckUrl: boolean | undefined;
  cdnSportsSrc: any;
  active: number | undefined = 0;
  bannerData;
  activeSlides: SlidesOutputData | undefined;
  carouselOptions: any;
  defaultImage: any;
  sitename: string = '';
  isMultipleBanner: boolean = false;
  constructor(private router: Router, public utillsService: UtillsService) {
    if (_window().gameLoader) {
      this.defaultImage = _window().gameLoader;
    }
    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    if (_window().isMultipleBanner) {
      this.isMultipleBanner = _window().isMultipleBanner;
    }
    

    this.carouselOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay: true,
      navSpeed: 700,

      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1024: {
          items: this.isMultipleBanner ? 3 : 1,
        },
        1200: {
          items: this.isMultipleBanner ? 3 : 1,
        },
      },
    };
  }

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

  cdnSportsLanding: string = '';
  ngOnInit() {
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        if (window.innerWidth < 768) {
          this.bannerData = this.utillsService.returnFormatedData(d, 'Mbanner');
        } else {
          this.bannerData = this.utillsService.returnFormatedData(d, 'banner');
        }
      }
    });
    this.cdnSportsLanding = _window().bannercdnLanding;
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
