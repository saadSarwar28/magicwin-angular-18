import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-heading-blog',
  templateUrl: './sub-heading-blog.component.html',
  styleUrls: ['./sub-heading-blog.component.scss'],
})
export class SubHeadingBlogComponent implements OnInit {
  @Input() headerText: any;
  constructor() {}

  ngOnInit(): void {}
}
