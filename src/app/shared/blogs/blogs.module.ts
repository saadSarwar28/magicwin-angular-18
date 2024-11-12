import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { ParagraphBlogComponent } from './paragraph-blog/paragraph-blog.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { RouterModule, Routes } from '@angular/router';
import { ImageBlogComponent } from './image-blog/image-blog.component';
import { HeaderBlogComponent } from './header-blog/header-blog.component';
import { SubHeadingBlogComponent } from './sub-heading-blog/sub-heading-blog.component';
import { TableBlogComponent } from './table-blog/table-blog.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
  },
  {
    path: ':routename',
    component: BlogsComponent,
  },
];

@NgModule({
  declarations: [
    BlogsComponent,
    ParagraphBlogComponent,
    ListBlogComponent,
    ImageBlogComponent,
    HeaderBlogComponent,
    SubHeadingBlogComponent,
    TableBlogComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class BlogsModule {}
