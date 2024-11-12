import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paragraph-blog',
  templateUrl: './paragraph-blog.component.html',
  styleUrls: ['./paragraph-blog.component.scss'],
})
export class ParagraphBlogComponent implements OnInit {
  @Input()
  paragraph: any;
  constructor() {}

  ngOnInit(): void {}
}
