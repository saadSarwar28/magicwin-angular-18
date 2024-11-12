import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderBannerComponent } from './provider-banner.component';

describe('ProviderBannerComponent', () => {
  let component: ProviderBannerComponent;
  let fixture: ComponentFixture<ProviderBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
