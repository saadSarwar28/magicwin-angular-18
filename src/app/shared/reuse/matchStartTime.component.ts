

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { DaysFormatPipePipe } from '../../pipes/days-format-pipe.pipe';

@Component({
  selector: 'app-match-start-time',
  template: `
<span *ngIf="
(m.marketStartTime
  | amDifference : today : 'hours') >= 24
" class="status date-time">
    <span>
      {{ m.marketStartTime | date : "HH:mm" }}
      {{ m.marketStartTime | date : "EEE d" }}
    </span>
  </span>
  <span *ngIf="
(m.marketStartTime
  | amDifference : today : 'hours') < 24 &&
(m.marketStartTime
  | amDifference : today : 'hours') > 2
" class="status date-time">
    <span>
      {{
      m.marketStartTime.split("T")[0] | daysFormatPipe
      }}
      {{ m.marketStartTime | date : "HH:mm" }}
    </span>
  </span>
  <span *ngIf="
(m.marketStartTime
  | amDifference : today : 'hours') <= 2
" class="status date-time">
    <span class="status date-time" *ngIf="
  (m.marketStartTime
    | amDifference : today : 'hours') > 0
">
      <span>
        {{ "startingin" | translate }}
        {{
        m.marketStartTime
        | amDifference : today : "hours"
        }}h
      </span>
    </span>
    <span class="status date-time" *ngIf="
  (m.marketStartTime
    | amDifference : today : 'hours') == 0 &&
  (m.marketStartTime
    | amDifference : today : 'minutes') > 0
">
      <span>
        {{ "startingin" | translate }}
        {{
        m.marketStartTime
        | amDifference : today : "minutes"
        }}m
      </span>
    </span>
    <span class="status date-time" *ngIf="
  (m.marketStartTime
    | amDifference : today : 'minutes') < 1 &&
  (m.marketStartTime
    | amDifference : today : 'minutes') > 0
">
      {{ "startingsoon" | translate }}
    </span>
  </span>
`,
  standalone: true,
  imports: [TranslateModule, CommonModule, MomentModule, DaysFormatPipePipe],

})
export class MatchStartTimeComponent {
  @Input() m: any;
  today: Date = new Date();

}



