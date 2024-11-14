import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutBetslipComponent } from './cashout-betslip.component';

describe('CashoutBetslipComponent', () => {
  let component: CashoutBetslipComponent;
  let fixture: ComponentFixture<CashoutBetslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashoutBetslipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutBetslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
