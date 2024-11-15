import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import videojs from 'video.js';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-video-player-tut',
  templateUrl: './video-player-tut.component.html',
  styleUrls: ['./video-player-tut.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class VideoPlayerComponentTut implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;
  @Input()
  options!: {
    fluid: boolean;
    autoplay: boolean;
    controls: boolean;
    responsive: boolean;
    poster: string;
    sources: {
      src: string;
      type: string;
    }[];
  };
  @Input() height: string = ''
  id: string = ''
  player: any
  //  videojs.Player | undefined;
  constructor(
    private elementRef: ElementRef,
    private platformService: PlatformService
  ) { }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  ngOnInit() {
    if (this.platformService.isBrowser()) {

      this.id = this.uid();
      this.player = videojs(this.target.nativeElement, { ...this.options, autoplay: false }, () => {
      });
    }
  }

  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

}
