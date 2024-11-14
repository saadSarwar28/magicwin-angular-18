import { Component } from '@angular/core';
import { _window } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-summary-content',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './summary-content.component.html',
  styleUrl: './summary-content.component.scss'
})
export class SummaryContentComponent {
  sitename: string = '';
  showMoreContent: boolean = false;
  showLandingPageContent: boolean = false;

  constructor() {
    this.sitename = _window().sitename;
    if (_window().showLandingPageContent) {
      this.showLandingPageContent = _window().showLandingPageContent;
    }
    if (_window().showLandingPageContent) {
      this.showLandingPageContent = _window().showLandingPageContent;
    }
  }
}
