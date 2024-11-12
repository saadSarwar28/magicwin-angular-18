import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { _window } from '../../services/backend.service';
import { ScoreTimerService } from '../../services/timer.service';
import { Router } from '@angular/router';
import { UtillsService } from '../../services/utills.service';

@Component({
  selector: 'app-virtual-cricket',
  templateUrl: './virtual-cricket.component.html',
  styleUrls: []
})
export class VirtualCricketComponent implements OnInit, OnDestroy {
  isShowVirtualCricket: boolean = false;
  isb2c: boolean = false
  @Input() selectedId: string = '4';
  @Input() landing: boolean = false;
  @Input() virtual: any = []
  @Input() scoreData: any = []

  today: Date = new Date();
  sInterval: any;

  constructor(
    private scoreTimerService: ScoreTimerService,
    private router: Router,
    private utilsSevice: UtillsService

  ) { }

  ngOnInit(): void {
    if (_window().isb2c) {
      this.isb2c = _window().isb2c;
    }

    if (_window().isShowVirtualCricket) {
      this.isShowVirtualCricket = _window().isShowVirtualCricket;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scoreData && this.scoreData.length > 0) {
      this.scoreData.forEach((s: any) => {
        let m = this.virtual.filter(
          (x: any) => x.version == s.eventId
        );
        if (m && m.length > 0) {
          m[0].score = this.utilsSevice.getVirtualScoreFormatedWay(s.score)
        }
      });
    }

  }

  virtualEventIds = [];
  routeToMarket(link: any) {
    this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    this.scoreTimerService.clearTimer();
  }
}

