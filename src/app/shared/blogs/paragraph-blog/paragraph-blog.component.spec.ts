import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphBlogComponent } from './paragraph-blog.component';

describe('ParagraphBlogComponent', () => {
  let component: ParagraphBlogComponent;
  let fixture: ComponentFixture<ParagraphBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
