import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotterymarketComponent } from './lotterymarket.component';

describe('LotterymarketComponent', () => {
  let component: LotterymarketComponent;
  let fixture: ComponentFixture<LotterymarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotterymarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotterymarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
