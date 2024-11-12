import { Component, OnInit } from '@angular/core';
import { _window } from 'src/app/services/backend.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  siteLoader: any = '';
  isIframe: boolean = false;
  constructor() {
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
    if (_window().isIframe) {
      this.isIframe = _window().isIframe;
    }
  }

  ngOnInit(): void {
  }

}
