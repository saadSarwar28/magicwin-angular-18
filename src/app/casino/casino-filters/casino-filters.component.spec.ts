import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoFiltersComponent } from './casino-filters.component';

describe('CasinoFiltersComponent', () => {
  let component: CasinoFiltersComponent;
  let fixture: ComponentFixture<CasinoFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
