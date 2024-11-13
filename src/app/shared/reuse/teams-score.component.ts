

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-teams-score',
  template: `
<div class="match-score-info d-flex align-items-center">
<div class="d-flex flex-column align-items-center" [innerHTML]="score">
</div>
</div>
`,
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class TeamsScoreComponent {
  @Input() score: string = '';

}


