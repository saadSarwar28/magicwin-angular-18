import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScoreCardTimerService } from '../../services/timer.service';
import { BackendService } from 'src/app/services/backend.service';
import { _window } from '../../services/backend.service'
import { Router } from '@angular/router';
import * as M from "materialize-css";
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-basketballscorecard',
  templateUrl: './basketballscorecard.component.html',
  styleUrls: ['./basketballscorecard.component.scss']
})
export class BasketballscorecardComponent implements OnInit {
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
  result: string = "";
  commentry: string = "";
  timeLineData: any;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private betService: BackendService,
    private elementRef: ElementRef,
    private scoreTimerService: ScoreCardTimerService
  ) { }

  ngOnInit(): void {
    this.scoreTimerService.SetTimer(setInterval(() => {
      this.loadTimeLine();
    }, _window().scorecardtimer));
  }

  ngOnDestroy() {
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }

  loadTimeLine() {

    if (this.status === 'CLOSED') {
      this.scoreTimerService.clearTimer();
      return;
    }

    this.betService.timeLineNew1(parseInt(this.evtid!), "SoccerscorecardComponent").then(
      (d: any) => {

        this.data = d;
        if (d && Object.keys(d).length > 0) {
          this.valueChange.emit(true)
          // d = d[0];

          if (d.eventTypeId === 7522) {
            this.team1 = d.score.home.name;
            this.team2 = d.score.away.name;
            this.team1Score = d.score.home.score;
            this.team2Score = d.score.away.score;
            this.timeLineData = d;
            // this.timeLineData.status = this.timeLineData.status.match(/[A-Z][a-z]+/g).join(" ");

          } else {
            //this.timeLineData.status = d.matchStatus.match(/[A-Z][a-z]+/g).join(" ");
          }
          //console.table(this.matchDetails);
        } else {
          // this.timeLineData = null;
        }
      },
      error => {
        console.log('get menu get. error:' + error);

      }
    ).catch(err => {
      if (err.status == 401) {
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err)
      }
    });
  }
}
