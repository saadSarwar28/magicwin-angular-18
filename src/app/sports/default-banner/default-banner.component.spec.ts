import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBannerComponent } from './default-banner.component';

describe('DefaultBannerComponent', () => {
  let component: DefaultBannerComponent;
  let fixture: ComponentFixture<DefaultBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
