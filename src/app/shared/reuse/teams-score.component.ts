

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teams-score',
  template: `
<div class="match-score-info d-flex align-items-center">
<div class="d-flex flex-column align-items-center" [innerHTML]="score">
</div>
</div>
`
})
export class TeamsScoreComponent {
  @Input() score: string = '';

}


