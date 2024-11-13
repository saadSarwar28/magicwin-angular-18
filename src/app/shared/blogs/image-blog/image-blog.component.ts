import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-blog',
  templateUrl: './image-blog.component.html',
  styleUrls: ['./image-blog.component.scss'],
})
export class ImageBlogComponent implements OnInit {
  @Input() imageSrc: any;
  constructor() {}

  ngOnInit(): void {}
}
