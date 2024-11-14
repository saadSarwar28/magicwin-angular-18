import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { _window } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { StorageService } from '../../services/storage.service';
import videojs from 'video.js';
import { ModalService } from '../../shared/services/modal.service';
import { VideoModalService } from '../../shared/services/video-modal.service';
import { UtillsService } from '../../services/utills.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class VideoModalComponent implements OnInit {

  isLogin: boolean = false;
  lsItem: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  iframeurl = 'https://iriscdn.b-cdn.net/kheloyar/tutvideo/signupVid.mp4'
  constructor(private storageService: StorageService, private checkauthservice: CheckAuthService,
    @Inject(DOCUMENT) private document: Document,
    private modalService: VideoModalService, private utillsService: UtillsService,
  ) { }
  @Input()!data: any;
  options: any;
  videoLink: string = '';
  posterLink: string = '';

  tutorialVideoArr: any = []
  cdnSportsLanding: string = '';
  ngOnInit(): void {
    this.cdnSportsLanding = _window().bannercdnLanding;
    // this.utillsService.bannerData.subscribe((d: any) => {
    //   if (d) {
    //     this.tutorialVideoArr = Array.from(d).filter(
    //       (x: any) => x.type === 'tutorialVideoArr'
    //     );
    //     this.tutorialVideoArr = this.tutorialVideoArr[0]?.data;
    //   }
    // });
    if (this.data) {
      this.tutorialVideoArr = this.data

    }

  }

  closeModal() {
    this.modalService.close()
  }
}
