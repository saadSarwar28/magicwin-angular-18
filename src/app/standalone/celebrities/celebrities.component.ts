import { PlatformService } from './../../services/platform.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { _window } from '../../services/backend.service';
import { TranslateModule } from '@ngx-translate/core';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-celebrities',
  standalone: true,
  imports: [CommonModule, RouterModule, VideoPlayerComponent, TranslateModule, SafePipe],
  templateUrl: './celebrities.component.html',
  styleUrl: './celebrities.component.scss'
})
export class CelebritiesComponent implements OnInit {
  @Input() landingVideos: any;
  isMagicwin: boolean = false;
  cdnUrl: string = '';
  cdnSportsLanding: string = '';
  isBrowser = false
  constructor(
    private PlatformService: PlatformService,
  ) {}

  ngOnInit(): void {
    if (this.PlatformService.isBrowser()) {
      this.isBrowser = true
      this.isMagicwin = _window().isMagicwin;
      if (_window().cdnImagesUrl) {
        this.cdnUrl = _window().cdnImagesUrl;
      }
      this.cdnSportsLanding = _window().bannercdnLanding;
    }
  }

}
