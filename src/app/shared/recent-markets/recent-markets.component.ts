import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RecentMarketsService } from "../../services/recent-markets.service";


@Component({
  selector: 'app-recent-markets',
  templateUrl: './recent-markets.component.html',
  styleUrls: ['./recent-markets.component.scss'],
})
export class RecentMarketsComponent implements OnInit {

  data: any[] = []

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private recentMarkets: RecentMarketsService
  ) { }

  ngOnInit() {
    this.data = this.recentMarkets.getRecentMarkets()
  }

  closeModal() {
    this.bottomSheet.dismiss();
  }

  routeToMarket(url: string) {
    this.router.navigate([url])
    this.closeModal()
  }
}
