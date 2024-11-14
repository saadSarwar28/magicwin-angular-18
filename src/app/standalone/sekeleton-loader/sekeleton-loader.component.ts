import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sekeleton-loader.component.html',
  styleUrl: './sekeleton-loader.component.scss'
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() loaderType: string = ''
  constructor() { }

  ngOnInit(): void {
  }
}
