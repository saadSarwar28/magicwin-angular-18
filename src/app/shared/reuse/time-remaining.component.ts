import { Component, ElementRef, Input, NgZone, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { _window } from '../../services/backend.service';
import { RemainingTimerService } from '../../services/timer.service';


@Component({
  selector: 'app-timeremaining',
  template: `
  <div *ngIf="!hide" [ngClass]="isDeviceMobile ? 'mobile_styles' : 'web_styles'"><span class="timeText">{{'timeremaining'|translate}} </span>  <span class="timerCounter" #counter></span></div>
  `,
  styleUrls: []
})
export class TimeremainingComponent implements OnDestroy {
  isDeviceMobile: any = localStorage.getItem('isDeviceMobile') == 'no' ? false : true || false;
  @Input() timeRemaining: string = '';

  @ViewChild('counter')
  myCounter!: ElementRef;
  source: any;
  interval: any;
  hide: boolean = false;
  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private remainingTimer: RemainingTimerService

  ) {
    if (_window().timeremaining) {
      this.interval = _window().timeremaining;
    }
    this.zone.runOutsideAngular(() => {
      this.remainingTimer.SetTimer(setInterval(() => {
        this.renderer.setProperty(this.myCounter.nativeElement, 'textContent', this.caclulatedifference());
        this.renderer.setStyle(this.myCounter.nativeElement, 'color', this.cssClassName);

      }, this.interval));
    });
  }
  ngOnDestroy(): void {
    this.remainingTimer.clearTimer()
    this.elementRef.nativeElement.remove();
  }
  cssClassName: string = '';



  caclulatedifference() {
    let now = new Date().getTime();
    let t = new Date(this.timeRemaining).getTime() - now;


    let days = Math.trunc(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.abs(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
    let secs = Math.abs(Math.floor((t % (1000 * 60)) / 1000));
    if (hours < 0) {
      this.cssClassName = 'red';
      this.remainingTimer.clearTimer();
      this.hide = true;
      return "0:d 00:00:00"
    }
    return `${days}:d ${("0" + hours).slice(-2)}:${("0" + mins).slice(-2)}:${("0" + secs).slice(-2)}`

  }

}
