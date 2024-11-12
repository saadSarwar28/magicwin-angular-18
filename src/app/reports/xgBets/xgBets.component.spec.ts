/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XgBetsComponent } from './xgBets.component';

describe('XgBetsComponent', () => {
  let component: XgBetsComponent;
  let fixture: ComponentFixture<XgBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
