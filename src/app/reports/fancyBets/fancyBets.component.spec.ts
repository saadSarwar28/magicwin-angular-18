/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FancyBetsComponent } from './fancyBets.component';

describe('FancyBetsComponent', () => {
  let component: FancyBetsComponent;
  let fixture: ComponentFixture<FancyBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
