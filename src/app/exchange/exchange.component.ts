import { Component, OnInit, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class ExchangeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

}
