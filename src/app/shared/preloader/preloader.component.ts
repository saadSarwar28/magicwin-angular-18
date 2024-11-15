import { Component, OnInit } from '@angular/core';
import { _window } from '../../services/backend.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  siteLoader: any = '';
  isIframe: boolean = false;
  constructor(
    private platformService: PlatformService
  ) {
    if (this.platformService.isBrowser()) {

      if (_window().siteLoader) {
        this.siteLoader = _window().siteLoader;
      }
      if (_window().isIframe) {
        this.isIframe = _window().isIframe;
      }
    }
  }

  ngOnInit(): void {
  }

}
