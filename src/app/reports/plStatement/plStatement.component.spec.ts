/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlStatementComponent } from './plStatement.component';

describe('PlStatementComponent', () => {
  let component: PlStatementComponent;
  let fixture: ComponentFixture<PlStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
