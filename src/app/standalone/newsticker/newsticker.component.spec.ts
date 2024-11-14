import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstickerComponent } from './newsticker.component';

describe('NewstickerComponent', () => {
  let component: NewstickerComponent;
  let fixture: ComponentFixture<NewstickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewstickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewstickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
