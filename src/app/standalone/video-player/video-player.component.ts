import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
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
  player!: any;

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() { }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  private initializeVideoPlayer(): void {
    this.player = videojs(this.target.nativeElement, {
      ...this.options, autoplay: false
    });
  }


  ngOnInit() {
    this.id = this.uid();
    // console.log(this.options.sources[0].src.includes('http'), ' <<<<<<<<<< options here')
    // this.player = videojs(this.target.nativeElement, { ...this.options, autoplay: false }, () => {
    // });
    if (this.isBrowser && this.options.sources[0].src.includes('http')) {
      this.initializeVideoPlayer();
    }
  }

  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

}
