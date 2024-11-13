import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skelton-loader',
  templateUrl: './skelton-loader.component.html',
  styleUrls: ['./skelton-loader.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class SkeltonLoaderComponent implements OnInit {
  @Input() loaderType: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
