import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton-loader',
  templateUrl: './skelton-loader.component.html',
  styleUrls: ['./skelton-loader.component.scss']
})
export class SkeltonLoaderComponent implements OnInit {
  @Input() loaderType: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
