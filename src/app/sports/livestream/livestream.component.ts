
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { TimerService } from '../../services/timer.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { _window } from '../../services/backend.service'
import { StorageService } from 'src/app/services/storage.service';
declare function iFrameResize(): any;
@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
      .then((resp) => {
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
      .catch((err) => {
        if (err.status == 401) {
          this.timerService.clearTimer();
          this.storageService.secureStorage.removeItem('token');
          window.location.href = window.location.origin

        } else {
          console.log(err)
        }
      })
      .finally(() => (this.showLoader = false));
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
