import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtillsService } from '../../services/utills.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CheckAuthService } from '../../services/check-auth.service';
import { GenericService } from '../../services/generic.service';
import { _window } from '../../services/backend.service';
import { SkeletonLoaderComponent } from '../sekeleton-loader/sekeleton-loader.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-gameslider',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SkeletonLoaderComponent, CarouselModule],
  templateUrl: './gameslider.component.html',
  styleUrl: './gameslider.component.scss'
})
export class GamesliderComponent implements OnInit, OnChanges {
  cdnSportsLanding: string = '';
  sitename: string = '';
  @Input() popularGamesData: any = [];
  @Input() isMobile :boolean  = false;
  isMagicwin: boolean = true;
  sliderAutoPlay: boolean = false;
  sliderArrowUrl:string = 'https://iriscdn.b-cdn.net/kheloyaar360.net/bannerArrow.svg';
  showSliderArrowBtn:boolean = false;
  constructor(
    public utillsService: UtillsService,
    private router: Router,
    private checkauthservice: CheckAuthService,
    private genericService: GenericService
  ) {}
  customOptions1: any;

  repeatedItems(items: any, count: number): any[] {
    if (items?.length >= 8) {
      return items;
    } else {
      const repeated: any[] = [];
      for (let i = 0; i < count; i++) {
        repeated.push(items[i % items.length]);
      }
      return repeated;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['popularGamesData']) {
      this.popularGamesData = this.popularGamesData;
    }
  }
  defaultImage: string = '';
  ngOnInit(): void {
    if (_window().gameSliderAutoPlay) {
      this.sliderAutoPlay = _window().gameSliderAutoPlay;
    }
    if (_window().sliderArrowUrl) {
      this.sliderArrowUrl = _window().sliderArrowUrl;
    }
    if (_window().showSliderArrowBtn) {
      this.showSliderArrowBtn = _window().showSliderArrowBtn;
    }
    this.customOptions1 = {
      loop: this.sliderAutoPlay,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 800,
      autoplay: this.isMobile ? false : this.sliderAutoPlay,
      merge: true,
      margin: 8,
      center: false,
      autoWidth: false,
      fluidSpeed: true,
      smartSpeed: 3000,
      navText: [
        `<img src="${this.sliderArrowUrl}" alt="Previous" />`,
        `<img src="${this.sliderArrowUrl}" alt="Next" />`,
      ],
      responsive: {
        0: {
          items: 3.5,
        },
        600: {
          items: 5,
        },
        1000: {
          items: 6,
        },
        1200: {
          items: 8,
        },
      },
      nav: this.showSliderArrowBtn,
    };
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.sitename = _window().sitename;
    this.isMagicwin = _window().isMagicwin;
    if (_window().gameLoader) {
      this.defaultImage = _window().gameLoader;
    }
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
