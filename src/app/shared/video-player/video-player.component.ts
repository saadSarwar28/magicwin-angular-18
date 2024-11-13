import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
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
  @Input() endors: boolean = true
  id: string = ''
  player: any
  // videojs.Player;
  constructor(
    private elementRef: ElementRef,
  ) { }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  ngOnInit() {
    this.id = this.uid();
    this.player = videojs(this.target.nativeElement, { ...this.options, autoplay: false }, () => {
    });
  }

  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

}
