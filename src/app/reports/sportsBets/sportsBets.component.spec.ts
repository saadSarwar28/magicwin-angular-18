/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SportsBetsComponent } from './sportsBets.component';

describe('SportsBetsComponent', () => {
  let component: SportsBetsComponent;
  let fixture: ComponentFixture<SportsBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
