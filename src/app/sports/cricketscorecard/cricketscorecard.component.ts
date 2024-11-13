import { BackendService } from '../../services/backend.service';
import { ScoreCardTimerService } from '../../services/timer.service';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { _window } from '../../services/backend.service'
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-cricketscorecard',
  templateUrl: './cricketscorecard.component.html',
  styleUrls: ['./cricketscorecard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CricketscorecardComponent implements OnInit {
  ngOnDestroy() {
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }
  timeLineData: any;
  interval: any;
  @Input() evtid: string | undefined;
  @Input() mktName: string | undefined;
  @Input() eventTypeid: string | undefined;
  @Input() status: string | undefined;
  @Output() valueChange = new EventEmitter();
  constructor(
    private storageService: StorageService,
    private router: Router,
    private betService: BackendService,
    private elementRef: ElementRef,
    private scoreTimerService: ScoreCardTimerService,) {
    if (_window().scoretimer) {
      this.interval = _window().scoretimer;
    }
  }

  source: any;
  team1: string = "";
  team2: string = "";
  matchType: string = "";
  data: any;
  ngOnInit() {

    this.loadTimeLine();
    this.scoreTimerService.SetTimer(setInterval(() => { this.loadTimeLine(); }, this.interval));
  }

  result: any;
  commentry: string = "";
  loadTimeLine() {
    if (this.status === 'CLOSED') {
      this.scoreTimerService.clearTimer();
      return;
    }
    this.betService.timeLineNew1(Number(this.evtid), '').subscribe(
      {
        next: (resp: any) => {
          if (resp) {
            if (Array.isArray(resp)) {
              console.log(resp, "cricket Score card")
              this.matchType = resp[0].matchType;
              this.matchType = this.matchType.replace(/_/g, " ").toLowerCase()
              this.team1 = resp[0].score.home.name;
              this.team2 = resp[0].score.away.name;
              let d = resp[0];
              this.data = d
              this.result = d.score;
            } else {
              if (Object?.keys(resp)?.length > 0) {
                if (resp.matchType) {
                  this.matchType = resp.matchType;
                  this.matchType = this.matchType.replace(/_/g, " ").toLowerCase()
                }
                if (resp.score.home.name) {
                  this.team1 = resp.score.home.name;
                }
                if (resp.score.away.name) {
                  this.team2 = resp.score.away.name;
                }
                let d = resp;
                this.data = d
                this.result = d.score;
              } else {
                if (this.mktName?.includes(' v ')) {
                  this.team1 = this.mktName?.split(' v ')[0];
                  this.team2 = this.mktName?.split(' v ')[1];
                }
              }
            }
          }
        },
        error: (error) => {
          console.log('get menu get. error:' + error);
        }
      }

    )
  }

}
