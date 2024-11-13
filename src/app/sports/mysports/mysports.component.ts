import { Component, OnInit } from '@angular/core';
import { _window } from 'src/app/services/backend.service';

@Component({
  selector: 'app-mysports',
  templateUrl: './mysports.component.html',
  styleUrls: ['./mysports.component.scss'],
})
export class MysportsComponent implements OnInit {
  activeButton: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
