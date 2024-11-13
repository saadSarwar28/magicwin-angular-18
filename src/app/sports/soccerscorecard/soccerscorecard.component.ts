import { BackendService } from '../../services/backend.service';
import { ScoreCardTimerService } from '../../services/timer.service';
import { Component, OnDestroy, Input, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { _window } from '../../services/backend.service'
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-soccerscorecard',
  templateUrl: './soccerscorecard.component.html',
  styleUrls: ['./soccerscorecard.component.scss']
})
export class SoccerscorecardComponent implements OnInit, OnDestroy {
  ngOnDestroy() {
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }
  timeLineData: any;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private betService: BackendService,
    private elementRef: ElementRef,
    private scoreTimerService: ScoreCardTimerService
  ) {
  }
  @Input() evtid: string | undefined;
  @Input() mktName: string | undefined;
  @Input() eventTypeid: string | undefined;
  @Input() status: string | undefined;
  @Output() valueChange = new EventEmitter();
  source: any;
  team1: string = "";
  team2: string = "";
  team1Score: string = "";
  team2Score: string = "";
  interval: any;
  matchDetails: any;
  data: any;

  ngOnInit() {
    this.scoreTimerService.SetTimer(setInterval(() => {
      this.loadTimeLine();
    }, _window().scorecardtimer));

  }
  result: string = "";
  commentry: string = "";
  loadTimeLine() {

    if (this.status === 'CLOSED') {
      this.scoreTimerService.clearTimer();
      return;
    }

    this.betService.timeLineNew1(parseInt(this.evtid!), '').subscribe(
      (d: any) => {
        this.data = d;
        if (d[0]?.score) {
          d = d[0];

          if (d.eventTypeId === 2) {
            this.team1 = d.score.home.name;
            this.team2 = d.score.away.name;
            this.team1Score = d.score.home.score;
            this.team2Score = d.score.away.score;
            this.timeLineData = d;
            // this.timeLineData.status = this.timeLineData.status.match(/[A-Z][a-z]+/g).join(" ");

          } else {
            this.team1 = d.score.home.name;
            this.team2 = d.score.away.name;
            this.team1Score = d.score.home.score;
            this.team2Score = d.score.away.score;
            this.timeLineData = d;
            //this.timeLineData.status = d.matchStatus.match(/[A-Z][a-z]+/g).join(" ");
          }
          if (d.updateDetails && d.updateDetails.length > 0) {
            this.matchDetails = d.updateDetails.filter((x: { type: string; }) => x.type === "Goal" || x.type === "YellowCard" || x.type === "RedCard");
            //console.table(this.matchDetails);
          }
        } else {
          this.timeLineData = null;
        }
      }
    )
  }
}
