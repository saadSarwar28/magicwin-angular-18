import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlogComponent } from './image-blog.component';

describe('ImageBlogComponent', () => {
  let component: ImageBlogComponent;
  let fixture: ComponentFixture<ImageBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
