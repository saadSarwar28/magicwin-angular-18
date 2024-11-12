import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: [],
})
export class BlogDetailComponent implements OnInit {
  blogData: any;
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {
    this.route.paramMap.subscribe((params) => {
      let routeName = params.get('routename');
      if (routeName) this.getBlogDetail(routeName);
    });
  }

  ngOnInit(): void { }

  getBlogDetail(routeName: string) {
    this.backendService
      .GetBlog()
      .then((data: any) => {
        if (data?.length > 0) {
          let currentBlog = data?.find((x: any) =>
            x.route?.includes(routeName)
          );
          if (currentBlog) {
            this.titleService.setTitle(currentBlog.title);
            this.metaService.updateTag({
              name: 'description',
              content: currentBlog.metaDescription,
            });
            this.blogData = this.sanitizer.bypassSecurityTrustHtml(
              currentBlog.htmlContent
            );
          }
        }
      })
      .finally(() => { });
  }
}
