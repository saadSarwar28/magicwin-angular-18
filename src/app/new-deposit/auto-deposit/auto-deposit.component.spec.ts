import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDepositComponent } from './auto-deposit.component';

describe('AutoDepositComponent', () => {
  let component: AutoDepositComponent;
  let fixture: ComponentFixture<AutoDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
