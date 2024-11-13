import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-blog',
  templateUrl: './table-blog.component.html',
  styleUrls: ['./table-blog.component.scss'],
})
export class TableBlogComponent implements OnInit {
  @Input() tableData: any;
  constructor() {}

  ngOnInit(): void {}
}
