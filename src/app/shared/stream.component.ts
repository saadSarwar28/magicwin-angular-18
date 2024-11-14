import { Component, Input, OnInit } from '@angular/core';
import { UtillsService } from '../services/utills.service';
import { ToastService } from '../services/toast.service';
import { _window, BackendService } from '../services/backend.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../pipes/safe.pipe';

@Component({
  selector: 'app-stream',
  template: `<div class="liveStreamWrapper">
                <div class="tvWrapper" aria-expanded="true" aria-controls="stream">
                  <div class="tv-screen">
                  <i class="bi bi-broadcast fs-16"></i>
                    <span class="ls match-text">{{
                      "Watch Live Match" | translate
                      }}</span>
                  </div>
                  <button class="live-stream-button" *ngIf="!toggleLiveShow"
                    (click)="this.toggleLiveShow = true;">
                    {{ "watchlive" | translate }}
                  </button>
                  <span *ngIf="toggleLiveShow" (click)="toggleLiveTV()">
                    <button class="live-stream-button">
                    <i class="bi bi-x"></i></button></span>
                </div>
                <div id="stream" class="rwd-media" *ngIf="src && toggleLiveShow">
                  <iframe [src]="src | safe" width="100%" scrolling="no" frameborder="0"
                    style="overflow: hidden"></iframe>
                </div>
                <div id="stream" *ngIf="this.srcData?.status === false && srcData?.channelId">
                  <p class="text-center">{{ "streamerror" | translate }}</p>
                </div>
              </div>
  `,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    SafePipe
  ]
})
export class StreamComponent implements OnInit {
  srcData: any;
  src: any;
  toggleLiveShow: any = true;
  @Input() eventId: any;
  @Input() inPlay: any;

  constructor(
    private sportService: BackendService,
    private utillsService: UtillsService,
    private toasterService: ToastService
  ) { }
  getIPAddress: any = '';
  ngOnInit(): void {
    this.utillsService.ipaddress.subscribe((data: any) => {
      if (data) {
        this.getIPAddress = data;
      }
    });

    this.getStreamData();
  }
  toggleLiveTV() {
    this.toggleLiveShow = false;
  }
  channel: any = '';
  getStreamData() {
    if (this.srcData == undefined) {
      if (isNaN(this.eventId)) {
        this.eventId = this.eventId;
      }
      this.sportService.TvOnBookmaker(parseInt(this.eventId || 0))
        .subscribe((resp) => {
          if (resp) {
            this.srcData = resp;
            this.channel = this.srcData.channelId;
            this.getStream();
          }
        })

    }
  }

  getStream() {
    if (this.channel && this.getIPAddress) {
      this.src =
        _window().streamurl + `chid=${this.channel}&ip=${this.getIPAddress}`;
    }
    this.toggleLiveShow = false;
  }
}
