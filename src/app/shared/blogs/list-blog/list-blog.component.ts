import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss'],
})
export class ListBlogComponent implements OnInit {
  constructor() {}
  @Input() listData: any;
  ngOnInit(): void {}
}
