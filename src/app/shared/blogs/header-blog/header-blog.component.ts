import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-blog',
  templateUrl: './header-blog.component.html',
  styleUrls: ['./header-blog.component.scss'],
})
export class HeaderBlogComponent implements OnInit {
  @Input() headerText: any;
  constructor() {}

  ngOnInit(): void {}
}
