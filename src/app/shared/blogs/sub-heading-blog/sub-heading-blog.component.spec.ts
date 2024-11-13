import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeadingBlogComponent } from './sub-heading-blog.component';

describe('SubHeadingBlogComponent', () => {
  let component: SubHeadingBlogComponent;
  let fixture: ComponentFixture<SubHeadingBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHeadingBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeadingBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
