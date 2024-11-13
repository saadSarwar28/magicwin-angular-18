import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { _window, BackendService } from '../../services/backend.service';
import { ScoreCardTimerService } from '../../services/timer.service';


@Component({
  selector: 'app-tennisscorecard',
  templateUrl: './tennisscorecard.component.html',
  styleUrls: ['./tennisscorecard.component.scss']
})
export class TennisscorecardComponent implements OnInit, OnDestroy {
  ngOnDestroy() {
    this.scoreTimerService.clearTimer();
    this.elementRef.nativeElement.remove();
  }
  timeLineData: any;
  interval: any
  constructor(
    private betService: BackendService,
    private elementRef: ElementRef,
    private scoreTimerService: ScoreCardTimerService
  ) {
    if (_window().scoretimer) {
      this.interval = _window().scoretimer;
    }
  }
  @Input() evtid: string | undefined;
  @Input() mktName: string | undefined;
  @Input() eventTypeid: string | undefined;
  @Input() status: string | undefined;
  // @ViewChild('team1c', { static: true}) team1c: ElementRef<HTMLCanvasElement>;
  // @ViewChild('team2c', { static: true}) team2c: ElementRef<HTMLCanvasElement>;

  // private context1: CanvasRenderingContext2D;
  // private context2: CanvasRenderingContext2D;

  team1: string = "";
  team2: string = "";
  ngOnInit() {
    if (navigator.onLine == true && document.hidden == false) {
      this.loadTimeLine();
      this.scoreTimerService.SetTimer(setInterval(() => { this.loadTimeLine(); }, this.interval));
    }

  }
  ngAfterViewInit(): void {
    // if(this.mktName.indexOf(' v ')>0){
    // this.context1 = (this.team1c.nativeElement as HTMLCanvasElement).getContext('2d');
    // this.context2 = (this.team2c.nativeElement as HTMLCanvasElement).getContext('2d');
    // //this.draw();
    // this.drawTeam(this.context1,this.team1c,this.team1);
    // this.drawTeam(this.context2,this.team2c,this.team2);
    // }
  }
  result: any;
  commentry: string = "";
  loadTimeLine() {
    if (navigator.onLine == true && document.hidden == false) {
      if (this.status === 'CLOSED') {
        this.scoreTimerService.clearTimer();
        return;
      }
      if (this.evtid) {
        this.betService.timeLineNew1(parseInt(this.evtid), '').subscribe(
          (resp: any) => {

            if (Object.keys(resp).length > 0) {
              this.team1 = resp[0].score.home.name;
              this.team2 = resp[0].score.away.name;

              let d = resp[0];
              this.result = d.score;
            }
          },

        );
      }
    }
  }

}
