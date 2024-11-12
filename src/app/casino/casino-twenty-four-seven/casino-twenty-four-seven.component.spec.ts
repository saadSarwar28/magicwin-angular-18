import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoTwentyFourSevenComponent } from './casino-twenty-four-seven.component';

describe('CasinoTwentyFourSevenComponent', () => {
  let component: CasinoTwentyFourSevenComponent;
  let fixture: ComponentFixture<CasinoTwentyFourSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoTwentyFourSevenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoTwentyFourSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
