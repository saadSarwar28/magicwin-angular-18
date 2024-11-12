import { Component, Input, OnInit } from '@angular/core';
import { _window } from '../services/backend.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.scss'],
})
export class CelebritiesComponent implements OnInit {
  @Input() landingVideos: any;
  isMagicwin: boolean = false;
  cdnUrl: string = '';
  cdnSportsLanding: string = '';
  constructor() {}

  ngOnInit(): void {
    this.isMagicwin = _window().isMagicwin;
    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    this.cdnSportsLanding = _window().bannercdnLanding;
  }

 
}
