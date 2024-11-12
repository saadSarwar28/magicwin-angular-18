import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { _window, BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: [],

})
export class BlogsComponent implements OnInit {
  blogData: any;
  loader: boolean = false;
  constructor(
    private backendService: BackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBlogDetail();
  }

  getBlogDetail() {
    this.loader = true;
    this.backendService
      .GetBlog()
      .then((data: any) => {
        if (data?.length > 0) {
          this.blogData = data;
        }
      })
      .finally(() => {
        this.loader = false;
      });
  }
  routeToBlog(blogDetail) {
    this.router.navigate([blogDetail.route]);
  }
}
