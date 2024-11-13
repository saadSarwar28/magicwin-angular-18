import { Component, OnInit } from '@angular/core';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';

@Component({
  selector: 'app-sports-nav',
  templateUrl: './sports-nav.component.html',
  styleUrls: []
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
