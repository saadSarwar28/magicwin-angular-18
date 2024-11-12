import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtillsService } from 'src/app/services/utills.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  constructor(
    private utillsService: UtillsService,
    private router: Router,

  ) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.setRouteData();
  }
  setRouteData() {
    this.utillsService.configData.subscribe((data) => {
      if (data) {
        let routerLink = this.utillsService.depositLink
        this.router.navigate([routerLink]);
      }

    })
  }

}
