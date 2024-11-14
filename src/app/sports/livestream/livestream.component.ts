
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { TimerService } from '../../services/timer.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service'
import { StorageService } from '../../services/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';
declare function iFrameResize(): any;
@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    SafePipe
  ]
})
export class LivestreamComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      iFrameResize();
    }, 5000);
  }
  data: any;
  ip: string = '';
  safeUrl: any = '';
  showLoader = false;
  teamName: any;
  eventIds: any[] = [];
  source: any;
  interval: any;
  constructor(
    private sportsService: BackendService,
    private storageService: StorageService,
    private timerService: TimerService,
  ) {
    if (_window().livestreamtimer) {
      this.interval = _window().livestreamtimer;
    }
  }

  ngOnInit(): void {
    this.getLiveStream();
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
  }

  getLiveStream() {
    this.showLoader = true;

    this.sportsService
      .GetTv()
      .subscribe((resp) => {
        this.showLoader = false
        if (resp) {
          if (resp.ipAddress) this.ip = resp.ipAddress;
          this.data = resp.data;
          this.data.forEach((element: { name: string; }) => {
            if (element.name == "Soccer") {
              element.name = 'Football'
            }
          });
          this.data?.forEach((x: any) => {
            x.childs.forEach((competition: any) => {
              competition.childs.forEach((x: any) => {
                if (x.channelId.length > 0) {
                  this.eventIds.push(Number(x.id));
                }
              });
            });
          });
        }
      })

  }


  getStream(id: string, ip: string) {
    this.safeUrl = _window().streamurl + `chid=${id}&ip=${ip}`;
    this.toggleLiveShow = true;
  }
  toggleLiveShow: any = false
  toggleLiveTV() {
    this.toggleLiveShow = false;
    this.safeUrl = ''
  }
}
