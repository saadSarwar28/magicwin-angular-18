import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonLoaderComponent } from '../sekeleton-loader/sekeleton-loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtillsService } from '../../services/utills.service';
import { _window } from '../../services/backend.service';

@Component({
  selector: 'app-sports-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonLoaderComponent,
    TranslateModule,
  ],
  templateUrl: './sports-nav.component.html',
  styleUrl: './sports-nav.component.scss',
})
export class SportsNavComponent implements OnInit {
  sportsNavData: any[] = []
  casinoNavData: any[] = []
  cdnSportsLanding: string = '';
  isMagicwin: boolean = false

  constructor(
    public utillsService: UtillsService
  ) { }

  ngOnInit(): void {
    this.cdnSportsLanding = _window().bannercdnLanding;

    this.isMagicwin = _window().isMagicwin;
    this.utillsService.bannerData.subscribe((d: any) => {
      if (d) {
        this.sportsNavData = this.utillsService.returnFormatedData(d, 'Sports_NAV')
        this.casinoNavData = this.utillsService.returnFormatedData(d, 'Casino_NAV')
      }
    });
  }

  routeToLink(item: any) {
    this.utillsService.routeToLink(item)
  }

}
