import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalHistoryComponent } from './withdrawal-history.component';

describe('WithdrawalHistoryComponent', () => {
  let component: WithdrawalHistoryComponent;
  let fixture: ComponentFixture<WithdrawalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
