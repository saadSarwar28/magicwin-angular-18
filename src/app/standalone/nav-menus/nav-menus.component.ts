import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UtillsService } from '../../services/utills.service';
import { _window } from '../../services/backend.service';
import { SkeletonLoaderComponent } from '../sekeleton-loader/sekeleton-loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menus',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule, SkeletonLoaderComponent],
  templateUrl: './nav-menus.component.html',
  styleUrl: './nav-menus.component.scss'
})
export class NavMenusComponent implements OnInit{
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
