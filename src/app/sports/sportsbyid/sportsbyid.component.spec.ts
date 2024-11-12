/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SportsbyidComponent } from './sportsbyid.component';

describe('SportsbyidComponent', () => {
  let component: SportsbyidComponent;
  let fixture: ComponentFixture<SportsbyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsbyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
