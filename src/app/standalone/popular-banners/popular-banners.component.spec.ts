import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularBannersComponent } from './popular-banners.component';

describe('PopularBannersComponent', () => {
  let component: PopularBannersComponent;
  let fixture: ComponentFixture<PopularBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularBannersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
