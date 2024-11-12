import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { _window } from 'src/app/services/backend.service';

@Component({
  selector: 'reports-top-nav',
  templateUrl: './reports-top-nav.component.html',
  styleUrls: ['./reports-top-nav.component.scss']
})
export class ReportsTopNavComponent implements OnInit {
  showMenu = true;
  isIframe: boolean = false;
  navLinks: any = [];
  constructor(private router: Router,) {
    this.router.events.subscribe((v) => {

      if (v instanceof NavigationEnd) {
        if (v.url.startsWith("/games") || v.url.startsWith("/sports") || v.url.startsWith("/casino") || v.url == "/sports/livestream") {
          this.showMenu = false;
        }
      }
    })
  }

  ngOnInit() {
    if (_window().isIframe) {
      this.isIframe = _window().isIframe;
    }
    this.navLinks = [
      { name: "accountstatement", routerLink: "/reports/accountstatement", isShow: true },
      { name: "sportsbets", routerLink: "/reports/sportsbets", isShow: true },
      { name: "casinobets", routerLink: "/reports/casinobets", isShow: this.isIframe ? false : true },
      { name: "fancybets", routerLink: "/reports/fancybets", isShow: true },
      { name: "profitandloss", routerLink: "/reports/plstatement", isShow: true },
      { name: "changepassword", routerLink: "/reports/changepassword", isShow: this.isIframe ? false : true },
      { name: "activitylogs", routerLink: "/reports/activitylogs", isShow: true },
      { name: "results", routerLink: "/reports/results", isShow: true },
      { name: "stakebuttons", routerLink: "/reports/stakebuttons", isShow: true }
    ];
  }

}
