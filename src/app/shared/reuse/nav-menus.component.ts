import { Component, Input, OnInit, } from '@angular/core';
import { _window } from '../../services/backend.service';
import { UtillsService } from '../../services/utills.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SkeltonLoaderComponent } from '../skelton-loader/skelton-loader.component';

@Component({
  selector: 'app-nav-menus',
  template: `
    <div class="navbar-menu" *ngIf="navMenus && navMenus.length>0">
      <a *ngFor="let item of navMenus" class="fs-lap-12 sm-fs-13 pointer menu-item" (click)="routeToLink(item)">
        <img class="image" height="22" [src]="cdnSportsLanding + 'banners/' + item.id + '.png'"
             [alt]="item.text + '_'+ sitename"/>
        {{ item.text | translate }}
      </a>
    </div>
    <ng-container *ngIf="utillsService.skeltonLoaderForMobi | async">
      <app-skelton-loader [loaderType]="'navMenus'"></app-skelton-loader>
    </ng-container>
  `,
  styles: [``],
  standalone: true,
  imports: [TranslateModule, CommonModule, SkeltonLoaderComponent]
})
export class NavMenusComponent implements OnInit {
  @Input() navMenus: any;
  cdnSportsLanding: string = ''
  sitename: string = ''

  constructor(public utillsService: UtillsService) {
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.sitename = _window().sitename;
  }

  ngOnInit(): void {
  }

  routeToLink(item: any) {
    this.utillsService.routeToLink(item)
  }

}
