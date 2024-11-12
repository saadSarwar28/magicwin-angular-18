import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oddsbutton',
  template: `
  <ng-container *ngIf="!size">
    <div  class="odds-item d-flex flex-column align-items-center {{cssClass}}">
    <span class="price" appRateHighlight>{{ price }} </span>
  </div>
  </ng-container>
  <ng-container *ngIf="size">
  <div class="odds-item d-flex flex-column align-items-center {{cssClass}} ">
      <div class="price " appRateHighlight>{{price}}</div>
      <div class="size" *ngIf="fancy">{{size | shortennum}}</div>
  </div>
</ng-container>
`
})
export class OddsbuttonComponent implements OnInit {

  @Input() price: any = "";
  @Input() size: any = "";
  @Input() cssClass = "";
  @Input() fancy: boolean = false;

  ngOnInit(): void {
    if (!this.price || Number.isNaN(this.price)) {
      this.price = "";
    }
    if (!this.size || Number.isNaN(this.size)) {
      this.size = "";
    }
  }

}
