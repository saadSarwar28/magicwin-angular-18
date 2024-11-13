import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: BlogDetailComponent,
  },
  {
    path: ':routename',
    component: BlogDetailComponent,
  },
];

@NgModule({
  declarations: [BlogDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BlogDetailModule { }
