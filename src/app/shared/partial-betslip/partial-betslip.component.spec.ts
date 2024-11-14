/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PartialBetslipComponent } from './partial-betslip.component';

describe('PartialBetslipComponent', () => {
  let component: PartialBetslipComponent;
  let fixture: ComponentFixture<PartialBetslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialBetslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialBetslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
