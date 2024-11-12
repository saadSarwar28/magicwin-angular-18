import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsAndBonusComponent } from './promotions-and-bonus.component';

describe('PromotionsAndBonusComponent', () => {
  let component: PromotionsAndBonusComponent;
  let fixture: ComponentFixture<PromotionsAndBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsAndBonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsAndBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
