import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBlogComponent } from './table-blog.component';

describe('TableBlogComponent', () => {
  let component: TableBlogComponent;
  let fixture: ComponentFixture<TableBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
